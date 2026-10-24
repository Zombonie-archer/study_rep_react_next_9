import { api } from "./api";
import type { Note, NoteFormValues } from "@/types/note";
import type { User } from "@/types/user";

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  search: string;
  tag?: string;
  page: number;
  perPage: number;
}

export interface RegisterParams {
  email: string;
  password: string;
}

export interface EditProfileParams {
  username: string;
  email: string;
}

export interface SessionResponse {
  success: boolean;
}

export const fetchNotes = async (
  search: string,
  tag: string | "all",
  page: number,
): Promise<NotesHttpResponse> => {
  const params: FetchNotesParams = {
    search,
    perPage: 12,
    page,
  };
  if (tag !== "all") {
    params.tag = tag;
  }

  const response = await api.get<NotesHttpResponse>(`/notes`, {
    params,
  });
  return response.data;
};

export const createNote = async (noteData: NoteFormValues): Promise<Note> => {
  const response = await api.post<Note>(`/notes`, noteData);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${noteId}`);
  return response.data;
};

export const register = async (data : RegisterParams): Promise<User> => {
  const response = await api.post<User>(`/auth/register`, data);
  return response.data;
};

export const login = async (data : RegisterParams): Promise<User> => {
  const response = await api.post<User>(`/auth/login`, data);
  return response.data;
};

export const checkSession = async (): Promise<SessionResponse> => {
  const response = await api.get<SessionResponse>(`/auth/session`);
  return response.data;
}

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>(`/users/me`);
  return response.data;
}

export const logout = async (): Promise<void> => {
  await api.post<void>(`/auth/logout`);
}

export const updateMe = async (data: EditProfileParams): Promise<User> => {
  const response = await api.patch<User>(`/users/me`, data);
  return response.data;
}