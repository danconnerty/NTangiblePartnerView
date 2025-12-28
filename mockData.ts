
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
    
    // Generate a random date within the last 6 months
    const randomTime = sixMonthsAgo.getTime() + Math.random() * (today.getTime() - sixMonthsAgo.getTime());
    const lastTestedDate = new Date(randomTime).toISOString();

    players.push({
      id: `${i + 1}`,
      name: `${lastName}, ${firstName}`,
      position: positions[Math.floor(Math.random() * positions.length)],
      round: 'Demo',
      graduationYear: gradYear,
      clutchFactor: 400 + Math.floor(Math.random() * 500),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      needsRetest: Math.random() > 0.7, // 30% chance they need a retest
      lastTestedDate: lastTestedDate
    });
  }
  return players.sort((a, b) => a.name.localeCompare(b.name));
};

export const MOCK_PLAYERS: Player[] = generatePlayers(60);
