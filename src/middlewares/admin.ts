import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import { RequestExtended } from '../types/app.interface';
import { GetUserByTokenSession } from '../models/user.model';
import { CreateResponseError } from '../views/response.view';

export const IsAdmin = async (req:RequestExtended, res:Response, next:NextFunction) => {
    try {
        const token = req.header('token');
        if(!token) return res.status(400).json(CreateResponseError({ body:null, error:true, msg:`DANGER_NOT_TOKEN` }));
        const decoded = await GetUserByTokenSession({ ts: token.toString() });

        if(decoded == `DANGER_ACCESS_TOKEN_NOT_VALID`) return res.status(400).json(CreateResponseError({ body:null, error:true, msg:`DANGER_NOT_TOKEN` }));

        if(decoded.rol != `ADMIN`) return res.status(400).json(CreateResponseError({ body:null, error:true, msg:`DANGER_NOT_ADMIN` }));

        req.user = decoded;
        next()

    } catch (error) {
        return res
            .status(401)
            .json({ response:'No Authorizado, inicia sesión.', body:null })
    }
}
