import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCommentary } from '../api/commentary';
import { useWebSocket } from '../context/WebSocketContext';
import type{ Match } from '../types';

interface Props {
  match: Match;
  onBack: () => void;
}

export const MatchDetails: React.FC<Props> = ({ match, onBack }) => {
  const { sendMessage } = useWebSocket();

  const { data: comments, isLoading } = useQuery({
    queryKey: ['commentary', match.id],
    queryFn: () => fetchCommentary(match.id),
  });

  useEffect(() => {
    sendMessage({ type: 'subscribe', matchId: match.id });

    return () => {
       
      sendMessage({ type: 'unsubscribe', matchId: match.id });
    };
  }, [match.id, sendMessage]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <button onClick={onBack} className="text-blue-600 mb-4 flex items-center gap-1">
        ← Back to Matches
      </button>

      <div className="bg-gray-900 text-white p-8 rounded-xl shadow-lg mb-8 text-center">
        <div className="text-blue-400 font-bold mb-2">{match.sport.toUpperCase()}</div>
        <div className="flex flex-col gap-5 justify-around items-center text-2xl font-bold">
          <div>
          <span>{match.homeTeam}</span>
          <span> VS </span>
          <span>{match.awayTeam}</span>
          </div>
          <div>
          <span className="text-4xl bg-gray-800 px-4 py-2 rounded">{match.homeScore} - {match.awayScore}</span>

          </div>
        </div>
      </div>

      <h3 className="font-bold text-xl mb-4">Live Commentary</h3>
      <div className="space-y-4">
        {isLoading && <p>Loading events...</p>}
        {comments?.map((c) => (
          <div key={c.id} className="border-l-4 border-blue-500 pl-4 py-2 bg-white shadow-sm rounded-r">
            <div className="flex justify-between items-start">
              <span className="font-bold text-blue-600">{c.minute}'</span>
              <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleTimeString()}</span>
            </div>
            <p className="text-gray-800">{c.message}</p>
            {c.actor && <span className="text-sm font-medium text-gray-600">— {c.actor}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};