
export type ViewType = 'home' | 'player-invite' | 'coaches-invite';

export interface Player {
  id: string;
  name: string;
  position: string;
  round: string;
  graduationYear?: number | string;
  clutchFactor: number;
  status: 'active' | 'inactive' | 'pending';
  needsRetest: boolean;
  lastTestedDate: string;
}

export enum PlayerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}
