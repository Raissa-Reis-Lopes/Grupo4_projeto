import { Note } from '../contexts/NotesContext';
import request, { requestOptions } from '../utils/request';

interface GetAllNotesResponse {
  data: Note[];
  error?: string;
}

export async function getAllNotesApi(filter?: string): Promise<GetAllNotesResponse> {
  const requestParams: requestOptions = {
    url: `${process.env.REACT_APP_BACKEND_API_ADDRESS}/notes${filter ? `?filter=${filter}` : ''}`,
    method: 'GET',
  };

  try {
    const response = await request(requestParams);
    return {
      data: response.data as Note[],
    };
  } catch (error) {
    const errorMessage = (error as any).message || "Erro desconhecido";
    console.error("Erro ao buscar notas:", errorMessage);
    return {
      data: [],
      error: errorMessage,
    };
  }
}

export async function getNoteByIdApi({ id }: { id: string }) {

  const requestParams: requestOptions = {
    url: `${process.env.REACT_APP_BACKEND_API_ADDRESS}/notes/${id}`,
    method: 'GET',
  };

  try {
    const response = await request(requestParams);

    if (response.error) return { data: null as null, error: response.message };
    return { data: response.data, error: null as null };

  } catch (error) {
    return { data: null as null, error: "getNoteByIdApi : Um erro inesperado aconteceu" };
  }
}

export async function searchNotesByQueryApi({ query }: { query: string }) {
  const body = {
    query,
  };

  const requestParams: requestOptions = {
    url: `${process.env.REACT_APP_BACKEND_API_ADDRESS}/notes/search`,
    method: 'POST',
    body,
  };

  try {
    const response = await request(requestParams);

    if (response.error) return { data: null as null, error: response.message };
    return { data: response.data, error: null as null };

  } catch (error) {
    return { data: null as null, error: "searchNotesByQueryApi : Um erro inesperado aconteceu" };
  }
}

export async function createNoteApi({ title, content, metadata }: Partial<Note>, socketId: string) {
  const body = {
    title,
    content,
    metadata,
  };

  const requestParams: requestOptions = {
    url: `${process.env.REACT_APP_BACKEND_API_ADDRESS}/notes`,
    method: 'POST',
    body,
    socketId: socketId
  };

  try {
    const response = await request<Note>(requestParams);

    if (response.error) return { data: null as null, error: response.message };
    return { data: response.data, error: null as null };

  } catch (error) {
    return { data: null as null, error: "createNoteApi : Um erro inesperado aconteceu" };
  }
}

export async function updateNoteApi({ id, note }: { id: string; note: Partial<Note> }) {
  const body = {
    note
  };

  const requestParams: requestOptions = {
    url: `${process.env.REACT_APP_BACKEND_API_ADDRESS}/notes/${id}`,
    method: 'PUT',
    body,
  };

  try {
    const response = await request<Note>(requestParams);

    if (response.error) return { data: null as null, error: response.message };
    return { data: response.data, error: null as null };

  } catch (error) {
    return { data: null as null, error: "updateNoteApi : Um erro inesperado aconteceu" };
  }
}

export async function deleteNoteApi({ id }: { id: string }) {

  const requestParams: requestOptions = {
    url: `${process.env.REACT_APP_BACKEND_API_ADDRESS}/notes/${id}`,
    method: 'DELETE',
  };

  try {
    const response = await request(requestParams);

    if (response.error) return { data: null as null, error: response.message };
    return { data: response.data, error: null as null };

  } catch (error) {
    return { data: null as null, error: "deleteNoteApi : Um erro inesperado aconteceu" };
  }
}

export async function archiveNoteApi({ id }: { id: string }, socketId: string) {
  const body = { is_in_archive: true };

  const requestParams: requestOptions = {
    url: `${process.env.REACT_APP_BACKEND_API_ADDRESS}/notes/${id}`,
    method: 'PUT',
    body,
    headers: {
      'Content-Type': 'application/json',
      'x-socket-id': socketId,
    },
  };

  try {
    const response = await request<Note>(requestParams);

    if (response.error) return { data: null as null, error: response.message };
    return { data: response.data, error: null as null };

  } catch (error) {
    return { data: null as null, error: "archiveNoteApi : Um erro inesperado aconteceu" };
  }
}


export async function moveNoteToTrashApi({ id }: { id: string }, socketId: string) {
  const body = { is_in_trash: true };

const requestParams: requestOptions = {
    url: `${process.env.REACT_APP_BACKEND_API_ADDRESS}/notes/${id}`,
    method: 'PUT',
    body, //passo o fields
    headers: {
        'Content-Type': 'application/json',
        'x-socket-id': socketId,
    },
};


  try {
    const response = await request<Note>(requestParams);

    if (response.error) return { data: null as null, error: response.message };
    return { data: response.data, error: null as null };

  } catch (error) {
    return { data: null as null, error: "moveNoteToTrashApi : Um erro inesperado aconteceu" };
  }
}


export async function restoreFromTrashApi({ id }: { id: string }, socketId: string) {
  const body = {is_in_trash: false};

  const requestParams: requestOptions = {
    url: `${process.env.REACT_APP_BACKEND_API_ADDRESS}/notes/${id}`,
    method: 'PUT',
    body,
    headers: {
      'Content-Type': 'application/json',
      'x-socket-id': socketId,
    },
  };

  try {
    const response = await request<Note>(requestParams);

    if (response.error) {
      console.error("Erro ao restaurar nota do lixo:", response.error);
      return { data: null as null, error: response.message };
    }
    return { data: response.data, error: null as null };

  } catch (error) {
    console.error("restoreFromTrashApi: Um erro inesperado aconteceu", error);
    return { data: null as null, error: "restoreFromTrashApi: Um erro inesperado aconteceu" };
  }
}

export async function restoreFromArchiveApi({ id }: { id: string }, socketId: string) {
  const body = {is_in_archive: false};

  const requestParams: requestOptions = {
      url: `${process.env.REACT_APP_BACKEND_API_ADDRESS}/notes/${id}`,
      method: 'PUT',
      body,
      headers: {
          'Content-Type': 'application/json',
          'x-socket-id': socketId,
      },
  };

  try {
      const response = await request<Note>(requestParams);

      if (response.error) {
          console.error("Erro ao restaurar nota do arquivo:", response.error);
          return { data: null, error: response.message };
      }
      
      return { data: response.data, error: null };
  } catch (error) {
      console.error("restoreFromArchiveApi: Um erro inesperado aconteceu", error);
      if (error instanceof SyntaxError) {
          console.error("Resposta da API não é um JSON válido.");
      }
      return { data: null, error: "restoreFromArchiveApi: Um erro inesperado aconteceu" };
  }
}

export type {GetAllNotesResponse};




