
import { Player } from './types';

const firstNames = [
  'Jackson', 'Liam', 'Noah', 'Ethan', 'Logan', 'Lucas', 'Mason', 'Oliver', 'Elijah', 'Aiden',
  'James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher',
  'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Steven', 'Paul', 'Andrew', 'Joshua', 'Kenneth'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'
];

const positions = ['Pitcher', 'Catcher', 'Infielder', 'Outfielder', 'Shortstop', 'First Base', 'Third Base'];
const levels = ['HS', 'NCAA', 'JUCO', 'Pro'];
const statuses: Player['status'][] = ['active', 'inactive', 'pending'];

const generatePlayers = (count: number): Player[] => {
  const players: Player[] = [];
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const gradYear = 2025 + Math.floor(Math.random() * 6); // 2025 to 2030
    
    const randomTime = sixMonthsAgo.getTime() + Math.random() * (today.getTime() - sixMonthsAgo.getTime());
    const lastTestedDate = new Date(randomTime).toISOString();

    const clutchFactor = 400 + Math.floor(Math.random() * 500);
    
    let scoringRange = 'Below Average';
    if (clutchFactor >= 800) {
      scoringRange = 'Elite';
    } else if (clutchFactor >= 751) {
      scoringRange = 'Great';
    } else if (clutchFactor >= 725) {
      scoringRange = 'Above Average';
    } else if (clutchFactor >= 651) {
      scoringRange = 'Average';
    }

    players.push({
      id: `${i + 1}`,
      name: `${lastName}, ${firstName}`,
      position: positions[Math.floor(Math.random() * positions.length)],
      round: 'Demo',
      level: levels[Math.floor(Math.random() * levels.length)],
      graduationYear: gradYear,
      clutchFactor: clutchFactor,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      needsRetest: Math.random() > 0.7,
      lastTestedDate: lastTestedDate,
      scoringRange: scoringRange,
      roundRank: Math.floor(Math.random() * 20) + 1,
      roundPositionalRank: Math.floor(Math.random() * 10) + 1
    });
  }
  return players.sort((a, b) => a.name.localeCompare(b.name));
};

export const MOCK_PLAYERS: Player[] = generatePlayers(60);
