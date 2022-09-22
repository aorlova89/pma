export interface Board {
  id: string;
  title: string;
  description?: string;
}

export interface BoardPayload {
  title: string;
  description?: string;
}
