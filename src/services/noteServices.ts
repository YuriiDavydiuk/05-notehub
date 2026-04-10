import axios from "axios";
import type { Note } from "../types/note";

interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

const API_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
const BASE_URL = import.meta.env.VITE_NOTEHUB_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const getNotes = async (page: number): Promise<NoteResponse> => {
  const response = await api.get<NoteResponse>(`/notes`, {
    params: {
      page,
      perPage: 12,
    },
  });
  return response.data;
};
