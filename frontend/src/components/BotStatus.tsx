import React from 'react';

interface Bot {
  id: string;
  alias: string;
  status: string;
  system_prompt: string;
}

interface BotStatusProps {
  bot: Bot;
}

const BotStatus: React.FC<BotStatusProps> = ({ bot }) => {
  const getStatusColor = (status: string): string => {
    switch (status.toUpperCase()) {
      case 'HEALTHY':
        return 'bg-green-500';
      case 'UNHEALTHY':
        return 'bg-red-500';
      case 'PAUSED':
        return 'bg-yellow-500';
      case 'DEGRADED':
        return 'bg-orange-500';
      case 'STARTING':
        return 'bg-blue-500';
      case 'DELETING':
        return 'bg-red-700';
      case 'DELETED':
        return 'bg-gray-500';
      case 'PAUSING':
        return 'bg-yellow-700';
      case 'RESUMING':
        return 'bg-blue-700';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{bot.alias}</h2>
      <div className="flex items-center mb-4">
        <span className="mr-2">Status:</span>
        <span className={`${getStatusColor(bot.status)} px-2 py-1 rounded text-sm font-semibold`}>
          {bot.status}
        </span>
      </div>
      <p className="mb-2"><strong>System Prompt:</strong> {bot.system_prompt}</p>
    </div>
  );
};

export default BotStatus;