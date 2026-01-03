
import React from 'react';

interface FilterSidebarProps {
  selectedPosition: string;
  onPositionChange: (pos: string) => void;
  selectedGradYear: string;
  onGradYearChange: (year: string) => void;
  selectedLevel: string;
  onLevelChange: (level: string) => void;
  onReset: () => void;
}

const FilterButton: React.FC<{ label: string, active: boolean, onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${
      active 
        ? 'bg-black text-white border-black shadow-sm' 
        : 'bg-white text-gray-600 border-gray-100 hover:border-gray-300 hover:bg-gray-50'
    }`}
  >
    {label}
  </button>
);

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedPosition,
  onPositionChange,
  selectedGradYear,
  onGradYearChange,
  selectedLevel,
  onLevelChange,
  onReset
}) => {
  const positions = ['All', 'Pitcher', 'Catcher', 'Infielder', 'Outfielder', 'Shortstop', 'First Base', 'Third Base'];
  const levels = ['All', 'HS', 'NCAA', 'JUCO', 'Pro'];
  const gradYears = ['All', '2025', '2026', '2027', '2028', '2029', '2030'];

  return (
    <div className="w-full bg-white rounded-[2rem] border border-gray-100 p-8 flex flex-col gap-10 shadow-sm sticky top-28">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black tracking-tight text-gray-900">FILTERS</h2>
        <button 
          onClick={onReset}
          className="text-blue-600 text-xs font-bold hover:text-blue-700 transition-colors tracking-widest"
        >
          RESET
        </button>
      </div>

      {/* Position Section */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">POSITION</h3>
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-2">
          {positions.map(pos => (
            <FilterButton 
              key={pos} 
              label={pos} 
              active={selectedPosition === pos} 
              onClick={() => onPositionChange(pos)} 
            />
          ))}
        </div>
      </div>

      {/* Level Section */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">PLAYING LEVEL</h3>
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-2">
          {levels.map(level => (
            <FilterButton 
              key={level} 
              label={level} 
              active={selectedLevel === level} 
              onClick={() => onLevelChange(level)} 
            />
          ))}
        </div>
      </div>

      {/* Graduation Section */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">GRADUATION CLASS</h3>
        <div className="grid grid-cols-3 gap-2">
          {gradYears.map(year => (
            <FilterButton 
              key={year} 
              label={year} 
              active={selectedGradYear === year} 
              onClick={() => onGradYearChange(year)} 
            />
          ))}
        </div>
      </div>

      {/* Footer Message */}
      <div className="mt-4 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
        <p className="text-[11px] font-bold text-blue-600 leading-relaxed uppercase tracking-widest text-center">
          Filters are applied instantly to the athlete database view.
        </p>
      </div>
    </div>
  );
};

export default FilterSidebar;
