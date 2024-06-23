# app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)
from werkzeug.security import generate_password_hash, check_password_hash
import os
from .bot import launch_bot, get_service_status, update_bot_on_koyeb
import uuid

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ["PG_DB"]
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.environ["JWT_SECRET"]

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

INVITE_CODE = "BOTS-WILL-TAKEOVER"


# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    bot = db.relationship("Bot", uselist=False, back_populates="user")


class Bot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("user.id"), nullable=False, unique=True
    )
    token = db.Column(db.String(120), nullable=False)
    system_prompt = db.Column(db.Text, nullable=False)
    alias = db.Column(db.String(80), nullable=False)
    service_id = db.Column(db.String(120), nullable=False)
    suffix = db.Column(db.String(12), nullable=False)
    user = db.relationship("User", back_populates="bot")


# Routes
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    if data.get("invite_code") != INVITE_CODE:
        return jsonify({"message": "Invalid invite code"}), 400

    if User.query.filter_by(username=data["username"]).first():
        return jsonify({"message": "Username already exists"}), 400

    hashed_password = generate_password_hash(data["password"])
    new_user = User(username=data["username"], password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(username=data["username"]).first()
    if user and check_password_hash(user.password_hash, data["password"]):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    return jsonify({"message": "Invalid credentials"}), 401


@app.route("/bot", methods=["POST"])
@jwt_required()
def create_bot():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user.bot:
        return jsonify({"message": "You already have a bot"}), 400

    data = request.json
    new_bot = Bot(
        user_id=current_user_id,
        token=data["token"],
        system_prompt=data["system_prompt"],
        alias=data["alias"],
    )

    uuid_suffix = str(uuid.uuid4())[-12:]
    new_bot.suffix = uuid_suffix
    name_suffix = f"{user.id}_{new_bot.aias}_{uuid_suffix}"
    success, service_id = launch_bot(new_bot, name_suffix)

    if success and service_id:
        new_bot.service_id = service_id
        db.session.add(new_bot)
        db.session.commit()
        return jsonify({"message": "Bot created and launched successfully"}), 201
    else:
        return jsonify({"message": "Failed to launch bot"}), 500


@app.route("/bot", methods=["GET"])
@jwt_required()
def get_bot():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user.bot:
        return jsonify({}), 200

    bot = user.bot
    status = get_service_status(bot.service_id)

    return (
        jsonify(
            {
                "id": bot.id,
                "token": bot.token,
                "system_prompt": bot.system_prompt,
                "alias": bot.alias,
                "status": status,
            }
        ),
        200,
    )


@app.route("/bot", methods=["PUT"])
@jwt_required()
def edit_bot():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user.bot:
        return jsonify({"message": "You don't have a bot to edit"}), 404

    data = request.json
    bot = user.bot

    # Update bot fields
    if "token" in data:
        bot.token = data["token"]
    if "system_prompt" in data:
        bot.system_prompt = data["system_prompt"]
    if "alias" in data:
        bot.alias = data["alias"]

    # Update bot on Koyeb
    try:
        update_bot_on_koyeb(bot)
        db.session.commit()
        return jsonify({"message": "Bot updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Failed to update bot: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
