export interface UserPayload {
  name?: string,
  login: string,
  password: string
  token?: string;
}

export interface User {
  name?: string,
  login: string,
  password: string
  token: string;
}
