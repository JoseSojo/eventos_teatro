import { Response  } from 'express';

const handleHTTPError = (code:string, res:Response, error?:any) => {
    if(error) console.log(error);
    return res 
        .status(500)
        .json({ response:code, error, body:null });
}

const handleHTTPErrorStatus = (code:string, res:Response, error?:any) => {
    if(error) console.log(error);
    return res 
        .status(500)
        .json({ response:code, error, body:null });
}

export { handleHTTPError, handleHTTPErrorStatus };
