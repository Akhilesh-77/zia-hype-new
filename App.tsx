import React, { useState, useMemo, useEffect } from 'react';
import { Bot, ActiveTab, Theme } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CreatePage from './components/CreatePage';
import BotDetailPage from './components/BotDetailPage';

const initialBots: Bot[] = [
    {
      id: '1',
      name: 'Aura',
      photoUrl: 'https://i.postimg.cc/W3sT1Q3N/_953c8473-b391-4654-8857-8656623d3eb3.jpg',
      gifUrl: '',
      chatBgUrl: 'https://i.postimg.cc/q792qS5g/image.jpg',
      description: 'Cosmic guide',
      storyIdea: 'A quest to find a fallen star.',
    },
    {
      id: '2',
      name: 'Kai',
      photoUrl: 'https://i.postimg.cc/hG1B9Wpj/image.jpg',
      gifUrl: '',
      chatBgUrl: 'https://i.postimg.cc/sX18M0j5/image.jpg',
      description: 'Cybernetic oceanographer',
      storyIdea: 'Exploring a sunken digital city.',
    },
    {
      id: '3',
      name: 'Lyra',
      photoUrl: 'https://i.postimg.cc/rF4J8sVp/image.jpg',
      gifUrl: '',
      chatBgUrl: 'https://i.postimg.cc/prcM6p0v/image.jpg',
      description: 'Melody weaver',
      storyIdea: 'Composing a symphony to save a silent world.',
    },
];


const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [bots, setBots] = useState<Bot[]>(() => {
    try {
      const savedBots = localStorage.getItem('zia-bots');
      return savedBots ? JSON.parse(savedBots) : initialBots;
    } catch (error) {
      console.error("Failed to load bots from localStorage", error);
      return initialBots;
    }
  });
  const [theme, setTheme] = useState<Theme>('pink');
  
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [editingBot, setEditingBot] = useState<Bot | null>(null);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('zia-consent') === 'true';
    setHasConsented(consent);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('zia-bots', JSON.stringify(bots));
    } catch (error) {
      console.error("Failed to save bots to localStorage", error);
    }
  }, [bots]);

  const handleConsentChange = (agreed: boolean) => {
    setHasConsented(agreed);
    localStorage.setItem('zia-consent', String(agreed));
  };

  const handleSaveBot = (botData: Omit<Bot, 'id'> & { id?: string }) => {
    if (botData.id) {
      // Update existing bot
      setBots(bots.map(b => b.id === botData.id ? { ...b, ...botData } as Bot : b));
    } else {
      // Create new bot
      const newBot: Bot = { 
        id: new Date().toISOString(),
        name: botData.name,
        description: botData.description,
        storyIdea: botData.storyIdea || '',
        photoUrl: botData.photoUrl || '',
        gifUrl: botData.gifUrl || '',
        chatBgUrl: botData.chatBgUrl || '',
      };
      setBots(prevBots => [newBot, ...prevBots]);
    }
    setEditingBot(null);
    setActiveTab('home');
  };
  
  const handleDeleteBot = (botId: string) => {
    setBots(bots.filter(b => b.id !== botId));
  };

  const handleEditBot = (bot: Bot) => {
    setEditingBot(bot);
    setActiveTab('create');
  };
  
  const handleCancelEdit = () => {
    setEditingBot(null);
    setActiveTab('home');
  }

  const themeClasses = useMemo(() => {
    switch (theme) {
      case 'dark':
        return 'bg-black text-gray-200';
      case 'light':
        return 'bg-white text-gray-800';
      case 'pink':
      default:
        return 'bg-gradient-to-br from-purple-200 via-pink-200 to-rose-300 text-gray-800';
    }
  }, [theme]);

  const renderContent = () => {
    if (selectedBot) {
      return <BotDetailPage bot={selectedBot} onBack={() => setSelectedBot(null)} theme={theme} />;
    }
    if (activeTab === 'create' || editingBot) {
      return <CreatePage onSaveBot={handleSaveBot} botToEdit={editingBot} onCancel={handleCancelEdit} theme={theme} />;
    }
    return <HomePage bots={bots} onSelectBot={setSelectedBot} onEditBot={handleEditBot} onDeleteBot={handleDeleteBot} />;
  };

  return (
    <div className={`min-h-screen w-full font-sans antialiased overflow-hidden transition-colors duration-400 ease-in-out ${themeClasses}`}>
      <div className="relative flex flex-col h-screen">
        <Header 
            theme={theme} 
            setTheme={setTheme} 
            hasConsented={hasConsented} 
            onConsentChange={handleConsentChange} 
        />
        <main className="flex-1 overflow-y-auto pb-24 pt-16 flex flex-col">
          {renderContent()}
        </main>
        { !selectedBot && <Footer activeTab={activeTab} setActiveTab={setActiveTab} /> }
        
        {!hasConsented && (
            <div className="absolute inset-x-0 bottom-0 top-16 bg-black/30 backdrop-blur-md z-30 flex items-center justify-center p-4">
                <div className="text-center p-6 bg-white/20 rounded-xl shadow-lg max-w-sm mx-auto">
                    <h3 className="text-lg font-bold">Please accept the disclaimer</h3>
                    <p className="mt-2 text-sm opacity-90">Open the menu (☰) in the top-left corner to view and agree to the terms to continue.</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default App;