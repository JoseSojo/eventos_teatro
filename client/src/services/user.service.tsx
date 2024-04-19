import { BACKEND } from "../constants";
import { DataUser } from "../types/user.interface";

export const SetStorage = ({key, data}: {key: string, data:any}) => {
    window.localStorage.setItem(key, JSON.stringify(data));
}

export const RemoveStorage = ({key}: {key:string}) => {
    window.localStorage.removeItem(key);
}

export const GetUserStorage = () => {
    const BufferUser = window.localStorage.getItem(`user`);
    if(BufferUser) {
        const user = JSON.parse(BufferUser) as DataUser;
        user.create_at = user.create_at.split(`T`)[0];
        user.update_at = user.update_at.split(`T`)[0];
        user.photo = `${BACKEND}/public/${user.photo}`;
        return user;
    }
}

export const GetTokenStorage = (): string => {
    return `${window.localStorage.getItem(`token`)}`;
}

export const LogoutSession = async () => {
    const RequetsOptions = {
        method: `PUT`,
        headers: {
            "Content-Type":"application/json",
            token: GetTokenStorage()
        }
    }
    const URL = `${BACKEND}/auth/logout`;
    const result = await fetch(URL, RequetsOptions);
    if(!result.ok) return false;
    RemoveStorage({key:`token`});
    RemoveStorage({key:`user`});
    return true;
}

export const UpdateUser = async ({id, email, username}: {id:string,email:string,username:string}) => {
    const Data = {email, username};
    const RequetsOptions = {
        method: `PUT`,
        headers: {
            "Content-Type":"application/json",
            token: `${GetTokenStorage()}`
        },
        body: JSON.stringify(Data)
    }
    const URL = `${BACKEND}/user/update/data/${id}`;
    const result = await fetch(URL, RequetsOptions);

    if(!result.ok) {
        return await result.json();
    }
    const jsonPromise = await result.json();
    RemoveStorage({key:`user`});
    window.localStorage.setItem(`user`, JSON.stringify(jsonPromise.body));
    return true;
}

export const UpdateUserPassword = async ({id, password, oldPassword}: {id:string,password:string,oldPassword:string}) => {
    const Data = {password, oldPassword};
    const RequetsOptions = {
        method: `PUT`,
        headers: {
            "Content-Type":"application/json",
            token: `${GetTokenStorage()}`
        },
        body: JSON.stringify(Data)
    }
    const URL = `${BACKEND}/user/update/password/${id}`;
    const result = await fetch(URL, RequetsOptions);

    if(!result.ok) {
        return false;
    }
    const jsonPromise = await result.json();
    RemoveStorage({key:`user`});
    window.localStorage.setItem(`user`, JSON.stringify(jsonPromise.body));
    return true;
}

export const UpdateUserFile = async ({id, file}: {id:string, file:File}) => {
    const formData = new FormData();
    formData.append(`profile`, file);

    const RequetsOptions = {
        method: `PUT`,
        headers: { token: `${GetTokenStorage()}` },
        body: formData
    }
    const URL = `${BACKEND}/user/update/photo/${id}`;
    const result = await fetch(URL, RequetsOptions);

    if(!result.ok) {
        return await result.json();
    }

    const jsonPromise = await result.json() as { body: {result: any, filename:string} };
    const user = GetUserStorage();
    const newUser = {...user}
    newUser.photo = jsonPromise.body.filename;
    window.localStorage.removeItem(`user`);
    window.localStorage.setItem(`user`, JSON.stringify(newUser));
    return true;
}
