import React, { useState, useEffect, useRef } from 'react';
import { Bot, Theme } from '../types';
import BackIcon from './icons/BackIcon';
import ScrollIcon from './icons/ScrollIcon';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

interface BotDetailPageProps {
  bot: Bot;
  onBack: () => void;
  theme: Theme;
}

const BotDetailPage: React.FC<BotDetailPageProps> = ({ bot, onBack, theme }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [autoScroll, setAutoScroll] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Simulate conversation
  useEffect(() => {
    const conversation: Omit<ChatMessage, 'id'>[] = [
      { sender: 'bot', text: `Hey there! Ready to explore the story of '${bot.storyIdea || bot.name}'? It's going to be an adventure.` },
      { sender: 'user', text: `I'm ready! Tell me more.` },
      { sender: 'bot', text: `Excellent! It all began with a whisper among the stars...` },
      { sender: 'bot', text: `A lone astronaut, searching for meaning in the cosmic dust.` },
      { sender: 'user', text: `Sounds intriguing!` },
      { sender: 'bot', text: `Indeed. The first clue was found etched on a moon of a forgotten planet.` },
    ];

    let messageIndex = 0;
    const timeouts: number[] = [];

    const addMessage = () => {
      if (messageIndex < conversation.length) {
        setMessages(prev => [...prev, { ...conversation[messageIndex], id: messageIndex }]);
        messageIndex++;
        const delay = Math.random() * 1500 + 800;
        timeouts.push(window.setTimeout(addMessage, delay));
      }
    };

    timeouts.push(window.setTimeout(addMessage, 500));

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [bot]);

  // Handle auto-scrolling
  useEffect(() => {
    if (autoScroll && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, autoScroll]);

  return (
    <div 
        className="relative h-full w-full max-w-md mx-auto overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${bot.chatBgUrl})` }}
    >
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 flex flex-col h-full text-white p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 min-w-0">
                <button onClick={onBack} className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors flex-shrink-0">
                    <BackIcon />
                </button>
                <div className="flex items-center space-x-3 min-w-0">
                    <img 
                        src={bot.photoUrl} 
                        alt={bot.name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-white/50 flex-shrink-0"
                    />
                    <div className="truncate">
                        <h2 className="text-xl font-bold truncate">{bot.name}</h2>
                        <p className="text-xs opacity-80 capitalize truncate">{bot.description}</p>
                    </div>
                </div>
            </div>
            <button 
                onClick={() => setAutoScroll(!autoScroll)} 
                className={`p-2 rounded-full transition-all duration-300 flex-shrink-0 ${autoScroll ? 'bg-white/30' : 'bg-white/10 hover:bg-white/20'}`}
                title={autoScroll ? "Disable Auto-Scroll" : "Enable Auto-Scroll"}
            >
                <ScrollIcon enabled={autoScroll} />
            </button>
        </div>

        {/* Chat Preview */}
        <div ref={chatContainerRef} className="flex-1 flex flex-col space-y-3 overflow-y-auto custom-scrollbar pr-2 pb-2">
            <div className="font-bold text-center text-sm uppercase opacity-60 my-4">Scenario Preview</div>
            
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs backdrop-blur-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-pink-500/80 rounded-br-lg' : 'bg-white/20 rounded-bl-lg'}`}>
                    <p className="text-sm break-words">{msg.text}</p>
                </div>
              </div>
            ))}
        </div>

        {/* Dummy Input */}
        <div className="mt-4 flex items-center p-2 bg-white/10 rounded-full">
            <input type="text" placeholder="Start a chat..." readOnly className="flex-1 bg-transparent text-white placeholder-white/60 focus:outline-none px-3" />
            <button className="p-2 bg-pink-500 rounded-full">
                <svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
            </button>
        </div>
      </div>
    </div>
  );
};

export default BotDetailPage;