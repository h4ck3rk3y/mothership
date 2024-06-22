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
from .models import Bot, User
from .bot import launch_bot

app = Flask(__name__)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = os.environ["PG"]
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.environ["JWT_SECRET"]

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)


# Routes
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
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


@app.route("/create_bot", methods=["POST"])
@jwt_required()
def create_bot():
    current_user_id = get_jwt_identity()
    data = request.json
    new_bot = Bot(
        user_id=current_user_id,
        token=data["token"],
        system_prompt=data["system_prompt"],
        alias=data["alias"],
    )
    db.session.add(new_bot)
    db.session.commit()

    success = launch_bot(new_bot)

    if success:
        return jsonify({"message": "Bot created and launched successfully"}), 201
    else:
        return jsonify({"message": "Bot created but failed to launch"}), 500


@app.route("/bots", methods=["GET"])
@jwt_required()
def get_bots():
    current_user_id = get_jwt_identity()
    bots = Bot.query.filter_by(user_id=current_user_id).all()
    return (
        jsonify(
            [
                {
                    "id": bot.id,
                    "token": bot.token,
                    "system_prompt": bot.system_prompt,
                    "alias": bot.alias,
                }
                for bot in bots
            ]
        ),
        200,
    )


if __name__ == "__main__":
    app.run(debug=True)
