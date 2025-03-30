export interface ResponseType {
  user: UserType;
  token: string;
}

export interface UserType {
  id: number;
  email: string;
  password: string;
  user: string;
}
