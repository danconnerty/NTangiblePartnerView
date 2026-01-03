
export type ViewType = 'home' | 'player-invite' | 'coaches-invite';

export interface Player {
  id: string;
  name: string;
  position: string;
  round: string;
  level: string;
  graduationYear?: number | string;
  clutchFactor: number;
  status: 'active' | 'inactive' | 'pending';
  needsRetest: boolean;
  lastTestedDate: string;
  scoringRange: string;
  roundRank: number;
  roundPositionalRank: number;
}

export enum PlayerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}
