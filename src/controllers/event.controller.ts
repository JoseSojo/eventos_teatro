import { Router } from "express";
import { Protected } from "../middlewares/jwt";
import { RequestExtended } from "../types/app.interface";
import { Response } from "express";
import { EventAdmin, EventCreate } from "../types/event.interface";
import { CreateNewEvent, DeleteEvent, DropEvent, GetEventById, GetEvents, ProcessEvent, ReprogrammingEvent, ReviceEvent, TestDateEvent, UpdateEvent } from "../models/event.model";
import { CreateResponseSuccess } from "../views/response.view";

const router = Router(); 

router.post(`/event/test`, async (req:RequestExtended, res:Response) => {
    const {year, month, day} = req.body as {year:number, month:string, day:number};
    const result = await TestDateEvent({year, month, day});
    return res.status(200).json(CreateResponseSuccess({error:false,body:result,msg:`SUCCESS_GET_EVENT`}));
})

router.post(`/event/new`, async (req: RequestExtended, res: Response) => {
    const {
        fullname, ci, address, phone, email, 
        event_type, event_name, event_intro, event_cost, event_area,
        event_quantity_people, event_responsible, event_character,
        event_assembly
    } = req.body;

    const NewEvent: EventCreate = { 
        fullname, ci, address, phone, email, event_type, event_name, event_intro, event_cost: event_intro ? event_cost : 0,
        event_area: {
            room: event_area.room,
            coffee_bar: event_area.coffee_bar,
            vip: event_area.vip
        },
        event_quantity_people,
        event_responsible: {
            name: event_responsible.name,
            ci: event_responsible.ci
        },
        event_character, // APOYO | PRIVADO | PUBLICO
        event_assembly: {
            year: event_assembly.year,
            month: event_assembly.month,
            day: event_assembly.day,
            tiem_start: {
                time: event_assembly.tiem_start.time,
                minute: event_assembly.tiem_start.minute,
            },
            tiem_end: {
                time: event_assembly.tiem_end.time,
                minute: event_assembly.tiem_end.minute
            }
        }
    }

    const result = await CreateNewEvent({ data: NewEvent });
    
    return res.status(200).json(CreateResponseSuccess({ error:false, body: result, msg: `SUCCESS_CREATE_EVENT` }));
})

router.get(`/events`, Protected, async (req:RequestExtended, res: Response) => {
    const result = await GetEvents();
    return res.status(200).json(CreateResponseSuccess({ error:false, body: result, msg: `SUCCESS_GET_EVENTS` }));
})

router.get(`/event/:id`, async (req:RequestExtended, res: Response) => {
    const result = await GetEventById(req.params.id);
    return res.status(200).json(CreateResponseSuccess({ error:false, body: result, msg: `SUCCESS_GET_EVENT` }));
})

router.put(`/event/update/:id`, Protected, async (req: RequestExtended, res: Response) => {
    const {data, admin} = req.body as { data:EventCreate, admin:EventAdmin };
    console.log(data);
    const evtAdmin /*: EventAdmin*/ = {
        status: admin.status,
        date_event: ``,
        code_reservation: admin.code_reservation,
        time: {
            start: ``,
            end: ``,
        },
        tariff: admin.tariff, // ARRANCEL | APORTE | EXONERADO
        cancellation: admin.cancellation, // TOTAL | PARCIAL | EXONERADO
        /*paymment: {
            start_50: admin.paymment.start_50,
            end_50: admin.paymment.end_50
        }*/
    }
    const result = await UpdateEvent({ admin:admin, data, id:req.params.id});
    return res.status(200).json(CreateResponseSuccess({ error:false, body: result, msg:`SUCCESS_UPDATE_EVENT` }));
})

// cancelar evento
router.put(`/event/drop/:id`, Protected, async (req:RequestExtended, res: Response) => {
    const id = req.params.id;
    const result = await DropEvent({id});
    return res.status(200).json(CreateResponseSuccess({ error:false,msg:`SUCCESS_DROP_EVENT`,body:result }));
})

// procesar evento
router.put(`/event/process/:id`, Protected, async (req:RequestExtended, res: Response) => {
    const id = req.params.id;
    const result = await ProcessEvent({id});
    return res.status(200).json(CreateResponseSuccess({ error:false,msg:`SUCCESS_DROP_EVENT`,body:result }));
})

// revisar evento
router.put(`/event/revise/:id`, Protected, async (req:RequestExtended, res: Response) => {
    const id = req.params.id;
    const result = await ReviceEvent({id});
    return res.status(200).json(CreateResponseSuccess({ error:false,msg:`SUCCESS_DROP_EVENT`,body:result }));
})

// reprogramar evento
router.put(`/event/reprogramming/:id`, Protected, async (req:RequestExtended, res: Response) => {
    const id = req.params.id;
    const result = await ReprogrammingEvent({id});
    return res.status(200).json(CreateResponseSuccess({ error:false,msg:`SUCCESS_DROP_EVENT`,body:result }));
})

router.delete(`/event/delete/:id`, Protected, async (req: RequestExtended, res: Response) => {
    const id = req.params.id;

    const result = await DeleteEvent({id});

    return res.status(200).json(CreateResponseSuccess({ error:false, body:result,msg:`SUCCESS_DELETE_EVENT` }));

})

export default router;
