import { CompleteEvent, DropEvent, ProcessEvent, ReviseEvent } from "../../services/event.service"
import Button from "../atoms/Button";

interface Props {
    id: string,
    status: `RECIBIDO` | `REVISION` | `PROCESADO` | `CULMINADO` | `CANCELADO`,
    close: () => void
}

export default function OptionsEvents({id, close}: Props) {


    return (
        <>
            <Button click={()=>{ DropEvent({id}); close(); }} customClass="duration-200 hover:bg-red-800 hover:text-white font-bold bg-red-400 text-red-800 border-2 border-red-800 py-2 px-5 rounded-md" type="button" text="Cancelar Evento" />
            <Button click={()=>{ ReviseEvent({id}); close(); }} customClass="duration-200 hover:bg-teal-800 hover:text-white font-bold bg-teal-400 text-teal-800 border-2 border-teal-800 py-2 px-5 rounded-md" type="button" text="Revisar Evento" />
            <Button click={()=>{ ProcessEvent({id}); close(); }} customClass="duration-200 hover:bg-sky-800 hover:text-white font-bold bg-sky-400 text-sky-800 border-2 border-sky-800 py-2 px-5 rounded-md" type="button" text="Procesar Evento" />
            <Button click={()=>{ CompleteEvent({id}); close(); }} customClass="duration-200 hover:bg-green-800 hover:text-white font-bold bg-green-400 text-green-800 border-2 border-green-800 py-2 px-5 rounded-md" type="button" text="Completar Evento" />
        </>
    )
}
