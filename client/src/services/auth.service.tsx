import { BACKEND } from "../constants";
import { UserLogin } from "../types/user.interface";

export const Login = async (data: UserLogin) => {
    const ContentRequets = {
        email: data.email,
        password: data.password
    };
    const RequetsOptions = {
        method: `POST`,
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(ContentRequets)
    };
    const URL = `${BACKEND}/auth/login`;
    try {
        const result = await fetch(URL, RequetsOptions);
        const jsonPromise = result.json();
        console.log(jsonPromise);
        if(!result.ok) {
            const error = await jsonPromise;
            console.log(error);
            return error;
        }
        const response = await jsonPromise;
        // SetStorage({key:`user`, data:response.body.user});
        // SetStorage({key:`token`, data:response.body.token});
        window.localStorage.setItem(`user`, JSON.stringify(response.body.user));
        window.localStorage.setItem(`token`, response.body.token);
        // console.log(response);
        return true;
    } catch (error) {
        return false;        
    }
};
