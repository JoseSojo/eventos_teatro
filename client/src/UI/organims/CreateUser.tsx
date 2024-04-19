import { FormEvent, useState } from "react";
import { CreateUser as CreateUserAdmin } from "../../services/superadmin.service";
import Input from "../atoms/Input";
import Paragrap from "../atoms/Paragrap";
import Subtitle from "../atoms/Subtitle";
import Button from "../atoms/Button";

interface Props {
    close: () => void
}

export default function CreateUser({close}: Props) {

    const [username, setUsername] = useState(``);
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const [error, setError] = useState<string | null>(null);
    const [load, setLoad] = useState(false);

    const clsInput = `px-3 py-2 border rounded-md`;

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(username == ``) return setError(`input.username`);
        if(email == ``) return setError(`input.email`);
        if(password == ``) return setError(`input.password`);

        setLoad(true);

        const ExecuteRequets = async () => {
            const response = await CreateUserAdmin({username,email,password});
            if(response == "DANGER_EMAIL_IN_USE") {
                setLoad(false);
                return setError(`input.email`);
            } 
            if(response == "DANGER_USERNAME_IN_USE") {
                setLoad(false);
                return setError(`input.username`);
            } 
            close();
        }
        ExecuteRequets();
    }

    return (
        <section className="grid place-items-center h-full"> 
            <form onSubmit={HandleSubmit} className="bg-white rounded-md shadow-md p-4 w-full lg:w-1/2">
                <div className="mb-4">
                    <Subtitle customClass="text-center text-2xl font-light text-gray-800" text="Nuevo Usuario" />
                    <Paragrap customClass="text-center text-sm text-gray-500" text="crear usuarios que administren el sistemas" />
                </div>
                <label className="grid">
                    <span className="text-lg text-gray-700">Usuario</span>
                    <Input changeFn={setUsername} customClass={clsInput} type="text" value={username} placeholder="Steven03" />
                    {error == `input.username` && <Paragrap customClass="font-light text-sm text-red-600 mb-2" text="debes completar este campo" />}
                </label>

                <label className="grid">
                    <span className="text-lg text-gray-700">Correo</span>
                    <Input changeFn={setEmail} customClass={clsInput} type="email" value={email} placeholder="steven@example.com" />
                    {error == `input.email` && <Paragrap customClass="font-light text-sm text-red-600 mb-2" text="debes completar este campo" />}

                </label>

                <label className="grid">
                    <span className="text-lg text-gray-700">Contraseña</span>
                    <Input changeFn={setPassword} customClass={clsInput} type="password" value={password} placeholder="*********" />
                    {error == `input.password` && <Paragrap customClass="font-light text-sm text-red-600 mb-2" text="debes completar este campo" />}
                </label>

                <Button 
                    click={()=>{}} 
                    type="submit" 
                    text={load ? `creando` : `crear`}
                    customClass="bg-sky-400 hover:bg-sky-500 w-1/2 mt-3 py-2 font-light rounded-md" 
                    />
            </form>
        </section>
    )
}
