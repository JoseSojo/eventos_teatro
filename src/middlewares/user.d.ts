import { DataFile } from "../types/file.interface";

export interface DataUser {
    id: string,
    email: string,
    username: string,
    password: string,
    create_at: string,
    update_at: string,
    delete_at?: string,
    session_status?: string,
    session_at?: string,
    token?: string,
    access_token?:string,
    rol: ROL_BASE,
    photo_id: DataFile
}

export type ROL_BASE = `DEV` | `ADMIN` | `USER` | `ROOT`;

export interface CreateUser {
    email: string,
    username: string,
    password: string,
    rol: ROL_BASE
} 

export interface LoginUser {
    email: string,
    password: string
} 
