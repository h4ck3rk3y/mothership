import React from 'react';

interface Bot {
  id: string;
  alias: string;
  status: string;
  system_prompt: string;
}

interface StatusColors {
  [key: string]: string;
}

const statusColors: StatusColors = {
  HEALTHY: 'bg-green-500',
  UNHEALTHY: 'bg-red-500',
  PAUSED: 'bg-yellow-500',
  DEGRADED: 'bg-orange-500',
  STARTING: 'bg-blue-500',
  DELETING: 'bg-red-700',
  DELETED: 'bg-gray-500',
  PAUSING: 'bg-yellow-700',
  RESUMING: 'bg-blue-700'
};

interface BotStatusProps {
  bot: Bot;
}

const BotStatus: React.FC<BotStatusProps> = ({ bot }) => {
  const statusColor = statusColors[bot.status] || 'bg-gray-500';

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{bot.alias}</h2>
      <div className="flex items-center mb-4">
        <span className="mr-2">Status:</span>
        <span className={`${statusColor} px-2 py-1 rounded text-sm font-semibold`}>
          {bot.status}
        </span>
      </div>
      <p className="mb-2"><strong>ID:</strong> {bot.id}</p>
      <p className="mb-2"><strong>System Prompt:</strong> {bot.system_prompt}</p>
    </div>
  );
}

export default BotStatus;