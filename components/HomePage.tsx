import React from 'react';
import { Bot } from '../types';
import BotCard from './BotCard';

interface HomePageProps {
  bots: Bot[];
  onSelectBot: (bot: Bot) => void;
  onEditBot: (bot: Bot) => void;
  onDeleteBot: (botId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ bots, onSelectBot, onEditBot, onDeleteBot }) => {
  // Duplicate the bots array for a seamless infinite scroll effect
  const loopedBots = bots.length > 0 ? [...bots, ...bots] : [];

  return (
    <div className="flex-1 flex flex-col w-full overflow-hidden">
      <h2 className="text-3xl font-bold text-center px-4 my-6">Your Bot Personalities</h2>
      {bots.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <p className="text-lg">No bots created yet!</p>
          <p className="text-sm opacity-70 mt-2">Go to the 'Create' tab to design your first character.</p>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="scroller w-full" data-speed="slow">
            <div className="scroller-inner">
              {loopedBots.map((bot, index) => (
                <div key={`${bot.id}-${index}`} className="w-[300px] md:w-[350px] mx-4">
                  <BotCard 
                    bot={bot}
                    onSelect={() => onSelectBot(bot)}
                    onEdit={() => onEditBot(bot)}
                    onDelete={() => onDeleteBot(bot.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;