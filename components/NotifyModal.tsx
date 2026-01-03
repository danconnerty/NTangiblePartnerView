
import React, { useState, useEffect } from 'react';
import { X, Bell, Clock } from 'lucide-react';

interface NotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (email: string) => void;
  playerName: string;
  initialEmail: string;
}

const NotifyModal: React.FC<NotifyModalProps> = ({ isOpen, onClose, onConfirm, playerName, initialEmail }) => {
  const [email, setEmail] = useState(initialEmail);

  // Reset email when modal opens or initial data changes
  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="bg-white w-full max-w-[480px] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-8 py-6 flex justify-between items-center border-b border-gray-100">
           <div className="flex items-center gap-3">
              <div className="bg-red-50 p-2 rounded-full text-red-500 shadow-sm">
                 <Bell size={20} fill="currentColor" className="opacity-20" />
                 <Bell size={20} className="absolute -ml-5" />
              </div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Notify Athlete</h2>
           </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full p-2 transition-all"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <p className="text-gray-600 text-sm font-medium leading-relaxed">
              You are notifying <span className="font-bold text-gray-900">{playerName}</span> that a retest is required. Please confirm the contact details below.
            </p>
          </div>

          <div className="space-y-2">
             <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Confirm Email Address</label>
             <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-50 focus:border-red-300 transition-all text-gray-900 font-bold text-sm"
             />
          </div>

          <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex gap-4">
             <div className="shrink-0 text-blue-500 mt-0.5">
                <Clock size={20} strokeWidth={2} />
             </div>
             <div className="space-y-1">
                <h4 className="text-xs font-black text-blue-700 uppercase tracking-wider">System Action</h4>
                <p className="text-blue-600/90 text-xs font-medium leading-relaxed">
                   By clicking confirm, this athlete will be entered into an <span className="font-bold">automated weekly reminder system</span> until new assessment data is successfully uploaded.
                </p>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 pt-0 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-xs hover:bg-gray-50 transition-all uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(email)}
              className="px-8 py-3 bg-red-500 text-white rounded-xl font-bold text-xs hover:bg-red-600 transition-all shadow-lg shadow-red-100 uppercase tracking-wider transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              Confirm & Notify
            </button>
        </div>
      </div>
    </div>
  );
};

export default NotifyModal;
