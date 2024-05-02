import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { EventData } from "../../types/event.interface"
import Paragrap from "../atoms/Paragrap";
import FilterByDate from "./filters/FilterByDate";
import FilterByName from "./filters/FilterByName";
import FilterByResponsable from "./filters/FilterByResponsable";
import FilterByType from "./filters/FilterByType";
import FilterByStatus from "./filters/FilterByStatus";

interface Date {
    year: number,
    month: string,
    day: number
}

interface Props {
    setEvents: Dispatch<SetStateAction<EventData[] | null>>,
    list: EventData[] | null,
    setList: Dispatch<SetStateAction<EventData[] | null>>,
    events: EventData[] | null
}

export default function FilterEvet({events, list, setList}: Props) {

    const [typeValue, setTypeValue] = useState(``);
    const [statusValue, setStatusValue] = useState(``);
    const [nameValue, setNameValue] = useState(``);
    const [responsableValue, setResponsableValue] = useState(``);
    const [dateValue, setDateValue] = useState<Date>({ year:0, month:``, day:0 });

    const [update, setUpdate] = useState(false);
    const [filter, setFilter] = useState<`ALL` | `TYPE` | `RESPONSABLE` | `FECHA` | `NOMBRE` | `STATUS`>(`ALL`);

    const UpdatePlus = () => setUpdate(!update);

    useEffect(() => {
        if(!events) return;
        if(filter == "ALL") return setList(events);

        if(filter == "TYPE") {
            if(typeValue == `PRIVATE` || typeValue == `PUBLIC`) {
                const ev = events.filter(e => e.event_type == typeValue);
                if(ev == undefined) return;
                return setList(ev);
            }
            return;
        }

        if(filter == "NOMBRE") {
            if(nameValue == ``) return;
            const ev = events.filter(e => {
                // console.log(e.event_name.substring(0, nameValue.length) === nameValue, e.event_name.substring(0, nameValue.length), nameValue);
                return e.event_name.substring(0, nameValue.length) === nameValue
            });
            if(ev == undefined) return;
            return setList(ev);
        }

        if(filter == "RESPONSABLE") {
            if(responsableValue == ``) return;
            const ev = events.filter(e => {
                return e.event_responsible.name.substring(0, responsableValue.length) === responsableValue
            });
            if(ev == undefined) return;
            return setList(ev);
        }

        if(filter == "FECHA") {
            const ev = events.filter(e => e.event_assembly.year == dateValue.year && e.event_assembly.day == dateValue.day && e.event_assembly.month == dateValue.month);
            if(ev == undefined) return;
            return setList(ev);
        }

        if(filter == "STATUS") {
            if(statusValue == ``) return;
            // console.log(statusValue);
            const ev = events.filter(e => e.admin.status == statusValue);
            if(ev == undefined) return;
            return setList(ev);
        }

    }, [update]);

    return (
        <section className="bg-white w-full p-3 shadow rounded-md grid grid-cols-3">
            <div>
                <Paragrap customClass="text-sm text-gray-600 font-bold" text={`Eventos Totales: ${events?.length}`} />
                <Paragrap customClass="text-sm text-gray-600 font-bold" text={`Eventos Mostrados: ${list?.length}`} />
            </div>

            <div>
                <select 
                    defaultValue={`ALL`} 
                    onChange={(e) => {
                        setFilter(e.target.value as `ALL` | `TYPE` | `RESPONSABLE` | `FECHA` | `NOMBRE` | `STATUS`);
                        setUpdate(!update);
                    }} 
                    className="w-[90%] bg-white border p-2 rounded-md"
                >
                    <option selected value={`ALL`}>Todos</option>
                    <option selected value={`TYPE`}>Tipo</option>
                    <option selected value={`RESPONSABLE`}>Responsable</option>
                    <option selected value={`FECHA`}>Fecha</option>
                    <option selected value={`NOMBRE`}>Nombre</option>
                    <option selected value={`STATUS`}>Estado</option>
                </select>
            </div>

            <div>
                {
                    filter == "FECHA" ? <FilterByDate set={UpdatePlus} update={setDateValue} updateVl={dateValue} />
                    : filter == "NOMBRE" ? <FilterByName set={UpdatePlus} update={setNameValue} updateVl={nameValue} />
                    : filter == "RESPONSABLE" ? <FilterByResponsable set={UpdatePlus} update={setResponsableValue} updateVl={responsableValue} />
                    : filter == "TYPE" ? <FilterByType set={UpdatePlus} update={setTypeValue} />
                    : filter == "STATUS" ? <FilterByStatus set={UpdatePlus} update={setStatusValue} />
                    : <div></div>
                }
            </div>
        </section>
    )
}
