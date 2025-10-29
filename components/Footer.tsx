import React from 'react';
import { ActiveTab } from '../types';
import Logo from './icons/Logo';
import CreateIcon from './icons/CreateIcon';

interface FooterProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const Footer: React.FC<FooterProps> = ({ activeTab, setActiveTab }) => {
  const getTabClass = (tabName: ActiveTab) => {
    const baseClass = "flex flex-col items-center justify-center w-1/2 p-3 transition-all duration-300 ease-in-out";
    if (activeTab === tabName) {
      return `${baseClass} text-purple-600 scale-110`;
    }
    return `${baseClass} text-gray-500 hover:text-purple-500`;
  };
  
  const getGlowClass = (tabName: ActiveTab) => {
      if (activeTab === tabName) {
          return "absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-20 -z-10";
      }
      return "absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-0 group-hover:opacity-10 transition-opacity -z-10";
  }

  return (
    <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 w-11/12 max-w-sm h-16 bg-white/40 backdrop-blur-xl rounded-2xl shadow-lg z-20">
      <div className="flex justify-around items-center h-full">
        <button className={`${getTabClass('home')} group relative`} onClick={() => setActiveTab('home')}>
          <Logo className="h-7 w-auto" />
          <span className="text-xs font-medium mt-1">Home</span>
          <div className={getGlowClass('home')}></div>
        </button>
        <button className={`${getTabClass('create')} group relative`} onClick={() => setActiveTab('create')}>
          <CreateIcon />
          <span className="text-xs font-medium mt-1">Create</span>
          <div className={getGlowClass('create')}></div>
        </button>
      </div>
    </footer>
  );
};

export default Footer;