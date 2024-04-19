import { FormEvent, useState } from "react";
import Title from "../atoms/Title";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { Login } from "../../services/auth.service";
import { useLocation } from "wouter";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

interface Props {}

export default function LoginTemplate({}: Props) { 
    const auth = useAuth(); 
    const noti = useNotification();
    const [location, setLocation] = useLocation();
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(email == ``) return setError(`input.email`);
        if(password == ``) return setError(`input.password`);
        setLoad(true);

        const ExecuteRequets = async () => {
            const data = {email,password};
            const response = await Login(data);
            if(response == true) {
                auth.setSession(true);
                setLocation(`/dashboard`);
                return setLoad(false);
                if(location) {}
            }
            
            if(response.response == `DANGER_EMAIL`) noti?.setNoti(`Correo invalido`);
            if(response.response == `DANGER_PASSWORD`) noti?.setNoti(`Contrasena invalida`);
            return setLoad(false);   
        }
        ExecuteRequets();

    }

    return (
        <div className="bg-gray-500 w-full min-h-screen grid place-items-center">
            <div className="w-[90vw] h-[60vh] lg:w-[40vw] lg:max-h-[60vh] bg-white p-5 rounded-md">
                <Title customClass="text-3xl font-bold text-gray-600 text-center" text="Inicia Sesion" />

                <form onSubmit={HandleSubmit}>
                    <label className="grid mt-5">
                        <span className="text-center text-lg text-gray-700">Correo Electronico</span>
                        { error == `input.email` && <p className="text-xs font-bold text-red-500 text-center">debes completar este campo</p> }
                        <Input 
                            changeFn={setEmail} 
                            customClass="p-3 border text-md rounded-md outline-none w-full" 
                            type="email" 
                            value={email} 
                            placeholder="example@gmail.com" 
                            />
                    </label>

                    <label className="grid mt-5">
                        <span className="text-center text-lg text-gray-700">Contraseña</span>
                        { error == `input.password` && <p className="text-xs font-bold text-red-500 text-center">debes completar este campo</p> }
                        <Input 
                            changeFn={setPassword} 
                            customClass="p-3 border text-md rounded-md outline-none w-full" 
                            type="password" 
                            value={password} 
                            placeholder="" 
                            />
                    </label>   
                    <Button 
                        click={() => {}} 
                        customClass="w-44 mx-auto py-2 font-bold text-center bg-sky-400 hover:bg-sky-300 mt-3 rounded-md" 
                        text={load ? "enviando..." : "enviar"}
                        type="submit" 
                        />               
                </form>

            </div>
        </div>
    )
}
