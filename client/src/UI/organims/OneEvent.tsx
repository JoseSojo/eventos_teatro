import { ChangeEvent, FormEvent, useState } from "react";
import { EventData } from "../../types/event.interface";
import Paragrap from "../atoms/Paragrap";
import Subtitle from "../atoms/Subtitle";
import LabelAndInput from "../molecules/LabelAndInput";
import { UpdateEvent } from "../../services/event.service";
import Button from "../atoms/Button";
import OptionsEvents from "../molecules/OptionsEvents";

interface Props {
    event: EventData,
    close: () => void
}

interface TypeArea {
    room: boolean | Boolean,
    vip: boolean | Boolean,
    coffe_bar: boolean | Boolean,
}

interface Responsability {
    name: string,
    ci: string,
}

interface TypeTime {
    time: string,
    minute: string
}

interface Date {
    year: number | Number,
    month: string,
    day: number | Number,
}

export default function OneEvent({event, close}: Props) {

    const [email, setEmail] = useState(`${event.email}`);
    const [fullname, setFullname] = useState(`${event.fullname}`);
    const [ci, setCi] = useState(`${event.ci}`);
    const [address, setAddress] = useState(`${event.address}`);
    const [phone, setPhone] = useState(`${event.phone}`);

    const [event_type, setEventType] = useState(`${event.event_type}`);
    const [event_character, setEventCharacter] = useState(`${event.event_character}`);

    const [event_name, setEventName] = useState(`${event.event_name}`);
    const [event_intro, setEventIntro] = useState(false);

    const [event_quantity, setEventQuantity] = useState(event.event_quantity_people);
    const [event_cost, setEventCost] = useState(event.event_cost);

    const [event_area, setEventArea] = useState<TypeArea>({ coffe_bar:event.event_area.coffee_bar, room:event.event_area.room, vip:event.event_area.vip });
    const [event_responsible, setEventResponsible] = useState<Responsability>({ name:event.event_responsible.name, ci:event.event_responsible.ci });

    const [event_admin_code, setEventAdminCode] = useState(event.admin.code_reservation);
    const [event_admin_tariff, setEventAdminTariff] = useState(event.admin.code_reservation);
    const [event_admin_cancellation, setEventAdminCancellation] = useState(event.admin.code_reservation);


    const [error, setError] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [load, setLoad] = useState(false);

    const [event_assembly, setEventAssembly] = useState<Date>({ day:event.event_assembly.day,month:event.event_assembly.month,year:event.event_assembly.year });
    const [event_time_start, setTimeStart] = useState<TypeTime>({ minute:event.event_assembly.tiem_start.minute, time:event.event_assembly.tiem_start.time });
    const [event_time_end, setTimeEnd] = useState<TypeTime>({ minute:event.event_assembly.tiem_end.minute, time:event.event_assembly.tiem_end.time });

    const changeIntroEvent = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log(event_intro);
        const val = e.target.value;
        if(val == `PAGO`) return setEventIntro(true);
        else if(val == `GRATUITO`) return setEventIntro(false);
        return;
    }

    const changeAreaEvent = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.checked);
        const previw = {...event_area, [e.target.name]: e.target.checked}
        console.log(previw);
        setEventArea(previw);
    }

    const changeResponsabilityEvent = (e: ChangeEvent<HTMLInputElement>) => {
        const previw = {...event_responsible, [e.target.name]: e.target.value}
        setEventResponsible(previw);
    }

    const changeDate = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const previw = {...event_assembly, [e.target.name]: val};
        setEventAssembly(previw);
    }

    const changeTimeStart = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        console.log(val.length == 1, val);
        const previw = {...event_time_start, [e.target.name]: val.length == 1 ? `${val}` : `${val}`};
        setTimeStart(previw);
    }

    const changeTimeEnd = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const previw = {...event_time_end, [e.target.name]: val.length == 1 ? `${val}` : `${val}`};
        setTimeEnd(previw);
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(email == ``) return setError(`input.email`);
        if(ci == ``) return setError(`input.ci`);
        if(fullname == ``) return setError(`input.fullname`);
        if(phone == ``) return setError(`input.phone`);
        if(address == ``) return setError(`input.address`);

        if(event_type == ``) return setError(`input.event_type`);
        if(event_character == ``) return setError(`input.event_character`);

        if(event_name == ``) return setError(`input.event_name`);
        // if(event_intro == ``) return setError(`input.event_intro`);

        // if(event_quantity == < 0) return setError(`input.event_quantity`);
        if(event_cost == 0 && event_intro == true) return setErrorMessage(`Evento privado, debes agregar un precio`);

        if(event_area.room == false && event_area.coffe_bar == false && event_area.vip == false) return setErrorMessage(`Debes seleccionar almenos un area`);
        if(event_responsible.name == `` && event_responsible.ci == ``) return setErrorMessage(`Debes completar los datos del responsable`);

        // if(event_assembly.year < 2024) return setErrorMessage(`Debe ser igual o mayor al año actual`);
        /*if(
            event_assembly.month.toUpperCase() == `ENERO` || event_assembly.month.toUpperCase() == `FEBRERO` || event_assembly.month.toUpperCase() == `MARZO` || 
            event_assembly.month.toUpperCase() == `ABRIL` || event_assembly.month.toUpperCase() == `MAYO` || event_assembly.month.toUpperCase() == `JUNIO` || 
            event_assembly.month.toUpperCase() == `JULIO` || event_assembly.month.toUpperCase() == `AGOSTO` || event_assembly.month.toUpperCase() == `SEPTIEMBRE` || 
            event_assembly.month.toUpperCase() == `OCTUBRE` || event_assembly.month.toUpperCase() == `NOVIEMBRE` || event_assembly.month.toUpperCase() == `DICIEMBRE` 
        ) return setErrorMessage(`El mes no es correcto`);*/

        // console.log(parseInt(event_time_start.time) > 0 && parseInt(event_time_start.time) < 23, event_time_start.minute);
        if( parseInt(event_time_start.time) < 0 && parseInt(event_time_start.time) > 23 ) return setErrorMessage(`La hora de inicio no es valida`);
        if( parseInt(event_time_end.time) < 0 && parseInt(event_time_end.time) > 23 ) return setErrorMessage(`La hora de cierre ni es valida`);

        if( parseInt(event_time_start.minute) < 0 && parseInt(event_time_start.minute) > 59 ) return setErrorMessage(`El minuto de inicio ni es valido`);
        if( parseInt(event_time_end.minute) < 0 && parseInt(event_time_end.minute) > 59 ) return setErrorMessage(`El minuto de cierre ni es valida`);

        setLoad(true);

        const ExecuteRequets = async () => {
            const daveEvent = {
                data: {
                    address,ci,email,fullname,phone,
                event_area: {
                    coffee_bar: event_area.coffe_bar,
                    room: event_area.room,
                    vip: event_area.vip,
                },
                event_assembly: {
                    day: event_assembly.day,
                    month: event_assembly.month,
                    year: event_assembly.year,
                    tiem_end: event_time_start,
                    tiem_start: event_time_start,
                },
                event_character,
                event_cost,
                event_intro,
                event_name,
                event_quantity_people: event_quantity,
                event_responsible,
                event_type,
                },
                admin: {
                    code_reservation: event_admin_code,
                    tariff: event_admin_tariff, 
                    cancellation: event_admin_cancellation,
                    /*paymment?: {
                        start_50: {
                            time: string,
                            recibo: string,
                        },
                        end_50: {
                            time: string,
                            recibo: string,
                        }
                    }*/
                }
            }
            const response = await UpdateEvent(daveEvent, event._id);
            console.log(response);
            close();
        }
        ExecuteRequets();
    }

    return (
        <section>
            <div className="flex justify-between flex-col">
                <div className="flex justify-between">
                    <div>
                        <Subtitle customClass="text-2xl font-light text-gray-700" text={event.event_name} />
                        <Paragrap customClass="text-gray-500 text-md mt-1 font-bold" text={`${event.event_responsible.name} C.I: ${event.event_responsible.ci}`} />
                    </div>

                    <div className="flex flex-col text-gray-700">
                        <p className="grid grid-cols-[.5fr_1fr]"><b>fecha:</b> {event.admin.date_event}</p>
                        <p className="grid grid-cols-[.5fr_1fr]"><b>hora:</b> {event.admin.time?.start}</p>
                    </div>
                </div>

                <div className="">
                    <div className="grid py-3">
                        <span className="relative text-md font-bold text-gray-600">{ event_area.room && <div className="absolute -left-3 top-2 w-2 h-2 rounded-full bg-green-600"></div>} Sala Principal</span>
                        <span className="relative text-md font-bold text-gray-600">{ event_area.coffe_bar && <div className="absolute -left-3 top-2 w-2 h-2 rounded-full bg-green-600"></div>} Cafe/Bar</span>
                        <span className="relative text-md font-bold text-gray-600">{ event_area.vip && <div className="absolute -left-3 top-2 w-2 h-2 rounded-full bg-green-600"></div>} VIP</span>
                    </div>

                    <div className="grid py-3">
                        <Paragrap customClass="text-md font-light text-gray-600" text={`tipo de evento: ${event_type}`} />
                        <Paragrap customClass="text-md font-light text-gray-600" text={`caracter del evento: ${event_character}`} />
                        <Paragrap customClass="text-md font-light text-gray-600" text={`cantidad de personas: ${event_quantity}`} />
                    </div>

                </div>

                <section className="my-5">
                    <Subtitle customClass="text-2xl text-light" text="Administracion" />

                    <div className="w-full p-5 flex justify-center gap-3">
                        <OptionsEvents id={event._id} status={event.admin.status} close={close} />
                    </div>

                    <p className="relative">
                        <div className={`
                            ${
                                event.admin.status == `RECIBIDO` ? `bg-amber-400` :
                                event.admin.status == `REVISION` ? `bg-teal-400` :
                                event.admin.status == `PROCESADO` ? `bg-sky-400` :
                                event.admin.status == `CULMINADO` ? `bg-green-400` :
                                event.admin.status == `CANCELADO` ? `bg-red-400` :
                                `bg-black `
                            }
                            w-2 h-2 rounded-r-full absolute -left-3 top-2.5`}
                        >
                        </div>
                        estado: {event.admin.status}
                    </p>

                    <Paragrap customClass="text-md text-gray-600 text-light" text={`reservacion: ${event_admin_code}`} />
                    <Paragrap customClass="text-md text-gray-600 text-light" text={`tarifa: ${event_admin_tariff}`} />
                    <Paragrap customClass="text-md text-gray-600 text-light" text={`cancelacion: ${event_admin_cancellation}`} />

                </section>

                <section className="grid min-h-full p-5"> 
                    <form onSubmit={HandleSubmit} className="bg-white rounded-md shadow-md p-4 w-full">
                        <div className="mb-4">
                            <Subtitle customClass="text-center text-2xl font-light text-gray-800" text="Actualizar Evento" />
                            <Paragrap customClass="text-center text-sm text-gray-500" text="registra un evento" />
                            {errorMessage && <Paragrap customClass="font-light text-xs text-red-600 mb-2" text={errorMessage} />}

                        </div>

                        <LabelAndInput error={false} change={setEventAdminCode} label="Codigo de Reservacion" type="text" value={event_admin_code} />
                        <LabelAndInput error={false} change={setEventAdminTariff} label="Tarifa" type="text" value={event_admin_tariff} />
                        <LabelAndInput error={false} change={setEventAdminCancellation} label="Cancelacion" type="text" value={event_admin_cancellation} />

                        

                        <div className="grid lg:grid-cols-2 gap-5 lg:p-5">
                            <LabelAndInput label="Nombre Completo" change={setFullname} error={ error == `input.fullname` ? true : false }  type="string" value={fullname} />
                            <LabelAndInput label="Cedula de Identidad" change={setCi} error={ error == `input.ci` ? true : false }  type="string" value={ci} />
                            <LabelAndInput label="Direccion" change={setAddress} error={ error == `input.address` ? true : false }  type="string" value={address} />
                            <LabelAndInput label="Correo Electronico" change={setEmail} error={ error == `input.email` ? true : false }  type="email" value={email} />
                            <LabelAndInput label="Numero Telefonico" change={setPhone} error={ error == `input.phone` ? true : false }  type="string" value={phone} />
                            
                            <div></div>

                            <label className="grid">
                                <span className="text-md text-gray-700">Tipo de Evento</span>
                                {error == `input.event_type` && <Paragrap customClass="font-light text-xs text-red-600 mb-2" text="Debes completar este campo" />}
                                <select onChange={(e)=>setEventType(e.target.value)} className="bg-white outline-none border">
                                    <option selected value={`PUBLIC`}>selecciona una opcion</option>
                                    <option selected value={`PUBLIC`}>Publico</option>
                                    <option selected value={`PRIVATE`}>Privado</option>
                                </select>
                            </label>

                            <LabelAndInput label="Nombre del Evento" change={setEventName} error={ error == `input.event_name` ? true : false }  type="string" value={event_name} />


                            <label className="grid">
                                <span className="text-md text-gray-700">Entrada al Evento</span>
                                {error == `input.event_index` && <Paragrap customClass="font-light text-xs text-red-600 mb-2" text="Debes completar este campo" />}
                                <select onChange={changeIntroEvent} className="bg-white outline-none border">
                                    <option selected value={``}>selecciona una opcion</option>
                                    <option selected value={`PAGO`}>Pago</option>
                                    <option selected value={`GRATUITO`}>Gratuito</option>
                                </select>
                            </label>

                            <label className="grid">
                                <span className="text-md text-gray-700">Costo de Entrada</span>
                                <input 
                                    onChange={(e) => {
                                        if(event_intro == true) return;
                                        setEventCost(parseInt(e.target.value))
                                    }} 
                                    className={`px-3 py-2 border rounded-md outline-none`} 
                                    type="number" 
                                    value={`${event_cost}`} 
                                    placeholder="" 
                                    />

                                {error == `input.event_cost` && <Paragrap customClass="font-light text-sm text-red-600 mb-2" text="debes completar este campo" />}
                            </label>


                            <label className="grid">
                                <span className="text-md text-gray-700">Areas solicitadas</span>                 
                                <div className="grid grid-cols-3">
                                    <label className="flex items-center gap-4">
                                        Sala 
                                        <input 
                                            onChange={changeAreaEvent} 
                                            type="checkbox" 
                                            name="room"
                                            checked={Boolean(event.event_area.room)}
                                            />
                                    </label>
                                    <label className="flex items-center gap-4">
                                        Cafe/Bar 
                                        <input 
                                            onChange={changeAreaEvent} 
                                            type="checkbox" 
                                            name="coffe_bar"
                                            checked={Boolean(event.event_area.coffee_bar)}
                                            />
                                    </label>
                                    <label className="flex items-center gap-4">
                                        VIP 
                                        <input 
                                            onChange={changeAreaEvent} 
                                            type="checkbox" 
                                            name="vip"
                                            checked={Boolean(event.event_area.vip)}
                                            />
                                    </label>
                                </div>
                            </label>

                            <label className="grid">
                                <span className="text-md text-gray-700">Cantidad de Personas</span>
                                <input 
                                    onChange={(e) => {
                                        setEventQuantity(parseInt(e.target.value))
                                    }} 
                                    className={`px-3 py-2 border rounded-md outline-none`} 
                                    type="number" 
                                    value={`${event_quantity}`} 
                                    placeholder="" 
                                    />

                                {error == `input.event_quantity` && <Paragrap customClass="font-light text-sm text-red-600 mb-2" text="debes completar este campo" />}
                            </label>

                        
                            <label className="grid">
                                <span className="text-md text-gray-700">Nombre del Responsable</span>
                                <input 
                                    name="name"
                                    onChange={changeResponsabilityEvent} 
                                    className={`px-3 py-2 border rounded-md outline-none`} 
                                    type="string" 
                                    value={event_responsible.name} 
                                    placeholder="" 
                                    />
                                {error == `input.event_res_name` && <Paragrap customClass="font-light text-sm text-red-600 mb-2" text="debes completar este campo" />}
                            </label> 

                            <label className="grid">
                                <span className="text-md text-gray-700">Cedula del Responsable</span>
                                <input 
                                    name="ci"
                                    onChange={changeResponsabilityEvent} 
                                    className={`px-3 py-2 border rounded-md outline-none`} 
                                    type="string" 
                                    value={event_responsible.ci} 
                                    placeholder="" 
                                    />
                                {error == `input.event_res_name` && <Paragrap customClass="font-light text-sm text-red-600 mb-2" text="debes completar este campo" />}
                            </label>   


                            <label className="grid">
                                <span className="text-lg text-gray-700">Caracter del Evento</span>
                                <select onChange={(e)=>setEventCharacter(e.target.value)} className="bg-white outline-none border">
                                    <option selected value={``}>selecciona una opcion</option>
                                    <option selected value={`APOYO`}>Apoyo</option>
                                    <option selected value={`PRIVADO`}>Privado</option>
                                    <option selected value={`PUBLICO`}>Publico</option>
                                </select>
                            </label>

                            <div></div>

                            <div className="col-span-2 grid grid-cols-3 gap-5 place-items-center">
                                <label>
                                    <span className="text-md text-gray-700">Dia / Mes / Año</span>
                                    <div className="grid lg:grid-cols-3">
                                        <input value={parseInt(`${event_assembly.day}`)} onChange={changeDate} type="number" name="day" min={0} max={31} placeholder="Dia" className="border outline-none p-2 rounded-md" />
                                        <input value={`${event_assembly.month}`} onChange={changeDate} type="string" name="month" placeholder="Mes" className="border outline-none p-2 rounded-md" />
                                        <input value={parseInt(`${event_assembly.year}`)} onChange={changeDate} type="number" name="year" min={2024} placeholder="Año" className="border outline-none p-2 rounded-md" />
                                    </div>
                                </label>

                                <div>
                                    <span className="text-md text-gray-700">Inicio</span>
                                    <label className="grid grid-cols-2 place-items-center">
                                        <span>Hora</span>
                                        <input value={event_time_start.time} onChange={changeTimeStart} type="number" name="time" min={0} max={24} placeholder="Hora" className="border outline-none p-2 rounded-md" />
                                    </label>
                                    <label className="grid grid-cols-2 place-items-center">
                                        <span>Minuto</span>
                                        <input value={event_time_start.minute} onChange={changeTimeStart} type="number" name="minute" min={0} max={59} placeholder="Minuto" className="border outline-none p-2 rounded-md" />
                                    </label>
                                </div>

                                <div>
                                    <span className="text-md text-gray-700">Salida</span>
                                    <label className="grid grid-cols-2 place-items-center">
                                        <span>Hora</span>
                                        <input 
                                            onChange={changeTimeEnd} 
                                            type="number" 
                                            name="time" 
                                            min={0} 
                                            max={24} 
                                            placeholder="Hora" 
                                            className="border outline-none p-2 rounded-md" 
                                            value={event_time_end.time}
                                            />
                                    </label>
                                    <label className="grid grid-cols-2 place-items-center">
                                        <span>Minuto</span>
                                        <input 
                                            onChange={changeTimeEnd} 
                                            type="number" 
                                            name="minute" 
                                            min={0} 
                                            max={59} 
                                            placeholder="Minuto" 
                                            className="border outline-none p-2 rounded-md" 
                                            value={event_time_end.minute}
                                            />
                                    </label>
                                </div>
                            </div>
                        

                        </div>

                        <Button 
                            click={()=>{}} 
                            type="submit" 
                            text={load ? `actualizando` : `actualizar`}
                            customClass="bg-sky-400 hover:bg-sky-500 w-1/2 mt-3 py-2 font-light rounded-md" 
                            />
                    </form>
                </section>
            </div>
        </section>
    );
}
