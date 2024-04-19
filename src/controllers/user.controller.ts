import { Router, Response } from "express";
import { RequestExtended } from "../types/app.interface";
import { DeleteUserView, GetUserByEmail, GetUserByEmailUsername, GetUserById, GetUserByTokenSession, UpdateUser, UpdateUserPassword, UpdateUserPhoto } from "../models/user.model";
import { CreateResponseError, CreateResponseSuccess } from "../views/response.view";
import { CreateUser } from "../middlewares/user";
import { ComparePassword, HashPassword } from "../models/base.model";
import multerMiddleware from "../middlewares/manageFiles";
import { Protected } from "../middlewares/jwt";
import { NewFile } from "../models/file.model";
import { CreateFile } from "../types/file.interface";

const router = Router(); 

router.get(`/user`, Protected,async (req: RequestExtended, res: Response) => {
    const username = req.query.username as string | undefined;
    const email = req.query.email  as string | undefined;

    if(email) {
        const result = await GetUserByEmail({ email });
        if(result == `DANGER_EMAIL_NOT_VALID`) {
            return res.status(400).json(CreateResponseError({ body:null,error:true,msg:`DANGER_EMAIL_NOT_VALID` }));
        }
        return res.status(200).json({ok:true, body:result});
    }
    else if(username) {
        const result = await GetUserByEmailUsername({ username });
        if(result == `DANGER_USERNAME_NOT_VALID`) {
        return res.status(400).json(CreateResponseError({ body:null,error:true,msg:`DANGER_USERNAME_NOT_VALID` }));
        }

        return res.status(200).json({ok:true, body:result});
    }
    else {
        const token = req.headers.token as string | undefined;
        
        if(!token) {
            return res.status(400).json(CreateResponseError({ body:null,error:true,msg:`DANGER_TOKEN_SESSION_NOT_RECIVE` }));
        }

        const result = await GetUserByTokenSession({ ts: token });
         if(result == `DANGER_ACCESS_TOKEN_NOT_VALID`) {
            return res.status(400).json(CreateResponseError({ body:null,error:true,msg:`DANGER_TOKEN_SESSION_USER_NOT_SESSION` }));
         }

        return res.status(200).json({ok:true, body:result});
    }
})

router.put(`/user/update/data/:id`, Protected,async (req: RequestExtended, res:Response) => {
    const id = req.params.id as string;
    const data = {
        email: req.body.email,
        username: req.body.username,
    }
    const result = await UpdateUser({ id, data });
    return res.status(200).json(CreateResponseSuccess({ error:false, msg:`SUCCESS_UPDATE_DATA`, body: result }));
})

router.put(`/user/update/password/:id`, Protected,async (req: RequestExtended, res:Response) => {
    const id = req.params.id as string;
    const {oldPassword, password} = req.body;
    const user = await GetUserById({id});
    if(user == `DANGER_USER_ID`) return res.status(400).json(CreateResponseError({ error:true,body:null,msg:user }));

    // const compare = await ComparePassword({ password: `${oldPassword}`, passwordHash:`${user.password}` });
    // if(!compare) return res.status(401).json(CreateResponseError({ error:true,body:null,msg:`DANGER_COMPARE_PASSWORD` }));

    const newPassword = await HashPassword(`${password}`);
    const result = await UpdateUserPassword({ id, password:newPassword });
    return res.status(200).json(CreateResponseSuccess({ error:false, msg:`SUCCESS_UPDATE_PASSWORD`, body: result }));
})

router.put(`/user/update/photo/:id`, Protected, multerMiddleware.single(`profile`), async (req: RequestExtended, res: Response) => {
    const id = req.params.id as string;
    // const files = req.body;
    const fileData: CreateFile = {
        description: ``,
        filename: `${req.file?.filename}`,
        size: parseInt(`${req.file?.size}`),
        type: `${req.file?.mimetype}`,
        use_in: `profile`,
    } 
    const resultFile = await NewFile(fileData);
    const user = await GetUserById({id});
    if(user == `DANGER_USER_ID`) return res.status(400).json(CreateResponseError({ error:true,body:null,msg:`DANGER_USER_ID` }));

    if(!req.file) return res.status(400).json(CreateResponseError({ error:true,body:null,msg:`DANGER_NOT_FILE` }));
    const result = await UpdateUserPhoto({ id, fileName:req.file.filename, fileRef:`${resultFile._id}` });

    return res.status(200).json(CreateResponseSuccess({ error:false, msg:`SUCCESS_UPDATE_PHOTO`, body: {result, filename:req.file.filename} }));
})

router.delete(`/user/:id`, Protected, async (req: RequestExtended, res: Response) => {
    const id = req.query.id as string | undefined;

    if(!id) {
        return res.status(400).json(CreateResponseError({ error:true, msg:`DANGER_ID_NOT_RECIVE`, body:null }));
    }

    const result = await DeleteUserView({ id });
    return res.status(200).json(CreateResponseSuccess({ error:false, body:result, msg:`SUCCESS_DELETE_USER_VIEW` }));
})

export default router;
