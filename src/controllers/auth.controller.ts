import { Request, Response } from "express";
import { Router } from "express";
import { RegisterModel, GenerateLogin } from "../models/auth.model";
import { CreateUser, LoginUser } from "../middlewares/user";
import { ComparePassword, CreateAccessToken, HashPassword } from "../models/base.model";
import { CreateLog } from "../utils/errors.util";
import { CloseSessionById, GetUserByEmail } from "../models/user.model";
import { RequestExtended } from "../types/app.interface";
import { Protected } from "../middlewares/jwt";
import { CreateResponseSuccess } from "../views/response.view";

const router = Router(); 

router.post(`/auth/register`, async (req:Request, res:Response) => {
    try {
        const ToModel:CreateUser = {
            email: req.body.email,
            password: await HashPassword(req.body.password),
            username: req.body.username,
            rol: "ADMIN"
        }
        const responseService = await RegisterModel(ToModel);

        CreateLog({ event:`SUCCESS_LOGIN`, status_code:`200` });
        return res
            .status(200)
            .json({ response:'AH_SUCCESS_LOGIN', body:responseService });

    } catch (error) {
        CreateLog({ event:`DANGER_LOGIN`, status_code:`400` });
        console.log(error);
        // handleErrorHttp(res, 500, 'AH_ERR_LOGIN', error);
    }
})

router.post(`/auth/login`, async (req:Request, res:Response) => {
    try {
        const ToModel:LoginUser = {
            email: req.body.email,
            password: req.body.password
        }
        const responseService = await GetUserByEmail({email:ToModel.email});
        
        if(responseService == `DANGER_EMAIL_NOT_VALID`) {
            // event
            return res
                .status(401)
                .json({ response:'DANGER_EMAIL', body:null });
        }

        if(!(await ComparePassword({ p:ToModel.password, hash:`${responseService.password}` }))) {
            // event
            return res
                .status(401)
                .json({ response:'DANGER_PASSWORD', body:null });
        }

        const token =  await CreateAccessToken({ data:{id:responseService.id}  });

        const result = await GenerateLogin({ id:responseService.id, token: token });
        return res
            .status(200)
            .json(CreateResponseSuccess({error:false, body:{user:result,token:token}, msg:`SUCCESS_LOGIN`}));
    } catch (error) {
        console.log(error);
        // handleErrorHttp(res, 500, 'AH_ERR_LOGIN', error);
    }
})

router.put(`/auth/logout`, Protected, async (req: RequestExtended, res:Response) => {
    try {
        const user = req.user;

        await CloseSessionById({ id: user.id });
        
        // event
        return res.status(200).json(CreateResponseSuccess({ error: true, body: null, msg:`SUCCESS_LOGOUT_SESSION` }));

    } catch (error) {
        // event
        console.log(error);
    }
})

export default router;
