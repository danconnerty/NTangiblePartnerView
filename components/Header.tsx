
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
    `transition-colors pb-1 border-b-2 font-bold text-[13px] uppercase tracking-wider ${
      currentView === view 
      ? 'text-blue-600 border-blue-600' 
      : 'text-gray-400 border-transparent hover:text-gray-600 hover:border-gray-200'
    }`;

  return (
    <header className="bg-white border-b border-gray-100 px-8 py-3 flex flex-col items-center sticky top-0 z-40 shadow-sm">
      {/* Top Logo Section */}
      <div className="flex flex-col items-center mb-6">
        <a 
          href="/" 
          onClick={handleHomeClick}
          className="flex flex-col items-center group transition-opacity hover:opacity-90"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-gray-900 flex items-center justify-center font-black text-lg text-gray-900">
              N
            </div>
            <h1 className="text-xl tracking-[0.3em] font-black text-gray-900">TANGIBLE</h1>
          </div>
          <p className="text-[10px] tracking-[0.5em] text-gray-400 mt-1 uppercase font-bold">N Control</p>
        </a>
      </div>

      {/* Nav & User Section */}
      <div className="w-full flex justify-between items-end max-w-7xl">
        <nav className="flex items-center gap-10">
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
          <div className="flex items-center gap-1 cursor-pointer text-gray-700 font-bold hover:text-blue-600 transition-colors">
            <span>Dan Connerty</span>
            <ChevronDown size={14} />
          </div>
          <span className="text-gray-400 uppercase tracking-tighter font-medium">Testing Groups</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
