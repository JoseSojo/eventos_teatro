import { Request } from "express";

/**
 * Interface RequestExtended
 * @author sojoj6573@gmail.com
 * use in routes protected for use req.user
 */
export interface RequestExtended extends Request {
    user?:any
}