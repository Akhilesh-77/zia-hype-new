import React, { useState } from 'react';
import { Theme } from '../types';
import MenuIcon from './icons/MenuIcon';
import CloseIcon from './icons/CloseIcon';
import ThemeIcon from './icons/ThemeIcon';
import Logo from './icons/Logo';

interface HeaderProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  hasConsented: boolean;
  onConsentChange: (agreed: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme, hasConsented, onConsentChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDisclaimerExpanded, setIsDisclaimerExpanded] = useState(false);
  
  const toggleTheme = () => {
    const themes: Theme[] = ['pink', 'light', 'dark'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };
  
  const headerClasses = {
      light: 'bg-white/50 text-gray-800',
      dark: 'bg-black/50 text-white',
      pink: 'bg-white/20 text-gray-800'
  }[theme];
  
  const iconClasses = {
      light: 'text-gray-700 hover:text-pink-500',
      dark: 'text-gray-300 hover:text-pink-400',
      pink: 'text-gray-700 hover:text-purple-600'
  }[theme];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-20 backdrop-blur-lg transition-colors duration-400 ${headerClasses}`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setIsMenuOpen(true)} className={`p-2 transition-colors ${iconClasses}`}>
            <MenuIcon />
          </button>
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-auto" />
            <span className="text-2xl font-bold tracking-tight">Zia.ai</span>
          </div>
          <button onClick={toggleTheme} className={`p-2 transition-colors ${iconClasses}`}>
            <ThemeIcon />
          </button>
        </div>
      </header>
      
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setIsMenuOpen(false)}>
          <div 
            className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-gradient-to-b from-white to-purple-50 p-6 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center items-center gap-3 mb-6">
              <Logo className="h-10 w-auto" />
              <span className="text-3xl font-bold text-purple-800 tracking-tight">Zia.ai</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-purple-700">Menu</h2>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-500 hover:text-purple-600">
                <CloseIcon />
              </button>
            </div>
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">About Zia.ai</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Team Info</a>
              
              <div className="pt-4 border-t border-purple-200">
                <div 
                  className="font-semibold text-gray-800 mb-2 cursor-pointer flex justify-between items-center" 
                  onClick={() => setIsDisclaimerExpanded(!isDisclaimerExpanded)}
                  aria-expanded={isDisclaimerExpanded}
                >
                  Disclaimer
                  <span className="text-sm font-normal opacity-70">{isDisclaimerExpanded ? '▲ Show less' : '▼ Tap to view more'}</span>
                </div>
                {isDisclaimerExpanded && (
                  <div className="transition-all duration-300 ease-in-out">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      These chatbots are completely fictional and used only for entertainment purposes. Please don’t replicate or treat them as real people. Zia.ai is a creative AI experience.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-purple-200">
                <h3 className="font-semibold text-gray-800 mb-2">Consent</h3>
                <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-purple-100/60 transition-colors">
                  <input
                    type="checkbox"
                    id="consent-checkbox"
                    checked={hasConsented}
                    onChange={(e) => onConsentChange(e.target.checked)}
                    className="h-5 w-5 rounded text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <label htmlFor="consent-checkbox" className="text-sm text-gray-700 flex-1 cursor-pointer">
                    I have read and agree to the disclaimer.
                  </label>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
