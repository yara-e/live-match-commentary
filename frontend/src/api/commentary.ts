import axios from 'axios';
import type { Commentary } from '../types';

export const fetchCommentary = async (matchId: number): Promise<Commentary[]> => {
  const { data } = await axios.get<{ data: Commentary[] }>(
    `http://localhost:8000/matches/${matchId}/commentary`
  );
  return data.data;
};