
import React, { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';

export interface InviteFormData {
  firstName: string;
  lastName: string;
  email: string;
  level: string;
  team: string;
  organization: string;
}

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'athlete' | 'coach';
  initialData?: Partial<InviteFormData> | null;
  isEditing?: boolean;
  onSubmit?: (data: InviteFormData) => void;
}

const InviteModal: React.FC<InviteModalProps> = ({ 
  isOpen, 
  onClose, 
  type, 
  initialData, 
  isEditing = false,
  onSubmit 
}) => {
  const [formData, setFormData] = useState<InviteFormData>({
    firstName: '',
    lastName: '',
    email: '',
    level: type === 'coach' ? 'NCAA' : 'HS',
    team: 'Baseball',
    organization: ''
  });

  // Reset or populate form data when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          firstName: initialData.firstName || '',
          lastName: initialData.lastName || '',
          email: initialData.email || '',
          level: initialData.level || (type === 'coach' ? 'NCAA' : 'HS'),
          team: 'Baseball',
          organization: initialData.organization || ''
        });
      } else {
        // Reset to default
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          level: type === 'coach' ? 'NCAA' : 'HS',
          team: 'Baseball',
          organization: ''
        });
      }
    }
  }, [isOpen, initialData, type]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Sending invite:', formData);
    }
    onClose();
  };

  const title = isEditing 
    ? (type === 'coach' ? 'Edit Organization' : 'Edit Player') 
    : (type === 'athlete' ? 'Invite new player' : 'Invite new coach');

  const submitLabel = isEditing ? 'Save Changes' : 'Send Invite';

  // Determine if we should show name fields (hide for organization edit if names aren't relevant)
  // For this requirement, if we are editing a "School/Organization", we might not need First/Last name.
  // We'll check if it's a coach edit.
  const showNameFields = !isEditing || type === 'athlete';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="bg-white w-full max-w-[500px] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-8 py-6 flex justify-between items-center border-b border-gray-100 bg-white">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full p-2 transition-all"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white">
          <div className="px-8 py-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Info Alert */}
            {!isEditing && (
              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                <p className="text-blue-600 text-xs font-semibold leading-relaxed">
                  <span className="font-black uppercase tracking-wider mr-1">Note:</span>
                  Select the correct team to ensure the correct assessment is presented.
                </p>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-5">
              {showNameFields && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">First name</label>
                    <input
                      type="text"
                      required={showNameFields}
                      placeholder="e.g. Jackson"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#638CE2] focus:bg-white transition-all text-gray-900 font-bold text-sm"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Last name</label>
                    <input
                      type="text"
                      required={showNameFields}
                      placeholder="e.g. Smith"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#638CE2] focus:bg-white transition-all text-gray-900 font-bold text-sm"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {type === 'coach' && (
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. University of Florida"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#638CE2] focus:bg-white transition-all text-gray-900 font-bold text-sm"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="athlete@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#638CE2] focus:bg-white transition-all text-gray-900 font-bold text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Level of Play</label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#638CE2] focus:bg-white transition-all text-gray-900 font-bold text-sm appearance-none cursor-pointer"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  >
                    {type === 'athlete' && <option value="HS">HS</option>}
                    <option value="NCAA">NCAA</option>
                    <option value="JUCO">JUCO</option>
                    <option value="Pro">Pro</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>

              {!isEditing && (
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Team</label>
                  <input
                    type="text"
                    readOnly
                    className="w-full px-4 py-3 bg-gray-100/50 border border-gray-100 rounded-xl text-gray-500 font-bold text-sm cursor-default"
                    value={formData.team}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-8 pb-8 pt-4 flex justify-end gap-3 border-t border-gray-50 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-xs hover:bg-gray-50 transition-all uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-[#638CE2] text-white rounded-xl font-bold text-xs hover:bg-[#5279D1] transition-all shadow-lg shadow-blue-100 uppercase tracking-wider transform hover:-translate-y-0.5"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteModal;
