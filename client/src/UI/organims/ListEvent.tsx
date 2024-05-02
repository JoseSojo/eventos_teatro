import { useEffect, useState } from "react"
import Paragrap from "../atoms/Paragrap";
import { EventData } from "../../types/event.interface";
import { GetAllEvents } from "../../services/event.service";
import Subtitle from "../atoms/Subtitle";
import Button from "../atoms/Button";
import Image from "../atoms/Image";
import OneEvent from "./OneEvent";
import FilterEvet from "./FilterEvent";

interface Props {}

export default function ListEvent({}: Props) {

    const [events, setEvetns] = useState<EventData[] | null>(null);
    const [eventsList, setEventsList] = useState<EventData[] | null>(null);
    const [error, setError] = useState<string | null>();
    const [load, setLoad] = useState(true);
    const [update] = useState(false);
    const [show, setShow] = useState<EventData | null>(null);
    // const [deleteEvent, setDeleteEvent] = useState(false);

    useEffect(() => {
        const ExecuteRequets = async () => {
            setLoad(true);
            const response = await GetAllEvents();
            if(response == false) return setError(`list.global`);
            setEvetns(response);
            setEventsList(response);
            setError(null);
            return setLoad(false);
        }
        ExecuteRequets();
    }, [update])

    return (
        <div>
            { error != null && load == false && <Paragrap customClass="text-center mt-5 text-xl text-gray-700 font-light" text="usuarios no disponibles temporalmente..." /> }
            { error == null && load && <Paragrap customClass="text-center mt-5 text-xl text-gray-700 font-light" text="cargando usuarios..." /> }
            { 
                error == null && load == false && eventsList !== null &&  events !== null &&
                <>
                {
                    show
                    ? <OneEvent close={()=>setShow(null)} event={show} />
                    : <>{
                        events.length <= 0 
                        ? <Paragrap customClass="text-center mt-5 text-xl text-gray-700 font-light" text="no tienes eventos" />
                            
                        : <>
                            <FilterEvet setEvents={setEvetns} events={events} list={eventsList} setList={setEventsList} />
                            <div className="grid grid-cols-5 gap-3 mt-3">
                                {
                                    eventsList.map(key => (
                                        <div className={`
                                            grid rounded-md bg-white p-3 z-10 shadow relative
                                            border-t-8
                                            ${
                                                key.admin.status == `RECIBIDO` ? `border-gray-400` :
                                                    key.admin.status == `REVISION` ? `border-yellow-400` :
                                                    key.admin.status == `PROCESADO` ? `border-blue-400` :
                                                    key.admin.status == `CULMINADO` ? `border-green-400` :
                                                    key.admin.status == `CANCELADO` ? `border-red-400` :
                                                    `bg-black `
                                            }
                                            `}>
                                            
                                            <Subtitle 
                                                customClass="text-md text-gray-800" 
                                                text={`${key.admin.date_event ? key.admin.date_event : `por definir`}`}
                                                />

                                            <Paragrap 
                                                customClass="text-[15px] text-gray-500 mb-3" 
                                                text={`${key.event_name}`} 
                                                /> 
                                            <Paragrap 
                                                customClass="text-xs text-gray-500" 
                                                text={`inicio: ${key.admin.time ? key.admin.time.start : `por definir`}`} 
                                                />

                                            <div className="grid place-items-center">
                                                <Button click={()=>setShow(key)} customClass="m-auto bg-sky-400 hover:bg-sky-500 px-7 text-sm py-2 rounded-md flex gap-3" type="button" content={<><Image path="/peen.svg" alt="editar" customClass="w-4 h-4" /> Editar</>}  />
                                            </div>                                     
                                        </div>
                                        
                                    ))
                                }
                            </div>
                        </>
                    }</>
                }   
                </>
            }
        </div>
    )
}
