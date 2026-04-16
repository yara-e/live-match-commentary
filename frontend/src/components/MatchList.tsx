import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMatches } from '../api/matches';
import { useRealTimeUpdates } from '../hooks/useRealTimeUpdates';
import { useWebSocket } from '../context/WebSocketContext';
import type { Match } from '../types';

interface MatchListProps {
  onSelectMatch: (match: Match) => void;
}

export const MatchList: React.FC<MatchListProps> = ({ onSelectMatch }) => {
  const [page, setPage] = useState(1);
  const limit = 6;  

  useRealTimeUpdates();
  const { isConnected } = useWebSocket();

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ['matches', page],
    queryFn: () => fetchMatches(page, limit),
    placeholderData: (previousData) => previousData,
  });

  if (isLoading && !data) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading matches...</div>;

  const matches = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="p-4 md:p-6 flex flex-col h-full max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Match Center</h1>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
          <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`} />
          <span className="text-[10px] font-bold text-gray-600 tracking-widest uppercase">
            {isConnected ? 'Connected' : 'Reconnecting'}
          </span>
        </div>
      </header>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {matches.map((match) => (
          <div 
            key={match.id} 
            onClick={() => onSelectMatch(match)}
            className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-500 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden"
          >
            <div className='flex justify-between items-center mb-4'>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {match.sport}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-full ${
                match.status.toLowerCase() === 'live' 
                  ? 'bg-red-100 text-red-600 animate-pulse' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                ● {match.status}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="flex-1 text-sm font-bold text-gray-800 text-right truncate">
                {match.homeTeam}
              </span>
              
              <span className="text-[10px] font-black text-gray-300 italic">VS</span>

              <span className="flex-1 text-sm font-bold text-gray-800 text-left truncate">
                {match.awayTeam}
              </span>
            </div>
       
            <div className="flex justify-center">
              <div className="bg-gray-900 group-hover:bg-blue-600 transition-colors text-white px-6 py-1.5 rounded-xl font-mono text-xl font-bold tracking-widest shadow-lg">
                {match.homeScore} : {match.awayScore}
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-auto pt-8 flex items-center justify-between">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1 || isPlaceholderData}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 bg-white border rounded-xl shadow-sm disabled:opacity-30 hover:bg-gray-50 transition-colors"
        >
          ← Prev
        </button>

        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Page {page} / {meta?.totalPages || 1}
          </span>
        </div>

        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page >= (meta?.totalPages || 1) || isPlaceholderData}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 bg-white border rounded-xl shadow-sm disabled:opacity-30 hover:bg-gray-50 transition-colors"
        >
          Next →
        </button>
      </footer>
    </div>
  );
};