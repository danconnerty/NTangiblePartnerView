
import React, { useState, useMemo } from 'react';
import { Search, UserPlus, Mail, Send, Clock, CheckCircle, XCircle, AlertCircle, RefreshCcw, User, Bell, Calendar, Pencil, Trash2, ShieldCheck } from 'lucide-react';
import { MOCK_PLAYERS } from '../mockData';

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
  
  // Athlete-specific mock data
  const athleteInvites: Invite[] = [
    { id: '1', name: 'Marcus Rivera', email: 'm.rivera@example.com', status: 'accepted', sentAt: '2023-10-12' },
    { id: '2', name: 'Steven Jenkins', email: 'sjenkins@scout.org', status: 'pending', sentAt: '2023-10-24' },
    { id: '3', name: 'Bill Thompson', email: 'bill.t@varsity.edu', status: 'expired', sentAt: '2023-09-15' },
    { id: '4', name: 'David Lee', email: 'dlee@prospects.com', status: 'pending', sentAt: '2023-10-28' },
    { id: '5', name: 'Roberto Rodriguez', email: 'roberto.r@mlb.com', status: 'accepted', sentAt: '2023-08-30' },
    { id: '6', name: 'Chris Evans', email: 'ce@prospects.net', status: 'pending', sentAt: '2023-11-01' },
    { id: '7', name: 'Jordan Smith', email: 'jsmith@diamond.com', status: 'pending', sentAt: '2023-11-02' },
    { id: '8', name: 'Travis Swift', email: 'tswift@athlete.io', status: 'pending', sentAt: '2023-11-03' },
  ];

  // Coach-specific mock data (Colleges)
  const coachInvites: Invite[] = [
    { id: 'c1', name: 'Vanderbilt University', email: 'recruiting@vanderbilt.edu', status: 'pending', sentAt: '2023-11-01' },
    { id: 'c2', name: 'Louisiana State University (LSU)', email: 'baseball@lsu.edu', status: 'pending', sentAt: '2023-11-02' },
    { id: 'c3', name: 'Chipola College (JUCO)', email: 'athletics@chipola.edu', status: 'pending', sentAt: '2023-11-03' },
    { id: 'c4', name: 'San Jacinto College (JUCO)', email: 'coach@sanjac.edu', status: 'pending', sentAt: '2023-11-04' },
    { id: 'c5', name: 'Florida State University', email: 'info@fsu.edu', status: 'pending', sentAt: '2023-11-05' },
    { id: 'c6', name: 'Arizona State University', email: 'sundevils@asu.edu', status: 'accepted', sentAt: '2023-10-20' },
    { id: 'c7', name: 'Texas A&M University', email: 'aggies@tamu.edu', status: 'pending', sentAt: '2023-11-06' },
  ];

  // Registered Schools (Already setup profiles)
  const registeredSchools: SchoolProfile[] = [
    { id: 's1', name: 'Mississippi State University', email: 'contact@msstate.edu', status: 'active', division: 'NCAA D1' },
    { id: 's2', name: 'University of Florida', email: 'recruiting@gators.com', status: 'active', division: 'NCAA D1' },
    { id: 's3', name: 'Georgia Tech', email: 'baseball@gatech.edu', status: 'updating', division: 'NCAA D1' },
    { id: 's4', name: 'Navarro College (JUCO)', email: 'scouts@navarro.edu', status: 'active', division: 'JUCO' },
    { id: 's5', name: 'Stanford University', email: 'athletics@stanford.edu', status: 'active', division: 'NCAA D1' },
  ];

  // Highlighted players for retest (First 20 from mock data)
  const retestPlayersWithDates = useMemo(() => {
    return MOCK_PLAYERS.slice(0, 20).map(player => {
      const today = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(today.getMonth() - 6);
      
      const randomTime = sixMonthsAgo.getTime() + Math.random() * (today.getTime() - sixMonthsAgo.getTime());
      return {
        ...player,
        lastTested: new Date(randomTime)
      };
    });
  }, []);

  const filteredInvites = useMemo(() => {
    let list = type === 'athlete' ? athleteInvites : coachInvites;
    
    // Both views now only show pending status per requirements
    list = list.filter(inv => inv.status === 'pending');
    
    return list.filter(inv => 
      inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, type]);

  const getStatusBadge = (status: Invite['status']) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
            <CheckCircle size={12} /> Accepted
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-100">
            <Clock size={12} /> Pending
          </span>
        );
      case 'expired':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 text-gray-500 rounded-full text-[10px] font-bold uppercase tracking-wider border border-gray-200">
            <XCircle size={12} /> Expired
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 pb-20">
      
      {/* 1. Action Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <UserPlus size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Invite New {type === 'athlete' ? 'Athlete' : 'College Coach'}</h3>
            <p className="text-sm text-gray-500">Send a secure registration link to join the series.</p>
          </div>
        </div>
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-grow md:w-80">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="email" 
              placeholder={type === 'athlete' ? "Enter email address..." : "College recruitment email..."}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-300 outline-none transition-all text-sm"
            />
          </div>
          <button className="bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all flex items-center gap-2 whitespace-nowrap">
            <Send size={16} /> Send Invite
          </button>
        </div>
      </div>

      {/* 2. Invites Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              {type === 'athlete' ? 'Pending Athlete Invitations' : 'Pending College Invitations'}
            </h2>
            <p className="text-[10px] text-gray-400 mt-1 uppercase font-medium">Viewing Pending Only</p>
          </div>
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder={type === 'athlete' ? "Filter by name..." : "Filter by college..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-300 transition-all text-sm"
            />
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {type === 'athlete' ? 'Recipient' : 'College Name'}
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredInvites.length > 0 ? (
                filteredInvites.map((inv) => (
                  <tr key={inv.id} className="hover:bg-blue-50/20 transition-colors">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">{inv.name}</span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{inv.email}</span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      {getStatusBadge(inv.status)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-400 italic text-sm">
                    No matching pending invites found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-100">
           <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            Showing <span className="text-gray-700">{filteredInvites.length}</span> pending results
          </p>
        </div>
      </div>

      {/* 3. Bottom Sections (Context-Specific) */}
      
      {/* Athlete View: Retest Priority Queue */}
      {type === 'athlete' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="bg-red-500 p-2 rounded-lg text-white shadow-lg shadow-red-100">
                <AlertCircle size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Players Queue - Retest</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Players who have not completed testing within 12 month period</p>
              </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-red-50/30 border-b border-red-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-red-400 uppercase tracking-widest">Athlete Name</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-red-400 uppercase tracking-widest">Position</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-red-400 uppercase tracking-widest">Completion Date</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-red-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {retestPlayersWithDates.map((player) => (
                    <tr key={player.id} className="hover:bg-red-50/20 transition-colors group">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-red-100 group-hover:text-red-500 transition-colors">
                            <User size={16} />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{player.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="text-sm text-gray-500">{player.position}</span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-red-600 font-medium">
                          <Calendar size={14} className="text-red-400" />
                          {player.lastTested.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right">
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-red-600 transition-all shadow-md shadow-red-100">
                          <Bell size={12} /> Notify
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Coaches View: Registered Schools */}
      {type === 'coach' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-100">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Registered School Profiles</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active recruitment partners</p>
              </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">School Name</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Primary Contact</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {registeredSchools.map((school) => (
                    <tr key={school.id} className="hover:bg-blue-50/10 transition-colors">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900">{school.name}</span>
                          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">{school.division}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="text-sm text-gray-500">{school.email}</span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-4">
                          <button className="text-gray-400 hover:text-blue-500 transition-colors" title="Edit Profile">
                            <Pencil size={18} />
                          </button>
                          <button className="text-gray-400 hover:text-red-500 transition-colors" title="Remove Profile">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-100">
               <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                Total Registered: <span className="text-gray-700">{registeredSchools.length}</span> programs
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteManager;
