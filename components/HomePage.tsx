import React, { useRef, useEffect, useCallback } from 'react';
import { Bot } from '../types';
import BotCard from './BotCard';

interface HomePageProps {
  bots: Bot[];
  onSelectBot: (bot: Bot) => void;
  onEditBot: (bot: Bot) => void;
  onDeleteBot: (botId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ bots, onSelectBot, onEditBot, onDeleteBot }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollerInnerRef = useRef<HTMLDivElement>(null);
  
  const positionRef = useRef(0);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const startXRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  const loopedBots = bots.length > 0 ? [...bots, ...bots] : [];

  const handleSelectCard = useCallback((bot: Bot) => {
    if (!hasDraggedRef.current) {
      onSelectBot(bot);
    }
  }, [onSelectBot]);

  useEffect(() => {
    const scrollerInner = scrollerInnerRef.current;
    if (!scrollerInner || bots.length === 0) return;

    const scrollWidth = scrollerInner.scrollWidth / 2;

    const autoScroll = () => {
      if (!isDraggingRef.current) {
        positionRef.current -= 0.5; // Scroll speed
        if (positionRef.current <= -scrollWidth) {
          positionRef.current += scrollWidth;
        }
        scrollerInner.style.transform = `translateX(${positionRef.current}px)`;
      }
      animationFrameIdRef.current = requestAnimationFrame(autoScroll);
    };

    autoScroll();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [bots.length]);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    startXRef.current = pageX - positionRef.current;
    if (scrollerInnerRef.current) {
      scrollerInnerRef.current.style.cursor = 'grabbing';
    }
  }, []);
  
  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    hasDraggedRef.current = true;
    
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const newPos = pageX - startXRef.current;
    positionRef.current = newPos;

    if (scrollerInnerRef.current) {
      scrollerInnerRef.current.style.transform = `translateX(${newPos}px)`;
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    
    if (scrollerInnerRef.current) {
      scrollerInnerRef.current.style.cursor = 'grab';
      const scrollWidth = scrollerInnerRef.current.scrollWidth / 2;
      positionRef.current %= scrollWidth;
       if (positionRef.current > 0) {
          positionRef.current -= scrollWidth;
       }
       scrollerInnerRef.current.style.transition = 'transform 300ms ease-out';
       scrollerInnerRef.current.style.transform = `translateX(${positionRef.current}px)`;
       setTimeout(() => {
         if (scrollerInnerRef.current) {
           scrollerInnerRef.current.style.transition = '';
         }
       }, 300);
    }
  }, []);

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
          <div 
            ref={scrollerRef}
            className="scroller w-full cursor-grab"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div ref={scrollerInnerRef} className="scroller-inner">
              {loopedBots.map((bot, index) => (
                <div key={`${bot.id}-${index}`} className="w-[300px] md:w-[350px] mx-4 select-none">
                  <BotCard 
                    bot={bot}
                    onSelect={() => handleSelectCard(bot)}
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