
import React, { useState, useMemo } from 'react';
import { Search, UserPlus, Mail, Send, Clock, CheckCircle, XCircle, AlertCircle, User, Bell, Calendar, Pencil, Trash2, ShieldCheck, Building2 } from 'lucide-react';
import { MOCK_PLAYERS } from '../mockData';
import InviteModal, { InviteFormData } from './InviteModal';
import NotifyModal from './NotifyModal';

interface Invite {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'accepted' | 'expired';
  sentAt: string;
}

interface SchoolProfile {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'updating';
  division: string;
}

interface InviteManagerProps {
  type: 'athlete' | 'coach';
}

const InviteManager: React.FC<InviteManagerProps> = ({ type }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal States
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [editingSchoolId, setEditingSchoolId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<InviteFormData> | null>(null);

  const [notifyState, setNotifyState] = useState<{isOpen: boolean, player: any | null, email: string}>({
    isOpen: false,
    player: null,
    email: ''
  });

  const athleteInvites: Invite[] = [
    { id: '1', name: 'Marcus Rivera', email: 'm.rivera@example.com', status: 'accepted', sentAt: '2023-10-12' },
    { id: '2', name: 'Steven Jenkins', email: 'sjenkins@scout.org', status: 'pending', sentAt: '2023-10-24' },
    { id: '3', name: 'Bill Thompson', email: 'bill.t@varsity.edu', status: 'expired', sentAt: '2023-09-15' },
    { id: '4', name: 'David Lee', email: 'dlee@prospects.com', status: 'pending', sentAt: '2023-10-28' },
    { id: '5', name: 'Roberto Rodriguez', email: 'roberto.r@mlb.com', status: 'accepted', sentAt: '2023-08-30' },
  ];

  const coachInvites: Invite[] = [
    { id: 'c1', name: 'Vanderbilt University', email: 'recruiting@vanderbilt.edu', status: 'pending', sentAt: '2023-11-01' },
    { id: 'c2', name: 'Louisiana State University (LSU)', email: 'baseball@lsu.edu', status: 'pending', sentAt: '2023-11-02' },
    { id: 'c6', name: 'Arizona State University', email: 'sundevils@asu.edu', status: 'accepted', sentAt: '2023-10-20' },
  ];

  const initialSchools: SchoolProfile[] = [
    { id: 's1', name: 'Mississippi State University', email: 'contact@msstate.edu', status: 'active', division: 'NCAA' },
    { id: 's2', name: 'University of Florida', email: 'recruiting@gators.com', status: 'active', division: 'NCAA' },
    { id: 's3', name: 'Texas A&M', email: 'baseball@tamu.edu', status: 'active', division: 'NCAA' },
    { id: 's4', name: 'Chipola College', email: 'recruiting@chipola.edu', status: 'active', division: 'JUCO' },
  ];

  const [schools, setSchools] = useState<SchoolProfile[]>(initialSchools);

  const retestPlayersWithDates = useMemo(() => {
    return MOCK_PLAYERS.slice(0, 10).map(player => ({
      ...player,
      lastTested: new Date()
    }));
  }, []);

  const filteredInvites = useMemo(() => {
    let list = type === 'athlete' ? athleteInvites : coachInvites;
    list = list.filter(inv => inv.status === 'pending');
    return list.filter(inv => 
      inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, type]);

  const getStatusBadge = (status: Invite['status'] | SchoolProfile['status']) => {
    switch (status) {
      case 'accepted':
      case 'active':
        return <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase border border-emerald-100">Active</span>;
      case 'pending':
        return <span className="px-2.5 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold uppercase border border-amber-100">Pending</span>;
      case 'expired':
        return <span className="px-2.5 py-1 bg-gray-50 text-gray-500 rounded-full text-[10px] font-bold uppercase border border-gray-200">Expired</span>;
      default:
        return <span className="px-2.5 py-1 bg-gray-50 text-gray-500 rounded-full text-[10px] font-bold uppercase border border-gray-200">{status}</span>;
    }
  };

  const handleOpenInvite = () => {
    setEditingSchoolId(null);
    setEditFormData(null);
    setIsInviteModalOpen(true);
  };

  const handleEditSchool = (school: SchoolProfile) => {
    setEditingSchoolId(school.id);
    setEditFormData({
      organization: school.name,
      email: school.email,
      level: school.division
    });
    setIsInviteModalOpen(true);
  };

  const handleDeleteSchool = (id: string) => {
    if (window.confirm('Are you sure you want to remove this organization?')) {
      setSchools(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleModalSubmit = (data: InviteFormData) => {
    if (editingSchoolId) {
      // Update existing school
      setSchools(prev => prev.map(s => 
        s.id === editingSchoolId 
          ? { ...s, name: data.organization, email: data.email, division: data.level } 
          : s
      ));
      console.log('Updated school:', data);
    } else {
      // Send invite logic (mock)
      console.log('Sent invite:', data);
    }
    setIsInviteModalOpen(false);
  };

  // --- Notify Modal Handlers ---

  const handleOpenNotify = (player: any) => {
    // Attempt to generate a realistic email from "Last, First"
    let mockEmail = 'athlete@example.com';
    try {
      const [last, first] = player.name.split(', ');
      if (last && first) {
        mockEmail = `${first.toLowerCase()}.${last.toLowerCase()}@example.com`;
      }
    } catch (e) {
      // fallback
    }

    setNotifyState({
      isOpen: true,
      player: player,
      email: mockEmail
    });
  };

  const handleNotifyConfirm = (email: string) => {
    console.log(`Sending retest notification to ${notifyState.player?.name} at ${email}. Weekly reminders enabled.`);
    setNotifyState(prev => ({ ...prev, isOpen: false }));
    // Here you would typically trigger an API call
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 pb-20">
      
      {/* 1. Action Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#638CE2]">
            <UserPlus size={32} />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Invite New {type === 'athlete' ? 'Athlete' : 'College Coach'}</h3>
            <p className="text-sm text-gray-500 font-medium">Send a secure registration link to join the series.</p>
          </div>
        </div>
        <div className="flex w-full md:w-auto">
          <button 
            onClick={handleOpenInvite}
            className="bg-[#638CE2] text-white px-10 py-5 rounded-full font-black text-sm hover:bg-[#5279D1] transition-all flex items-center gap-3 whitespace-nowrap shadow-xl shadow-blue-100"
          >
            <Send size={18} /> OPEN INVITE FORM
          </button>
        </div>
      </div>

      {/* 2. Invites Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-10 py-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em]">
              {type === 'athlete' ? 'Pending Athlete Invitations' : 'Pending College Invitations'}
            </h2>
          </div>
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search invitations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-12 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all text-sm font-medium"
            />
            <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/30">
                <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Recipient</th>
                <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</th>
                <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredInvites.length > 0 ? filteredInvites.map((inv) => (
                <tr key={inv.id} className="hover:bg-blue-50/10 transition-colors">
                  <td className="px-10 py-6 whitespace-nowrap text-sm font-bold text-gray-900">{inv.name}</td>
                  <td className="px-10 py-6 whitespace-nowrap text-sm text-gray-500 font-medium">{inv.email}</td>
                  <td className="px-10 py-6 whitespace-nowrap">{getStatusBadge(inv.status)}</td>
                </tr>
              )) : (
                <tr>
                   <td colSpan={3} className="px-10 py-8 text-center text-gray-400 text-sm italic">No pending invitations found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Partner Organizations (Coach Only) */}
      {type === 'coach' && (
        <div className="space-y-6">
          <div className="flex items-center gap-4 px-2">
             <div className="bg-emerald-500 p-2.5 rounded-xl text-white shadow-lg shadow-emerald-100">
                <Building2 size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Active Partner Organizations</h2>
                <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest">Manage registered schools and organizations</p>
              </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
             <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-emerald-50/20">
                    <th className="px-10 py-5 text-[10px] font-black text-emerald-600 uppercase tracking-widest">Organization Name</th>
                    <th className="px-10 py-5 text-[10px] font-black text-emerald-600 uppercase tracking-widest">Contact Email</th>
                    <th className="px-10 py-5 text-[10px] font-black text-emerald-600 uppercase tracking-widest">Division</th>
                    <th className="px-10 py-5 text-[10px] font-black text-emerald-600 uppercase tracking-widest">Status</th>
                    <th className="px-10 py-5 text-[10px] font-black text-emerald-600 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {schools.map((school) => (
                    <tr key={school.id} className="hover:bg-emerald-50/10 transition-colors group">
                      <td className="px-10 py-6 whitespace-nowrap text-sm font-bold text-gray-900">{school.name}</td>
                      <td className="px-10 py-6 whitespace-nowrap text-sm text-gray-500 font-medium">{school.email}</td>
                      <td className="px-10 py-6 whitespace-nowrap text-sm text-gray-500 font-medium">
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">{school.division}</span>
                      </td>
                      <td className="px-10 py-6 whitespace-nowrap">{getStatusBadge(school.status)}</td>
                      <td className="px-10 py-6 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEditSchool(school)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteSchool(school.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {schools.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-10 py-8 text-center text-gray-400 text-sm italic">No active organizations.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. Retest Queue (Athlete Only) */}
      {type === 'athlete' && (
        <div className="space-y-6">
          <div className="flex items-center gap-4 px-2">
             <div className="bg-red-500 p-2.5 rounded-xl text-white shadow-lg shadow-red-100">
                <AlertCircle size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Retest Queue</h2>
                <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest">Action required: players with expired assessment data</p>
              </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-red-50/20">
                  <th className="px-10 py-5 text-[10px] font-black text-red-400 uppercase tracking-widest">Athlete Name</th>
                  <th className="px-10 py-5 text-[10px] font-black text-red-400 uppercase tracking-widest">Position</th>
                  <th className="px-10 py-5 text-[10px] font-black text-red-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {retestPlayersWithDates.map((player) => (
                  <tr key={player.id} className="hover:bg-red-50/10 transition-colors group">
                    <td className="px-10 py-6 whitespace-nowrap text-sm font-bold text-gray-900">{player.name}</td>
                    <td className="px-10 py-6 whitespace-nowrap text-sm text-gray-500 font-medium">{player.position}</td>
                    <td className="px-10 py-6 whitespace-nowrap text-right">
                      <button 
                        onClick={() => handleOpenNotify(player)}
                        className="bg-red-500 text-white px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-red-600 transition-all shadow-md shadow-red-100 hover:shadow-lg"
                      >
                        Notify
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      <InviteModal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)} 
        type={type} 
        isEditing={!!editingSchoolId}
        initialData={editFormData}
        onSubmit={handleModalSubmit}
      />
      
      <NotifyModal
        isOpen={notifyState.isOpen}
        onClose={() => setNotifyState(prev => ({ ...prev, isOpen: false }))}
        onConfirm={handleNotifyConfirm}
        playerName={notifyState.player?.name || ''}
        initialEmail={notifyState.email}
      />
    </div>
  );
};

export default InviteManager;
