import { EventCreate } from "../types/event.interface";
import eventSchema from "../schema/event.schema";

export const TestDateEvent = async ({year, month, day}: {year:number, month:string, day:number}) => {
    console.log(year, month, day);
    const result = await eventSchema.find();
    // const response: any[] = [];

    const response = result.filter(e => e.event_assembly?.year == year && e.event_assembly?.month == month && e.event_assembly?.day == day);

    return response;
} 

export const CreateNewEvent = async ({data}: {data:EventCreate}) => {
    const before = {
        ...data, 
        admin: {
            date_event: `${data.event_assembly.day} de ${data.event_assembly.month} del ${data.event_assembly.year}`,
            code_reservation: `por definir`,
            time: {
                start: `${data.event_assembly.tiem_start.time}:${data.event_assembly.tiem_start.minute}`,
                end: `${data.event_assembly.tiem_end.time}:${data.event_assembly.tiem_end.minute}`
            },
            tariff: `por definir`,
            cancellation: `por definir`
        }
    }
    const event = new eventSchema(before);
    const result = await event.save();
    return result;
}

export const GetEvents = async () => {
    const result = await eventSchema.find({ delete_at:undefined });
    return result;
}

export const GetEventById = async (id: string) => {
    const result = await eventSchema.findById(id);
    return result;
}

export const UpdateEvent = async ({data, id, admin}: {data:EventCreate, id: string, admin:any}) => {
    console.log(data.event_assembly);
    const before = {
        ...data, 
        admin: {
            // paymment: { 
            //     end_50:{
            //         recibo: admin.paymment.start_50.recibo,
            //         time: admin.paymment.start_50.time                    
            //     }, start_50:{
            //         recibo: admin.paymment.end_50.recibo,
            //         time: admin.paymment.end_50.time
            //     } 
            // },
            status: admin.status,
            date_event: `${data.event_assembly.day} de ${data.event_assembly.month} del ${data.event_assembly.year}`,
            code_reservation: admin.code_reservation,
            time: {
                start: `${data.event_assembly.tiem_start.time}:${data.event_assembly.tiem_start.minute}`,
                end: `${data.event_assembly.tiem_end.time}:${data.event_assembly.tiem_end.minute}`
            },
            tariff: admin.tariff,
            cancellation: admin.cancellation,
        }
    }
    const result = await eventSchema.findByIdAndUpdate(id, { "$set":before });
    return result;
}

export const DropEvent = async ({id}: {id: string}) => {
    const event = await eventSchema.findById(id);
    if(!event) return false;
    if(!event.admin) return false;
    const admin = event.admin;
    admin.status = `CANCELADO`;
    const result = await eventSchema.findByIdAndUpdate(id, { "$set":{ admin }});
}

export const ProcessEvent = async ({id}: {id: string}) => {
    const event = await eventSchema.findById(id);
    if(!event) return false;
    if(!event.admin) return false;
    const admin = event.admin;
    admin.status = `PROCESADO`;
    const result = await eventSchema.findByIdAndUpdate(id, { "$set":{ admin }});
}

export const ReviceEvent = async ({id}: {id: string}) => {
    const event = await eventSchema.findById(id);
    if(!event) return false;
    if(!event.admin) return false;
    const admin = event.admin;
    admin.status = `REVISION`;
    const result = await eventSchema.findByIdAndUpdate(id, { "$set":{ admin }});
}

export const ReprogrammingEvent = async ({id}: {id: string}) => {
    const event = await eventSchema.findById(id);
    if(!event) return false;
    if(!event.admin) return false;
    const admin = event.admin;
    admin.status = `RECIBIDO`;
    const result = await eventSchema.findByIdAndUpdate(id, { "$set":{ admin }});
}

export const CompletedEvent = async ({id}: {id: string}) => {
    const event = await eventSchema.findById(id);
    if(!event) return false;
    if(!event.admin) return false;
    const admin = event.admin;
    admin.status = `CULMINADO`;
    const result = await eventSchema.findByIdAndUpdate(id, { "$set":{ admin }});
}

export const DeleteEvent = async ({id}: {id: string}) => {
    const result = await eventSchema.findByIdAndDelete(id);
    return result;
}
