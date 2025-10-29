import React, { useState } from 'react';
import { Bot } from '../types';
import EditIcon from './icons/EditIcon';
import DeleteIcon from './icons/DeleteIcon';
import CopyIcon from './icons/CopyIcon';
import ChatIcon from './icons/ChatIcon';
import CheckIcon from './icons/CheckIcon';

interface BotCardProps {
  bot: Bot;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const BotCard: React.FC<BotCardProps> = ({ bot, onSelect, onEdit, onDelete }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const storyText = bot.storyIdea ? ` and Story Idea: ${bot.storyIdea}` : '';
    const prompt = `I need a chatbot personality of 🔵${bot.name} who is ${bot.description} to Akhilesh${storyText} now give me code prompt to aistudio.google.com`;
    navigator.clipboard.writeText(prompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div 
      className="w-full h-[450px] rounded-2xl shadow-lg flex flex-col group transition-all duration-400 ease-in-out hover:shadow-2xl hover:scale-105 overflow-hidden relative bg-cover bg-center"
      style={{ backgroundImage: `url(${bot.chatBgUrl})` }}
      onClick={onSelect}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
      
      <div className="relative flex-1 p-5 flex flex-col justify-end text-white">
        <img 
          src={bot.photoUrl} 
          alt={`${bot.name}'s photo`}
          className="w-20 h-20 rounded-full object-cover border-4 border-white/50 shadow-lg mb-4"
        />
        
        <h3 className="text-2xl font-bold truncate">{bot.name}</h3>
        <p className="text-sm opacity-90 capitalize mb-3">{bot.description}</p>
        
        <p className="text-xs uppercase font-bold opacity-70 mb-1">Story Idea</p>
        <p className="text-sm opacity-90 line-clamp-2 flex-grow min-h-[40px]">{bot.storyIdea || 'No story idea provided.'}</p>
        
        {/* Action Buttons */}
        <div className="flex justify-end items-center space-x-1 pt-3 mt-3 border-t border-white/20">
            <button
              onClick={(e) => { e.stopPropagation(); onSelect(); }}
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
              aria-label={`Chat with ${bot.name}`}
              title="Chat"
            >
                <ChatIcon />
            </button>
            <button
              onClick={handleCopy}
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
              aria-label="Copy prompt"
              title="Copy Prompt"
            >
                {isCopied ? <CheckIcon /> : <CopyIcon />}
            </button>
             <button
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
              aria-label={`Edit ${bot.name}`}
              title="Edit"
            >
                <EditIcon />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="p-2 rounded-full text-red-400 hover:bg-red-500/30 transition-colors duration-300"
              aria-label={`Delete ${bot.name}`}
              title="Delete"
            >
                <DeleteIcon />
            </button>
        </div>
      </div>
    </div>
  );
};

export default BotCard;