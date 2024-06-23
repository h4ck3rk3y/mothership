import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

interface BotFormProps {
  onSubmit: (data: { token: string; system_prompt: string; alias: string }) => void;
}

const BotForm: React.FC<BotFormProps> = ({ onSubmit }) => {
  const [token, setToken] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [alias, setAlias] = useState('');
  const [showToken, setShowToken] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ token, system_prompt: systemPrompt, alias });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="token" className="block mb-1 flex items-center">
          Telegram Bot Token
          <a
            href="https://core.telegram.org/bots/tutorial#obtain-your-bot-token"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2"
          >
            <InformationCircleIcon className="h-5 w-5 text-blue-400" />
          </a>
        </label>
        <div className="relative">
          <input
            type={showToken ? "text" : "password"}
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded pr-10 text-gray-300"
            placeholder="4839574812:AAFD39kkdpWt3ywyRZergyOLMaJhac60qc"
            required
          />
          <button
            type="button"
            onClick={() => setShowToken(!showToken)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showToken ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="systemPrompt" className="block mb-1">System Prompt</label>
        <textarea
          id="systemPrompt"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 rounded text-gray-300"
          rows={4}
          placeholder="You are a helpful tax assistant!"
          required
        />
      </div>
      <div>
        <label htmlFor="alias" className="block mb-1">Bot Alias</label>
        <input
          type="text"
          id="alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 rounded text-gray-300"
          placeholder="TaxMan"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create Bot
      </button>
    </form>
  );
};

export default BotForm;