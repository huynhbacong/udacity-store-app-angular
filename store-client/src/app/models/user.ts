export interface UserBase {
  username: string;
  password_digest: string;
}

export interface User extends UserBase{
    id: number;
    fisrtname?: string;
    lastname?: string;
}