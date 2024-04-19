import { ChangeEvent, FormEvent, useState } from "react";
import { GetUserStorage, UpdateUserFile } from "../../services/user.service";
import Paragrap from "../atoms/Paragrap";

interface Props {}

export default function UpdateAvatar({}: Props) {
    const user = GetUserStorage();
    const [file, setFile] = useState<null | File>(null);
    const [error, setError] = useState<null | string>(null);
    const [load, setLoad] = useState(false);

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!file) return setError(`input.file`);
        setLoad(true);

        const ExecuteRequets = async () => {
            const response = await UpdateUserFile({ id:`${user?._id}`,file });
            console.log(response);
        }
        ExecuteRequets()
    }

    const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) setFile(e.target.files[0]);
    }

    return (
        <div>
            <form onSubmit={HandleSubmit} className="p-5">
            <div className="grid w-full max-w-xs items-center gap-1.5">
                <label 
                    className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Foto de Perfil
                </label>
                <input onChange={HandleChange} type="file" className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium" />
                { error == `input.file` && <Paragrap customClass="text-sm text-red-700" text="debes agregar una imagen" /> }
            </div>
                <button 
                    type="submit" 
                    className="cursor-pointer w-[50%] mt-5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-md"
                >
                    {
                        load
                        ? `enviando...`
                        : `enviar`
                    }
                </button>
            </form>
        </div>
    )
}
