import { FormEvent, useState } from "react"
import { GetUserStorage, UpdateUser } from "../../services/user.service";
import Input from "../atoms/Input";

interface Props {}

export default function UpdateData({}: Props) {
    const user = GetUserStorage();

    const [load, setLoad] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const [email, setEmail] = useState(`${user?.email}`);
    const [username, setUsername] = useState(`${user?.username}`);

    const clsInput = `p-3 rounded-md text-md border`;

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(email == ``) return setError(`input.email`);
        if(username == ``) return setError(`input.username`);

        setLoad(true);

        const ExecuteRequets = async () => {
            await UpdateUser({email, username,id:`${user?._id}`});
            setLoad(false);
        }
        ExecuteRequets();
    }

    return (
        <form onSubmit={HandleSubmit} className="grid gap-5 p-5">
            <label className="w-full grid">
                <span>Correo Electronico:</span>
                <Input changeFn={setEmail} customClass={clsInput} type="email" value={email} placeholder="correo@gmail.com" />
                { error == `input.email` && <p className="text-xs font-bold text-red-900">Debes completar este campo</p> }
            </label>

            <label className="w-full grid">
                <span>Usuario:</span>
                <Input changeFn={setUsername} customClass={clsInput} type="text" value={username} placeholder="demo123" />
                { error == `input.username` && <p className="text-xs font-bold text-red-900">Debes completar este campo</p> }
            </label>

            <button 
                type="submit" 
                className="cursor-pointer w-[50%] bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-md"
            >
                {
                    load
                    ? `enviando...`
                    : `enviar`
                }
            </button>

        </form>
    )
}
