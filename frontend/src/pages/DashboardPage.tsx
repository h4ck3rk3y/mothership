import React, { useState, useEffect } from 'react';
import { getBotInfo, createBot } from '../api';
import BotStatus from '../components/BotStatus';
import BotForm from '../components/BotForm';

interface Bot {
  id: string;
  alias: string;
  status: string;
  system_prompt: string;
}

interface BotFormData {
  token: string;
  system_prompt: string;
  alias: string;
}

const DashboardPage: React.FC = () => {
  const [bot, setBot] = useState<Bot | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBotInfo();
  }, []);

  const fetchBotInfo = async () => {
    try {
      setLoading(true);
      const botData = await getBotInfo();
      setBot(Object.keys(botData).length === 0 ? null : botData);
      setError(null);
    } catch (error) {
      setError('Error fetching bot info. Please try again later.');
      console.error('Error fetching bot info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBot = async (botData: BotFormData) => {
    try {
      setLoading(true);
      const newBot = await createBot(botData);
      setBot(newBot);
      setError(null);
      setLoading(false); // Move setLoading(false) here
    } catch (error) {
      setError('Error creating bot. Please try again.');
      console.error('Error creating bot:', error);
      setLoading(false); // Also setLoading(false) in case of error
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
      {error && <div className="text-center text-red-500 mb-4">{error}</div>}
      {bot ? (
        <BotStatus bot={bot} />
      ) : (
        <>
          <p className="mb-4">You don't have a bot yet. Create one now!</p>
          <BotForm onSubmit={handleCreateBot} />
        </>
      )}
    </div>
  );
}

export default DashboardPage;