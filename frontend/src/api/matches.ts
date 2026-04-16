import axios from 'axios';
import type { Match } from '../types';
export interface PaginatedMatches {
    data: Match[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
export const fetchMatches = async (page: number, limit: number = 5): Promise<PaginatedMatches> => {
    const { data } = await axios.get<PaginatedMatches>(
        `http://localhost:8000/matches?page=${page}&limit=${limit}`
    );
    return data;
};