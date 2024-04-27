import { FormEvent, useState } from "react";
import { CreateUser as CreateUserAdmin } from "../../services/superadmin.service";
import Input from "../atoms/Input";
import Paragrap from "../atoms/Paragrap";
import Subtitle from "../atoms/Subtitle";
import Button from "../atoms/Button";
import LabelAndInput from "../molecules/LabelAndInput";

interface Props {
    close: () => void
}

export default function CreateEvent({close}: Props) {

    const [email, setEmail] = useState(``);
    const [fullname, setFullname] = useState(``);
    const [ci, setCi] = useState(``);
    const [address, setAddress] = useState(``);
    const [phone, setPhone] = useState(``);
    const [event_type, setEventType] = useState(``);
    const [event_name, setEventName] = useState(``);
    const [event_intro, setEventIntro] = useState(``);


    const [error, setError] = useState<string | null>(null);
    const [load, setLoad] = useState(false);

    const clsInput = `px-3 py-2 border rounded-md`;

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(email == ``) return setError(`input.email`);

        setLoad(true);

        const ExecuteRequets = async () => {
            
            close();
        }
        ExecuteRequets();
    }

    return (
        <section className="grid place-items-center h-full"> 
            <form onSubmit={HandleSubmit} className="bg-white rounded-md shadow-md p-4 w-full lg:w-1/2">
                <div className="mb-4">
                    <Subtitle customClass="text-center text-2xl font-light text-gray-800" text="Nuevo Evento" />
                    <Paragrap customClass="text-center text-sm text-gray-500" text="crear usuarios que administren el sistemas" />
                </div>

                <LabelAndInput label="Correo" change={setEmail} error={ error == `input.email` ? true : false }  type="email" value={email} />

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
