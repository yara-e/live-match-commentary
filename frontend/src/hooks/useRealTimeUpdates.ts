import { useEffect } from 'react';
import { useWebSocket } from '../context/WebSocketContext';
import { useQueryClient } from '@tanstack/react-query';

export const useRealTimeUpdates = () => {
  const { lastMessage } = useWebSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!lastMessage) return;

    switch (lastMessage.type) {
      case 'match_created':
        queryClient.invalidateQueries({ queryKey: ['matches'] });
        break;

      case 'commentary':
        queryClient.invalidateQueries({ 
          queryKey: ['commentary', lastMessage.data.matchId] 
        });
        break;
        
    }
  }, [lastMessage, queryClient]);
};