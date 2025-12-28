
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ParticipantTable from './components/ParticipantTable';
import InviteManager from './components/InviteManager';
import FilterSidebar from './components/FilterSidebar';
import { ViewType } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [filterPosition, setFilterPosition] = useState('All');
  const [filterGradYear, setFilterGradYear] = useState('All');

  // Handle browser back/forward buttons (basic routing simulation)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/PlayerInvite') setCurrentView('player-invite');
      else if (path === '/CoachesInvite') setCurrentView('coaches-invite');
      else setCurrentView('home');
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState(); // Initial check

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (view: ViewType) => {
    setCurrentView(view);
    const path = view === 'player-invite' ? '/PlayerInvite' : 
                 view === 'coaches-invite' ? '/CoachesInvite' : '/';
    window.history.pushState({}, '', path);
  };

  const handleResetFilters = () => {
    setFilterPosition('All');
    setFilterGradYear('All');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'player-invite':
        return (
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-light text-gray-900 tracking-tight">Player Invite</h1>
            </div>
            <InviteManager type="athlete" />
          </div>
        );
      case 'coaches-invite':
        return (
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-light text-gray-900 tracking-tight">Coaches Invite</h1>
            </div>
            <InviteManager type="coach" />
          </div>
        );
      case 'home':
      default:
        return (
          <div className="max-w-[1600px] mx-auto">
            <div className="mb-10">
              <h1 className="text-4xl font-light text-gray-900 tracking-tight">Future Stars Series</h1>
            </div>
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              {/* Sidebar: Fixed width on desktop */}
              <aside className="w-full lg:w-[320px] shrink-0">
                <FilterSidebar 
                  selectedPosition={filterPosition}
                  onPositionChange={setFilterPosition}
                  selectedGradYear={filterGradYear}
                  onGradYearChange={setFilterGradYear}
                  onReset={handleResetFilters}
                />
              </aside>

              {/* Main Content: Flexible width */}
              <div className="flex-grow w-full">
                <ParticipantTable 
                  externalPosition={filterPosition} 
                  externalGradYear={filterGradYear} 
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onNavigate={navigate} currentView={currentView} />
      
      <main className="flex-grow container mx-auto px-8 py-10">
        {renderContent()}
      </main>

      <footer className="py-8 flex flex-col items-center border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2 text-[11px] text-gray-400 tracking-widest uppercase font-bold">
          <span>NTANGIBLE</span>
          <span>©</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
