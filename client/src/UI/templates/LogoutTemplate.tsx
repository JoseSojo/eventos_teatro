import { Redirect, useLocation } from "wouter";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { LogoutSession } from "../../services/user.service";

interface Props {}

export default function LogoutTemplate({}: Props) { 
    const auth = useAuth(); 
    const [location, setLocation] = useLocation()

    useEffect(() => {
        auth.setSession(false);
        const ExecuteRequets = async () => {
            await LogoutSession();
            auth.setSession(false);
            return setLocation(`/`);
            if(location) {}
        }
        ExecuteRequets();
    }, [])

    return (<Redirect href="/" />)
}
