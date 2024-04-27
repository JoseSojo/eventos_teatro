import { BACKEND } from "../constants";
import { EventCreate, EventData } from "../types/event.interface";
import { GetTokenStorage } from "./user.service";

export const ValidEvent = async (data: {year:number, month:string, day:number}) => {
    const RequetsOptions = {
        method: `POST`,
        headers: {
            "Content-Type":"application/json",
            token: GetTokenStorage()
        },
        body: JSON.stringify(data)
    }
    const URL = `${BACKEND}/event/test`;
    const result = await fetch(URL, RequetsOptions);
    return await result.json() as {error:boolean, msg:string, body: EventData[] | null}
}

export const CreateEvent = async (data: EventCreate) => {
    const RequetsOptions = {
        method: `POST`,
        headers: {
            "Content-Type":"application/json",
            token: GetTokenStorage()
        },
        body: JSON.stringify(data)
    }
    
    const URL = `${BACKEND}/event/new`;
    console.log(URL, data);
    const result = await fetch(URL, RequetsOptions);
    const json = await result.json();
    console.log(json);
    if(!result.ok) {
        return json.msg;
    }

    return json as {msg: string, body: any};
}

export const UpdateEvent = async (data: any, id: string) => {
    const RequetsOptions = {
        method: `PUT`,
        headers: {
            "Content-Type":"application/json",
            token: GetTokenStorage()
        },
        body: JSON.stringify(data)
    }
    
    const URL = `${BACKEND}/event/update/${id}`;
    console.log(URL, data);
    const result = await fetch(URL, RequetsOptions);
    const json = await result.json();
    console.log(json);
    if(!result.ok) {
        return json.msg as `DANGER_EMAIL_IN_USE` | `DANGER_USERNAME_IN_USE`;
    }

    return `SUCCESS_CREATE_ADMIN`;
}

export const GetAllEvents = async () => {
    const RequetsOptions = {
        method: `GET`,
        headers: {
            token: GetTokenStorage()
        }
    }
    
    const URL = `${BACKEND}/events`;
    const result = await fetch(URL, RequetsOptions);
    const json = await result.json() as { body:any[], error:boolean,msg:string };
    
    if(!result.ok) return false;

    return json.body;
}

export const GetEventById = async ({id}:{id:string}) => {
    const RequetsOptions = {
        method: `GET`,
        headers: {
            token: GetTokenStorage()
        }
    }
    
    const URL = `${BACKEND}/event/${id}`;
    const result = await fetch(URL, RequetsOptions);
    const json = await result.json() as { body: EventData, error:boolean,msg:string };
    
    if(!result.ok) return false;

    return json.body;
}

export const DropEvent = async ({id}:{id:string}) => {
    const RequetsOptions = {
        method: `PUT`,
        headers: {
            "Content-Type":"application/json",
            token: GetTokenStorage()
        }
    }
    
    const URL = `${BACKEND}/event/drop/${id}`;
    const result = await fetch(URL, RequetsOptions);
    const json = await result.json();
    if(!result.ok) {
        return json.msg as string;
    }

    return true;
}

export const ProcessEvent = async ({id}:{id:string}) => {
    const RequetsOptions = {
        method: `PUT`,
        headers: {
            "Content-Type":"application/json",
            token: GetTokenStorage()
        }
    }
    
    const URL = `${BACKEND}/event/process/${id}`;
    const result = await fetch(URL, RequetsOptions);
    const json = await result.json();
    if(!result.ok) {
        return json.msg as string;
    }

    return true;
}

export const CompleteEvent = async ({id}:{id:string}) => {
    const RequetsOptions = {
        method: `PUT`,
        headers: {
            "Content-Type":"application/json",
            token: GetTokenStorage()
        }
    }
    
    const URL = `${BACKEND}/event/complete/${id}`;
    const result = await fetch(URL, RequetsOptions);
    const json = await result.json();
    if(!result.ok) {
        return json.msg as string;
    }

    return true;
}

export const ReviseEvent = async ({id}:{id:string}) => {
    const RequetsOptions = {
        method: `PUT`,
        headers: {
            "Content-Type":"application/json",
            token: GetTokenStorage()
        }
    }
    
    const URL = `${BACKEND}/event/revise/${id}`;
    const result = await fetch(URL, RequetsOptions);
    const json = await result.json();
    if(!result.ok) {
        return json.msg as string;
    }

    return true;
}

export const ReprogrammingEvent = async ({id}:{id:string}) => {
    const RequetsOptions = {
        method: `PUT`,
        headers: {
            "Content-Type":"application/json",
            token: GetTokenStorage()
        }
    }
    
    const URL = `${BACKEND}/event/reprogramming/${id}`;
    const result = await fetch(URL, RequetsOptions);
    const json = await result.json();
    if(!result.ok) {
        return json.msg as string;
    }

    return true;
}
