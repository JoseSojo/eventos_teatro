import { Router, Response } from "express";
import { RequestExtended } from "../types/app.interface";
import { CreateResponseError, CreateResponseSuccess } from "../views/response.view";
import { CreateUser } from "../middlewares/user";
import { RegisterModel } from "../models/auth.model";
import { IsAdmin } from "../middlewares/admin";
import { HashPassword } from "../models/base.model";
import { GetUserByEmail, GetUserByEmailUsername } from "../models/user.model";
import { DeleteViewUser, GetAllUsers, GetCounts } from "../models/admin.model";
import { Protected } from "../middlewares/jwt";

const router = Router(); 

router.post(`/admin/set/user`, IsAdmin, async (req: RequestExtended, res: Response) => {
    const {email, password, username} = req.body;
    const data: CreateUser = { email, password, rol:`ADMIN`, username };

    const vlEmail = await GetUserByEmail({ email });
    if(!vlEmail) return res.status(400).json(CreateResponseError({ body:null, error:true,msg:`DANGER_EMAIL_IN_USE` }));

    const vlUsername = await GetUserByEmailUsername({ username });
    if(!vlUsername) return res.status(400).json(CreateResponseError({ body:null, error:true,msg:`DANGER_USERNAME_IN_USE` }));


    data.password = await HashPassword(data.password);

    const result = await RegisterModel(data);

    return res.status(200).json(CreateResponseSuccess({ body:result, error:false,msg:`SUCCESS_CREATE_ADMIN` }))
});

router.get(`/admin/user`, IsAdmin, async (req: RequestExtended, res: Response) => {

    const result = await GetAllUsers();

    return res.status(200).json(CreateResponseSuccess({ body:result, error:false,msg:`SUCCESS_CREATE_ADMIN` }));
});

router.delete(`/admin/user/delete/:id`, IsAdmin, async (req: RequestExtended, res: Response) => {
    const id = req.params.id;
    const result = await DeleteViewUser({id});
    return res.status(200).json(CreateResponseSuccess({ body:result, error:false,msg:`SUCCESS_DELETE_ADMIN` }));
})

router.get(`/admin/count`, Protected, async (req: RequestExtended, res: Response) => {

    const result = await GetCounts();
    return res.status(200).json(CreateResponseSuccess({ body:result, error:false,msg:`SUCCESS_GET_COUNTS` }))
});

export default router
