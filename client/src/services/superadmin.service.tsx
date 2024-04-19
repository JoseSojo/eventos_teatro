import { BACKEND } from "../constants";
import { CountAll, DataUser, UserRegister } from "../types/user.interface";
import { GetTokenStorage } from "./user.service";

export const CreateUser = async (data: UserRegister) => {
    const body = data;
    const RequetsOptions = {
        method: `POST`,
        headers: {
            "Content-Type":"application/json",
            token: GetTokenStorage()
        },
        body: JSON.stringify(body)
    }
    
    const URL = `${BACKEND}/admin/set/user`;
    const result = await fetch(URL, RequetsOptions);
    const json = await result.json();
    if(!result.ok) {
        return json.msg as `DANGER_EMAIL_IN_USE` | `DANGER_USERNAME_IN_USE`;
    }

    return `SUCCESS_CREATE_ADMIN`;
}

export const GetAllUser = async () => {
    const RequetsOptions = {
        method: `GET`,
        headers: {
            token: GetTokenStorage()
        }
    }
    
    const URL = `${BACKEND}/admin/user`;
    const result = await fetch(URL, RequetsOptions);
    const json = await result.json() as { body:DataUser[], error:boolean,msg:string };
    
    if(!result.ok) return false;

    return json.body;
}

export const DeleteUserById = async ({id}:{id:string}) => {
    const RequetsOptions = {
        method: `DELETE`,
        headers: {
            token: GetTokenStorage()
        }
    }
    
    const URL = `${BACKEND}/admin/user/delete/${id}`;
    const result = await fetch(URL, RequetsOptions);
    const json = await result.json() as { body:null,error:boolean,msg:string };
    
    if(!result.ok) return false;
    return json.body;
}

export const GetCount = async () => {
    const RequetsOptions = {
        method: `GET`,
        headers: {
            token: GetTokenStorage()
        }
    }
    const URL = `${BACKEND}/admin/count`;
    const result = await fetch(URL, RequetsOptions);
    const json = await result.json() as { msg: string, body:CountAll };
    if(!result.ok) {
        return false;
    }
    return json.body;
}
