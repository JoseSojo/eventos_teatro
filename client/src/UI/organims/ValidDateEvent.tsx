import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import Subtitle from "../atoms/Subtitle";
import Button from "../atoms/Button";
import { ValidEvent } from "../../services/event.service";
import { EventData } from "../../types/event.interface";
import Paragrap from "../atoms/Paragrap";

interface Props {
    valid: Dispatch<SetStateAction<boolean>>,
    validValue: boolean,
    customAssembly: Dispatch<SetStateAction<Date>>
}


interface Date {
    year: number | Number,
    month: string,
    day: number | Number,
}

export default function ValidDateEvent({ valid, validValue, customAssembly }: Props) {

    const [go, setGo] = useState(false);
    const [year, setYear] = useState<number>(0);
    const [month, setMonth] = useState<string>(``);
    const [day, setDay] = useState<number>(0);
    const [load, setLoad] = useState(false);
    const [events, setEvents] = useState<EventData[] | null>(null);
    const [errors, setErrors] = useState<string | null>(null);

    useEffect(() => {
        const def: Date = { year, month, day };
        customAssembly(def);
    }, [year, month, day])


    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const ExecuteRequets = async () => {
            const data = {year, month, day};
            setLoad(true);

            const result = await ValidEvent(data);
            console.log(year, month, day);

            setLoad(false);
            if(result.body == null || result.body.length == 0) {
                setGo(true);
                setEvents(null);
                return setErrors(`No se optuvieron eventos`);
            }
            setGo(false);
            setErrors(null);
            valid(false);
            if(false) validValue;
            return setEvents(result.body);
        }
        ExecuteRequets();
    }



    return (
        <div className="bg-white mb-4 p-5 rounded-[20px]">
            <form onSubmit={HandleSubmit}>
                <Subtitle customClass="text-2xl font-light text-gray-700" text="Validar fecha" />

                <div className="mt-3 grid grid-cols-3">
                    <label>
                        <span className="text-lg text-gray-800">Año:</span>
                        <input 
                            required 
                            className="border mx-2 px-2 py-1 outline-none rounded-md" 
                            onChange={(e)=> {
                                return setYear(parseInt(e.target.value))
                            }} 
                            type="number" 
                            value={year} 
                            name="year"
                             />
                    </label>
                    <label>
                        <span className="text-lg text-gray-800">Mes:</span>
                        <input 
                            required 
                            className="border mx-2 px-2 py-1 outline-none rounded-md" 
                            onChange={(e)=> {
                                return setMonth(e.target.value)
                            }}
                            type="text" 
                            value={month} 
                            name="month"
                             />
                    </label>
                    <label>
                        <span className="text-lg text-gray-800">Dia:</span>
                        <input 
                            required 
                            className="border mx-2 px-2 py-1 outline-none rounded-md" 
                            onChange={(e)=> {
                                return setDay(parseInt(e.target.value))
                            }} 
                            type="number" 
                            value={day} 
                            name="day"
                             />
                    </label>
                </div>
                <Button click={()=>{}} customClass="px-7 py-2 rounded-md bg-sky-400 hover:bg-sky-600 mt-3 text-white font-bold" type="submit" text="validar" />
            
            </form>
            <section>
                { load && <Paragrap customClass="text-md text-gray-700 font-bold" text={`cargando..`} /> }
                { events == null && <Paragrap customClass="" text="" /> }
                { errors !== null && <Paragrap customClass="text-red-500 p-3 mt-2" text={errors} /> }
                <div className="grid md-grid-cols-2 lg:grid-cols-3 p-3 gap-2">
                    {
                        errors == null && events && events.map(ev => (
                            <div className="shadow-md p-3 rounded-md">
                                <p className="text-md text-gray-700" >
                                    Institucion ocupada el: <span className="font-bold mx-3">{ev.admin.date_event}</span>
                                </p>
                                <p className="text-md text-gray-700" >
                                    Desde: <span className="font-bold mx-3">{ev.admin.time?.start}</span>
                                </p>
                                <p className="text-md text-gray-700" >
                                    Hasta: <span className="font-bold mx-3">{ev.admin.time?.end}</span>
                                </p>
                            </div>
                        ))
                    }
                </div>
            </section>
            <section>
                {
                    go && 
                    <>
                        <Button click={() => valid(true)} customClass="bg-sky-400 hover:bg-sky-500 rounded-md w-[auto] px-8 py-3 font-bold text-white" type="button" text={`Registrar evento el: ${day} de ${month} del ${year}`} />
                    </>
                }
            </section>
        </div>
    )
}
