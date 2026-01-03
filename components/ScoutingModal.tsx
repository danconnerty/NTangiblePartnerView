
import React, { useState, useEffect, useMemo } from 'react';
import { X, Loader2, User, ChevronRight } from 'lucide-react';
import { Player } from '../types';
import { MOCK_PLAYERS } from '../mockData';
import { generateFullAthleteReport, FullPlayerReport } from '../services/geminiService';

interface ScoutingModalProps {
  player: Player | null;
  onClose: () => void;
}

type TabType = 'Rankings' | 'NSights' | 'Exercises' | 'NTerpret';

const ScoutingModal: React.FC<ScoutingModalProps> = ({ player, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('Rankings');
  const [report, setReport] = useState<FullPlayerReport | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (player) {
      const fetchReport = async () => {
        setLoading(true);
        const result = await generateFullAthleteReport(player);
        setReport(result);
        setLoading(false);
      };
      fetchReport();
    }
    setActiveTab('Rankings');
  }, [player]);

  const rankings = useMemo(() => {
    if (!player) return null;
    const overall = [...MOCK_PLAYERS].sort((a, b) => b.clutchFactor - a.clutchFactor).slice(0, 10);
    const pos = [...MOCK_PLAYERS]
      .filter(p => p.position === player.position)
      .sort((a, b) => b.clutchFactor - a.clutchFactor)
      .slice(0, 5);
    const grad = [...MOCK_PLAYERS]
      .filter(p => p.graduationYear === player.graduationYear)
      .sort((a, b) => b.clutchFactor - a.clutchFactor)
      .slice(0, 3);
    
    return { overall, pos, grad };
  }, [player]);

  if (!player) return null;

  const TabButton = ({ name }: { name: TabType }) => (
    <button
      onClick={() => setActiveTab(name)}
      className={`px-8 py-3 text-sm font-medium transition-all border-r last:border-r-0 ${
        activeTab === name 
          ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' 
          : 'bg-gray-50 text-gray-400 border-b border-gray-100 hover:bg-white hover:text-gray-600'
      }`}
    >
      {name}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto p-4 md:p-10 pt-4">
      <div className="bg-white w-full max-w-[1200px] rounded-lg shadow-2xl flex flex-col animate-in fade-in slide-in-from-top-4 duration-300 min-h-[80vh]">
        {/* Header Section */}
        <div className="px-10 py-10 border-b border-gray-100 flex justify-between items-start relative">
          <div className="space-y-1">
            <h2 className="text-4xl font-normal text-gray-900">{player.name}</h2>
            <div className="flex flex-col text-sm">
              <span className="text-gray-900">Position <span className="font-bold">{player.position}</span></span>
              <span className="text-gray-900">Level <span className="font-bold">{player.level}</span></span>
            </div>
          </div>
          
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <X size={32} strokeWidth={1} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 divide-x divide-gray-100 border-b border-gray-100 bg-white">
          <div className="px-8 py-6 space-y-1">
            <span className="text-[12px] text-gray-500 uppercase font-medium">Clutch Factor</span>
            <div className="text-4xl font-light text-gray-800 tracking-tight">{player.clutchFactor}</div>
          </div>
          <div className="px-8 py-6 space-y-1">
            <span className="text-[12px] text-gray-500 uppercase font-medium">Scoring Range</span>
            <div className="text-4xl font-light text-gray-800 tracking-tight">{player.scoringRange}</div>
          </div>
          <div className="px-8 py-6 space-y-1">
            <span className="text-[12px] text-gray-500 uppercase font-medium">Round Rank</span>
            <div className="text-4xl font-light text-gray-800 tracking-tight">{player.roundRank}</div>
          </div>
          <div className="px-8 py-6 space-y-1">
            <span className="text-[12px] text-gray-500 uppercase font-medium">Round Positional Rank</span>
            <div className="text-4xl font-light text-gray-800 tracking-tight">{player.roundPositionalRank}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-50 border-b border-gray-100">
          <TabButton name="Rankings" />
          <TabButton name="NSights" />
          <TabButton name="Exercises" />
          <TabButton name="NTerpret" />
        </div>

        {/* Main Content Area */}
        <div className="flex-grow p-10 bg-white">
          {activeTab === 'Rankings' && rankings && (
            <div className="grid grid-cols-3 gap-12">
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">Overall</h3>
                <div className="space-y-4">
                  {rankings.overall.map((p, idx) => (
                    <div key={p.id} className={`flex items-center justify-between text-sm py-1 ${p.id === player.id ? 'bg-blue-50 -mx-2 px-2 rounded font-bold' : ''}`}>
                      <span className="text-gray-700">{idx + 1}. {p.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-mono">{p.clutchFactor}</span>
                        <div className="w-16 h-4 bg-gray-100 rounded-sm overflow-hidden relative">
                           <div 
                            className="absolute inset-0 bg-blue-500/80" 
                            style={{ width: `${(p.clutchFactor / 1000) * 100}%` }}
                           ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">Position</h3>
                <div className="space-y-4">
                  {rankings.pos.map((p, idx) => (
                    <div key={p.id} className={`flex items-center justify-between text-sm py-1 ${p.id === player.id ? 'bg-blue-50 -mx-2 px-2 rounded font-bold' : ''}`}>
                      <span className="text-gray-700">{idx + 1}. {p.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-mono">{p.clutchFactor}</span>
                        <div className="w-16 h-4 bg-gray-100 rounded-sm overflow-hidden relative">
                           <div 
                            className="absolute inset-0 bg-blue-500/80" 
                            style={{ width: `${(p.clutchFactor / 1000) * 100}%` }}
                           ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">Graduation ({player.graduationYear})</h3>
                <div className="space-y-4">
                  {rankings.grad.map((p, idx) => (
                    <div key={p.id} className={`flex items-center justify-between text-sm py-1 ${p.id === player.id ? 'bg-blue-50 -mx-2 px-2 rounded font-bold' : ''}`}>
                      <span className="text-gray-700">{idx + 1}. {p.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-mono">{p.clutchFactor}</span>
                        <div className="w-16 h-4 bg-gray-100 rounded-sm overflow-hidden relative">
                           <div 
                            className="absolute inset-0 bg-blue-500/80" 
                            style={{ width: `${(p.clutchFactor / 1000) * 100}%` }}
                           ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'NSights' || activeTab === 'Exercises' || activeTab === 'NTerpret') && (
            <div className="min-h-[300px]">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 py-20">
                  <Loader2 className="animate-spin text-blue-600" size={48} />
                  <p className="text-gray-400 font-medium uppercase tracking-widest text-xs">Generating Advanced Insights...</p>
                </div>
              ) : report ? (
                <div className="animate-in fade-in duration-500">
                  {activeTab === 'NSights' && (
                    <div className="space-y-8 max-w-4xl">
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-gray-900">Summary</h4>
                        <p className="text-gray-700 leading-relaxed text-[15px]">{report.summary}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-gray-900">Practice Suggestion</h4>
                        <p className="text-gray-700 leading-relaxed text-[15px]">{report.practiceSuggestion}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-gray-900">Approach</h4>
                        <p className="text-gray-700 leading-relaxed text-[15px]">{report.approach}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-gray-900">Coaching Suggestion</h4>
                        <p className="text-gray-700 leading-relaxed text-[15px]">{report.coachingSuggestion}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Exercises' && (
                    <div className="space-y-10 max-w-4xl">
                      {report.exercises.map((ex, idx) => (
                        <div key={idx} className="space-y-2">
                          <h4 className="text-sm font-bold text-gray-900">{ex.title}</h4>
                          <p className="text-gray-700 leading-relaxed text-[15px]">{ex.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'NTerpret' && (
                    <div className="space-y-12 max-w-4xl pb-10">
                      <div className="flex justify-between items-start">
                        <h3 className="text-4xl font-normal text-gray-900">{player.name}</h3>
                        <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">NTerpret v2</span>
                      </div>
                      
                      <div className="space-y-8">
                         <div className="space-y-2">
                          <h4 className="text-[13px] font-bold text-gray-900">Summary</h4>
                          <p className="text-gray-700 leading-relaxed">{report.nterpret.summary}</p>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-[13px] font-bold text-gray-900">Coaching considerations</h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            {report.nterpret.coachingConsiderations.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-[13px] font-bold text-gray-900">Is this player mentally tough?</h4>
                          <p className="text-gray-700 leading-relaxed">{report.nterpret.mentalToughness}</p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-[13px] font-bold text-gray-900">Communication Style</h4>
                          <p className="text-gray-700 leading-relaxed">
                            <span className="font-bold">{report.nterpret.communicationStyle.style} — </span>
                            {report.nterpret.communicationStyle.detail}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-[13px] font-bold text-gray-900">Learning Style</h4>
                          <p className="text-gray-700 leading-relaxed">
                            <span className="font-bold">{report.nterpret.learningStyle.style} — </span>
                            {report.nterpret.learningStyle.detail}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-[13px] font-bold text-gray-900">Motivational Anchor</h4>
                          <p className="text-gray-700 leading-relaxed">
                            <span className="font-bold">{report.nterpret.motivationalAnchor.anchor} — </span>
                            {report.nterpret.motivationalAnchor.detail}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end pt-10 border-t border-gray-100">
                         <button className="flex items-center gap-2 text-blue-600 font-medium hover:underline text-sm">
                           {player.name} <ChevronRight size={16} />
                         </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center gap-2 text-red-500 py-20">
                  <p>Failed to generate report. Please try again.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-10 py-8 border-t border-gray-100 flex justify-end bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-10 py-3 bg-[#717C89] text-white rounded-xl font-bold text-sm hover:bg-[#5F6A75] transition-all shadow-lg shadow-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoutingModal;
