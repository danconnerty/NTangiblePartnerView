
import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { Player } from '../types';
import { MOCK_PLAYERS } from '../mockData';
import ScoutingModal from './ScoutingModal';

type SortField = 'graduationYear' | 'clutchFactor' | 'name' | 'position' | 'lastTestedDate' | 'level';
type SortDirection = 'asc' | 'desc';

interface ParticipantTableProps {
  externalPosition?: string;
  externalGradYear?: string;
  externalLevel?: string;
}

const ParticipantTable: React.FC<ParticipantTableProps> = ({ 
  externalPosition = 'All', 
  externalGradYear = 'All',
  externalLevel = 'All' 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('lastTestedDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      const isNumeric = field === 'clutchFactor' || field === 'graduationYear' || field === 'lastTestedDate';
      setSortDirection(isNumeric ? 'desc' : 'asc');
    }
  };

  const processedPlayers = useMemo(() => {
    let result = [...MOCK_PLAYERS];

    // 1. Text Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.position.toLowerCase().includes(q)
      );
    }

    // 2. Position Filter (from props)
    if (externalPosition !== 'All') {
      result = result.filter(p => p.position === externalPosition);
    }

    // 3. Grad Year Filter (from props)
    if (externalGradYear !== 'All') {
      result = result.filter(p => String(p.graduationYear) === externalGradYear);
    }

    // 4. Level Filter (from props)
    if (externalLevel !== 'All') {
      result = result.filter(p => p.level === externalLevel);
    }

    // 5. Sorting logic
    result.sort((a, b) => {
      const valA = a[sortField] ?? '';
      const valB = b[sortField] ?? '';

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [searchQuery, externalPosition, externalGradYear, externalLevel, sortField, sortDirection]);

  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown size={14} className="opacity-20" />;
    return sortDirection === 'asc' ? <ChevronUp size={14} className="text-blue-600" /> : <ChevronDown size={14} className="text-blue-600" />;
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Search & Filter Bar */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-100 bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wider">Participants</h2>
        </div>

        <div className="relative group">
          <input
            type="text"
            placeholder="Search by athlete name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-300 transition-all text-sm"
          />
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
      </div>

      <div className="overflow-x-auto max-h-[700px] scrollbar-thin scrollbar-thumb-gray-200">
        <table className="w-full text-left table-fixed min-w-[900px]">
          <thead className="sticky top-0 bg-white z-20 shadow-sm border-b border-gray-100">
            <tr>
              <th 
                className="w-1/4 px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Name <SortIndicator field="name" />
                </div>
              </th>
              <th 
                className="w-1/6 px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('position')}
              >
                 <div className="flex items-center gap-1">
                  Position <SortIndicator field="position" />
                </div>
              </th>
               <th 
                className="w-1/6 px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('level')}
              >
                 <div className="flex items-center gap-1">
                  Level <SortIndicator field="level" />
                </div>
              </th>
              <th 
                className="w-1/6 px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('graduationYear')}
              >
                 <div className="flex items-center gap-1">
                  Graduation <SortIndicator field="graduationYear" />
                </div>
              </th>
              <th 
                className="w-1/6 px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('clutchFactor')}
              >
                 <div className="flex items-center gap-1">
                  Clutch Factor <SortIndicator field="clutchFactor" />
                </div>
              </th>
              <th 
                className="w-1/4 px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('lastTestedDate')}
              >
                 <div className="flex items-center gap-1">
                  Completion Date <SortIndicator field="lastTestedDate" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {processedPlayers.length > 0 ? (
              processedPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button 
                        onClick={() => setSelectedPlayer(player)}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors text-left"
                      >
                        {player.name}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {player.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span className="inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">
                      {player.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    {player.graduationYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">
                    {player.clutchFactor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                      <Calendar size={14} className="text-gray-400" />
                      {new Date(player.lastTestedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <p className="italic text-sm">No athletes found matching your current filters.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            Database Count: <span className="text-gray-700">{MOCK_PLAYERS.length}</span>
          </p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            Filtered: <span className="text-gray-700">{processedPlayers.length}</span>
          </p>
        </div>
        
        <div className="flex gap-4">
           <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active</span>
           <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Pending</span>
           <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Inactive</span>
        </div>
      </div>

      <ScoutingModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
    </div>
  );
};

export default ParticipantTable;
