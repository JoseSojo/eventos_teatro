import mongoose, { Schema, Types } from 'mongoose';

const Event = new Schema({
    fullname: String,
    ci: String,
    address: String,
    phone: String,
    email: String,
    event_type: String, // PUBLIC | PRIVATE
    event_name: String,
    event_intro: Boolean, 
    event_cost: Number,
    event_area: {
        room: Boolean,
        coffee_bar: Boolean,
        vip: Boolean
    },
    event_quantity_people: Number,
    event_responsible: {
        name: String,
        ci: String
    },
    event_character: String, // APOYO | PRIVADO | PUBLICO
    event_assembly: {
        year: Number,
        month: String,
        day: Number,
        tiem_start: {
            time: Number,
            minute: Number,
        },
        tiem_end: {
            time: Number,
            minute: Number
        }
    },
    admin: {
        status: {
            type: String,
            default: `REVISION`
        }, // 
        date_event: String,
        code_reservation: {
            type: String,
            default: `por definir`
        },
        time: {
            start: String,
            end: String,
        },
        tariff: {
            type:String,
            default: `por definir`
        }, // ARRANCEL | APORTE | EXONERADO
        cancellation: String, // TOTAL | PARCIAL | EXONERADO
        paymment: {
            start_50: {
                time: String,
                recibo: String,
            },
            end_50: {
                time: String,
                recibo: String,
            }
        }
    },
    create_at: {
        type: Schema.Types.Date,
        default: Date.now()
    },
    update_at: {
        type: Schema.Types.Date,
        default: Date.now()
    },
    delete_at: Schema.Types.Date,
});

export default mongoose.model('Event', Event);
