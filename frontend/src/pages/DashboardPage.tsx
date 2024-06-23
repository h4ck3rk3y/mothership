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

  useEffect(() => {
    fetchBotInfo();
  }, []);

  const fetchBotInfo = async () => {
    try {
      const botData = await getBotInfo();
      setBot(botData);
    } catch (error) {
      console.error('Error fetching bot info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBot = async (botData: BotFormData) => {
    try {
      const newBot = await createBot(botData);
      setBot(newBot);
    } catch (error) {
      console.error('Error creating bot:', error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
      {bot ? (
        <BotStatus bot={bot} />
      ) : (
        <BotForm onSubmit={handleCreateBot} />
      )}
    </div>
  );
}

export default DashboardPage;