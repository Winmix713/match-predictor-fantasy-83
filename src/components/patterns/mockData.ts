// src/components/patterns/mockData.ts
import { DataSource, PatternDefinition, PatternDetectionResult } from '../../types/match'; // Fixed path

// Sample data sources
export const dataSources: DataSource[] = [
  {
    id: '1',
    name: 'Premier League 2024-2025',
    type: 'api',
    description: 'API feed for the current Premier League season',
    connection: { url: 'https://api.example.com/v1/premier-league/2024-2025' },
    lastSync: '2025-04-03T14:30:00Z',
    status: 'active',
    matches: 240
  },
  {
    id: '2',
    name: 'Historical Match Data',
    type: 'csv',
    description: 'Historical match data from previous 5 seasons',
    connection: { filename: 'historical_data.csv' },
    lastSync: '2025-04-01T09:15:00Z',
    status: 'active',
    matches: 1200
  },
  {
    id: '3',
    name: 'La Liga Database',
    type: 'database',
    description: 'SQL database with La Liga match records',
    connection: { host: 'db.example.com', database: 'laliga_stats' },
    lastSync: '2025-04-02T18:45:00Z',
    status: 'active',
    matches: 380
  },
  {
    id: '4',
    name: 'Bundesliga Archive',
    type: 'api',
    description: 'Historical Bundesliga data via API',
    connection: { url: 'https://api.example.com/v1/bundesliga/archive' },
    lastSync: '2025-03-28T11:20:00Z',
    status: 'error',
    matches: 306
  },
  {
    id: '5',
    name: 'Manual Entry Dataset',
    type: 'manual',
    description: 'Manually entered match data for testing',
    connection: null,
    lastSync: '2025-03-15T09:30:00Z',
    status: 'inactive',
    matches: 24
  }
];

// Sample predefined patterns
export const predefinedPatterns: PatternDefinition[] = [
  {
    id: 'p1',
    name: 'Draw to Away Win Turnaround',
    description: 'Matches where the result changes from a draw at half-time to an away win at full-time',
    type: 'turnaround',
    conditions: [
      { id: 'c1', field: 'htHomeScore', operator: '=', value: 'htAwayScore' }, // No logical operator on first condition
      { id: 'c2', field: 'ftAwayScore', operator: '>', value: 'ftHomeScore', logicalOperator: 'AND' }
    ],
    createdAt: '2025-03-20T10:00:00Z',
    lastUpdated: '2025-04-01T14:30:00Z',
    isActive: true
  },
  {
    id: 'p2',
    name: 'Home Team Comeback',
    description: 'Matches where the home team was losing at half-time but won at full-time',
    type: 'turnaround',
    conditions: [
      { id: 'c3', field: 'htHomeScore', operator: '<', value: 'htAwayScore' },
      { id: 'c4', field: 'ftHomeScore', operator: '>', value: 'ftAwayScore', logicalOperator: 'AND' }
    ],
    createdAt: '2025-03-22T15:45:00Z',
    lastUpdated: '2025-03-22T15:45:00Z',
    isActive: true
  },
  {
    id: 'p3',
    name: 'High Scoring Second Half',
    description: 'Matches with 3+ goals scored in the second half',
    type: 'goals',
    conditions: [
      { id: 'c5', field: 'ftHomeScore', operator: '>', value: 'htHomeScore' }, // Changed from "-" to ">"
      { id: 'c6', field: 'ftAwayScore', operator: '>', value: 'htAwayScore', logicalOperator: 'AND' },
      { id: 'c7', field: 'secondHalfGoals', operator: '>=', value: 3, logicalOperator: 'AND' }
    ],
    createdAt: '2025-03-25T09:10:00Z',
    lastUpdated: '2025-03-30T11:20:00Z',
    isActive: true
  },
  {
    id: 'p4',
    name: 'Exact 2-1 Final Score',
    description: 'Matches that end with exactly 2-1 to the home team',
    type: 'scoreline',
    conditions: [
      { id: 'c8', field: 'ftHomeScore', operator: '=', value: 2 },
      { id: 'c9', field: 'ftAwayScore', operator: '=', value: 1, logicalOperator: 'AND' }
    ],
    createdAt: '2025-03-18T14:30:00Z',
    lastUpdated: '2025-03-18T14:30:00Z',
    isActive: false
  },
  {
    id: 'p5',
    name: 'Custom Pattern - Late Goals',
    description: 'Matches with goals scored after the 80th minute that change the result',
    type: 'custom',
    conditions: [
      { id: 'c10', field: 'hasLateGoals', operator: '=', value: true },
      { id: 'c11', field: 'resultChangedAfter80', operator: '=', value: true, logicalOperator: 'AND' }
    ],
    createdAt: '2025-04-01T16:20:00Z',
    lastUpdated: '2025-04-02T10:15:00Z',
    isActive: true
  }
];

// Sample pattern detection results
export const patternResults: PatternDetectionResult[] = [
  {
    patternId: 'p1',
    patternName: 'Draw to Away Win Turnaround',
    matches: [
      {
        matchId: 12345,
        homeTeam: 'Arsenal',
        awayTeam: 'Liverpool',
        date: '2025-03-15T15:00:00Z',
        league: 'Premier League',
        pattern: {
          htHomeScore: 1,
          htAwayScore: 1,
          ftHomeScore: 1,
          ftAwayScore: 3
        },
        confidenceScore: 92.5
      },
      {
        matchId: 12346,
        homeTeam: 'Everton',
        awayTeam: 'Manchester City',
        date: '2025-03-16T14:00:00Z',
        league: 'Premier League',
        pattern: {
          htHomeScore: 0,
          htAwayScore: 0,
          ftHomeScore: 0,
          ftAwayScore: 2
        },
        confidenceScore: 88.0
      }
    ],
    frequency: 24.6,
    confidenceScore: 81.5,
    significance: 'high',
    insights: [
      'This pattern occurs most frequently in matches where the home team has poor second-half defensive stats',
      'The away teams in these matches typically have strong counterattacking ability'
    ]
  },
  {
    patternId: 'p2',
    patternName: 'Home Team Comeback',
    matches: [
      {
        matchId: 12347,
        homeTeam: 'Barcelona',
        awayTeam: 'Real Madrid',
        date: '2025-03-20T19:45:00Z',
        league: 'La Liga',
        pattern: {
          htHomeScore: 0,
          htAwayScore: 1,
          ftHomeScore: 3,
          ftAwayScore: 1
        },
        confidenceScore: 95.0
      }
    ],
    frequency: 18.2,
    confidenceScore: 76.8,
    significance: 'medium',
    insights: [
      'Home teams with strong attacking substitutes are more likely to achieve comebacks',
      'Teams with better fitness levels tend to perform better in second-half comebacks'
    ]
  },
  {
    patternId: 'p3',
    patternName: 'High Scoring Second Half',
    matches: [
      {
        matchId: 12348,
        homeTeam: 'Bayern Munich',
        awayTeam: 'Dortmund',
        date: '2025-03-22T17:30:00Z',
        league: 'Bundesliga',
        pattern: {
          htHomeScore: 1,
          htAwayScore: 0,
          ftHomeScore: 3,
          ftAwayScore: 2,
          secondHalfGoals: 4
        },
        confidenceScore: 89.5
      }
    ],
    frequency: 32.7,
    confidenceScore: 84.2,
    significance: 'high',
    insights: [
      'Teams tend to take more risks in the second half when chasing a result',
      'Fatigue factors lead to more defensive errors in the latter stages of matches'
    ]
  }
];
