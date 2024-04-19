import { FormEvent, useState } from "react";
import Input from "../atoms/Input";
import { GetUserStorage, UpdateUserPassword } from "../../services/user.service";

interface Props {}

export default function UpdatePassword({}: Props) {
    const user = GetUserStorage();

    const [load, setLoad] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const [password, setPassword] = useState(``);
    const [oldPassword, setOldPassword] = useState(``);

    const clsInput = `p-3 rounded-md text-md border`;

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(oldPassword == ``) return setError(`input.oldPassword`);
        if(password == ``) return setError(`input.password`);

        setLoad(true);

        const ExecuteRequets = async () => {
            const response = await UpdateUserPassword({oldPassword, password,id:`${user?._id}`});
            if(response) {
                setError(null);
                return setLoad(false);
            }
            setError(`from.global`);
            setPassword(``);
            setOldPassword(``);
            return setLoad(false);
        }
        ExecuteRequets();
    }

    return (
        <form onSubmit={HandleSubmit} className="grid gap-5 p-5">
            { error == `from.global` && <p className="text-xs font-bold text-red-900">Error temporal</p> }
            <label className="w-full grid">
                <span>Contraseña actual:</span>
                <Input changeFn={setOldPassword} customClass={clsInput} type="password" value={oldPassword} placeholder="" />
                { error == `input.oldPassword` && <p className="text-xs font-bold text-red-900">Debes completar este campo</p> }
            </label>

            <label className="w-full grid">
                <span>Nueva contraseña:</span>
                <Input changeFn={setPassword} customClass={clsInput} type="password" value={password} placeholder="" />
                { error == `input.password` && <p className="text-xs font-bold text-red-900">Debes completar este campo</p> }
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
