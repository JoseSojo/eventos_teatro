
export interface EventCreate {
    fullname: string,
    ci: string,
    address: string,
    phone: string,
    email: string,
    event_type: string, // PUBLIC | PRIVATE
    event_name: string,
    event_intro: Boolean,  
    event_cost: Number,
    event_area: {
        room: Boolean,
        coffee_bar: Boolean,
        vip: Boolean
    },
    event_quantity_people: Number,
    event_responsible: {
        name: string,
        ci: string
    },
    event_character: string, // APOYO | PRIVADO | PUBLICO
    event_assembly: {
        year: Number,
        month: string,
        day: Number,
        tiem_start: {
            time: string,
            minute: string,
        },
        tiem_end: {
            time: string,
            minute: string
        }
    }
}

export interface EventData extends EventCreate {
    _id: string,
    admin: {
        status: `RECIBIDO` | `REVISION` | `PROCESADO` | `CULMINADO` | `CANCELADO`,
        date_event: string,
        code_reservation: string,
        time?: {
            start: string,
            end: string,
        },
        tariff?: string, // ARRANCEL | APORTE | EXONERADO
        cancellation?: string, // TOTAL | PARCIAL | EXONERADO
        paymment?: {
            start_50: {
                time: string,
                recibo: string,
            },
            end_50: {
                time: string,
                recibo: string,
            }
        }
    },
    create_at: string,
    update_at: string,
    delete_at: string,
}
