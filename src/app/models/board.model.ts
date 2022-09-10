import {Column} from "./column.model";

export interface Board {
  id: string;
  title: string;
  description?: string;
  // tasks?: Column[];
}

export interface BoardPayload {
  title: string;
  description?: string;
}
