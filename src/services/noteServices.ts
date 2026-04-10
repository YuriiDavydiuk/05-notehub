import axios from "axios";
import type { Note } from "../types/note";

interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

interface NewNote {
  title: string;
  content: string;
  tag: string;
}

const API_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
const BASE_URL = import.meta.env.VITE_NOTEHUB_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const getNotes = async (
  page: number,
  search: string,
): Promise<NoteResponse> => {
  const response = await api.get<NoteResponse>(`/notes`, {
    params: {
      page,
      perPage: 12,
      search,
    },
  });
  return response.data;
};

export const createNote = async (newNote: NewNote) => {
  const response = await api.post<Note>(`/notes`, newNote);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};
