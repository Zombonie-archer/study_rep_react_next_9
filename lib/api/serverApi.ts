import { api } from "./api";
import type { Note } from "@/types/note";
import { FetchNotesParams, NotesHttpResponse } from "./clientApi";
import { cookies } from "next/headers";
import { User } from "@/types/user";

export const fetchNotes = async (
  search: string,
  tag: string | "all",
  page: number,
): Promise<NotesHttpResponse> => {
  const cookieStore = await cookies();
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
    headers: {
      cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await api.get<Note>(`/notes/${noteId}`, {
    headers: {
      cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const response = await api.get(`/auth/session`, {
    headers: {
      cookie: cookieStore.toString(),
    },
  });

  return response;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const response = await api.get<User>(`/users/me`, {
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  return response.data;
}