import { useEffect, useState } from "react";
import { GetEventById } from "../../services/event.service";
import { EventData } from "../../types/event.interface";
import Paragrap from "../atoms/Paragrap";

interface Props {
    params: any
}

export default function ViewEvent({params}: Props) {

    const [event, setEvent] = useState<EventData | null>()
    const [idEvent, setIdEvent] = useState(`${params.id}`);
    const [load, setLoad] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>();
    // console.log(params);

    useEffect(() => {
        const ExecuteRequets = async () => {
            const event = await GetEventById({id: idEvent});
            if(event == false) return setErrorMessage(`no se obtuvo el eventom, intente mas tarde.`);

            console.log(event);
            return setEvent(event);
        }
        ExecuteRequets();
    }, []);

    return (
        <>
            { errorMessage && <Paragrap customClass="text-lg font-bold text-gray-700" text={errorMessage} /> }
            { event == null && load == true && <Paragrap customClass="text-lg font-bold text-gray-700" text="Cargando Evento..." /> }
            { event && <Paragrap customClass="text-lg" text={event.admin.status} /> }
        </>
    )

}
