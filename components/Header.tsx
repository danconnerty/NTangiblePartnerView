
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ViewType } from '../types';

interface HeaderProps {
  onNavigate: (view: ViewType) => void;
  currentView: ViewType;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkClass = (view: ViewType) => 
    `transition-colors pb-1 border-b-2 font-medium text-sm ${
      currentView === view 
      ? 'text-blue-400 border-blue-400' 
      : 'text-gray-300 border-transparent hover:text-blue-400 hover:border-blue-400/50'
    }`;

  return (
    <header className="bg-black text-white px-8 py-3 flex flex-col items-center sticky top-0 z-40 shadow-md">
      {/* Top Logo Section */}
      <div className="flex flex-col items-center mb-4">
        <a 
          href="/" 
          onClick={handleHomeClick}
          className="flex flex-col items-center group transition-opacity hover:opacity-90"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-bold text-lg">
              N
            </div>
            <h1 className="text-xl tracking-[0.2em] font-light">TANGIBLE</h1>
          </div>
          <p className="text-[10px] tracking-[0.4em] text-gray-400 mt-1 uppercase">N Control</p>
        </a>
      </div>

      {/* Nav & User Section */}
      <div className="w-full flex justify-between items-end max-w-7xl">
        <nav className="flex items-center gap-8">
          <button 
            onClick={() => onNavigate('home')}
            className={linkClass('home')}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('player-invite')}
            className={linkClass('player-invite')}
          >
            Player Invite
          </button>
          <button 
            onClick={() => onNavigate('coaches-invite')}
            className={linkClass('coaches-invite')}
          >
            Coaches Invite
          </button>
        </nav>

        <div className="flex flex-col items-end text-[11px] pb-1">
          <div className="flex items-center gap-1 cursor-pointer hover:text-blue-400 transition-colors">
            <span>Dan Connerty</span>
            <ChevronDown size={12} />
          </div>
          <span className="text-gray-500 uppercase tracking-tighter">Testing Groups</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
