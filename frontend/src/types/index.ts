export type MatchStatus = 'scheduled' | 'live' | 'finished';

export interface Match {
    id: number;
    sport: string;  
    homeTeam: string;
    awayTeam: string;
    status: MatchStatus;
    startTime: string | null;
    endTime: string | null;
    homeScore: number;
    awayScore: number;
    createdAt: string;
}

export interface Commentary {
    id: number;
    matchId: number;
    minute: number | null;
    sequence: number | null;
    period: string | null;
    eventType: string | null;  
    actor: string | null;    
    team: string | null;
    message: string;          
    metadata: Record<string, unknown> | null;  
    tags: string[] | null;
    createdAt: string;
}
 
export type SocketMessage =
    | { type: 'welcome' }
    | { type: 'match_created'; data: Match }
    | { type: 'commentary'; data: Commentary }
    | { type: 'subscribed'; matchId: number }
    | { type: 'unsubscribed'; matchId: number }
    | { type: 'error'; message: string };

export type ClientMessage =
    | { type: 'subscribe'; matchId: number }
    | { type: 'unsubscribe'; matchId: number };