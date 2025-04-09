// src/types/match.ts (Example path - make sure this matches your actual structure)

export interface DataSourceConnection {
  url?: string;
  filename?: string;
  host?: string;
  database?: string;
  // Add other connection types as needed
}

export interface DataSource {
  id: string;
  name: string;
  type: 'api' | 'csv' | 'database' | 'manual' | string; // Allow custom string types
  description?: string;
  connection: DataSourceConnection | null;
  lastSync?: string; // ISO Date string
  status: 'active' | 'inactive' | 'error' | 'syncing' | string; // Allow custom statuses
  matches?: number; // Make optional if not always available
}

export interface PatternCondition {
  id: string; // Unique ID for the condition
  field: string; // e.g., 'htHomeScore', 'ftAwayScore', 'matchTime'
  operator: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'contains' | 'startsWith' | 'endsWith' | string; // Allow custom operators
  value: string | number; // Can be a literal value or reference another field (e.g., 'htAwayScore')
  logicalOperator?: 'AND' | 'OR'; // Operator connecting this condition to the PREVIOUS one
}

export type PatternType = 'turnaround' | 'scoreline' | 'goals' | 'streak' | 'custom' | string;

export interface PatternDefinition {
  id: string;
  name: string;
  description: string;
  type: PatternType;
  conditions: PatternCondition[];
  isActive: boolean;
  createdAt?: string; // ISO Date string
  lastUpdated?: string; // ISO Date string
}

export interface MatchPatternData {
  // Example fields identified by the pattern
  htHomeScore?: number;
  htAwayScore?: number;
  ftHomeScore?: number;
  ftAwayScore?: number;
  // Add other relevant fields identified for this specific match instance
  [key: string]: any; // Allow other dynamic fields
}

export interface MatchedInstance {
  matchId: number | string; // Unique ID of the match
  homeTeam: string;
  awayTeam: string;
  date: string; // ISO Date string or other format
  league?: string;
  pattern: MatchPatternData; // Data specific to why this match matched
  confidenceScore?: number; // Confidence for this specific instance (optional)
}

export interface PatternDetectionResult {
  patternId: string; // ID linking back to PatternDefinition
  patternName: string; // Denormalized name for convenience
  matches: MatchedInstance[]; // List of matches where the pattern was detected
  frequency?: number; // Overall frequency percentage (e.g., 24.6)
  confidenceScore?: number; // Overall confidence score percentage (e.g., 81.5)
  significance: 'high' | 'medium' | 'low' | string; // Significance level
  insights?: string[]; // Textual insights derived from the analysis
}

// --- End of types/match.ts ---

// src/mockData.ts (Keep your mock data file)
import { DataSource, PatternDefinition, PatternDetectionResult } from './types/match'; // Adjust import path

// Sample data sources
export const dataSources: DataSource[] = [
  // ... (keep your existing mock dataSources)
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
   // ... more sources
];

// Sample predefined patterns
export const predefinedPatterns: PatternDefinition[] = [
  // ... (keep your existing mock predefinedPatterns)
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
    // ... more patterns
];

// Sample pattern detection results
export const patternResults: PatternDetectionResult[] = [
  // ... (keep your existing mock patternResults)
  {
    patternId: 'p1',
    patternName: 'Draw to Away Win Turnaround',
    matches: [
        // ... match instances
    ],
    frequency: 24.6,
    confidenceScore: 81.5,
    significance: 'high',
    insights: [
      'This pattern occurs most frequently in matches where the home team has poor second-half defensive stats',
      'The away teams in these matches typically have strong counterattacking ability'
    ]
  },
   // ... more results
];
