import React, { useState, FormEvent, ChangeEvent } from 'react';

interface BotFormData {
  token: string;
  system_prompt: string;
  alias: string;
}

interface BotFormProps {
  onSubmit: (data: BotFormData) => void;
}

const BotForm: React.FC<BotFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<BotFormData>({
    token: '',
    system_prompt: '',
    alias: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Bot</h2>
      <div className="mb-4">
        <label htmlFor="token" className="block mb-2">Telegram Bot Token</label>
        <input
          type="text"
          id="token"
          name="token"
          value={formData.token}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-gray-700 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="system_prompt" className="block mb-2">System Prompt</label>
        <textarea
          id="system_prompt"
          name="system_prompt"
          value={formData.system_prompt}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-gray-700 rounded"
          rows={4}
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="alias" className="block mb-2">Bot Alias</label>
        <input
          type="text"
          id="alias"
          name="alias"
          value={formData.alias}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-gray-700 rounded"
        />
      </div>
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create Bot
      </button>
    </form>
  );
}

export default BotForm;