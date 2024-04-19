import userSchema from '../schema/user.schema';
import { CreateUser } from '../middlewares/user';

export const RegisterModel = async (user: CreateUser) => {
    const result = new userSchema({
        email:user.email, 
        password:user.password, 
        username:user.username, 
        rol:user.rol,
        access_token: ``,
        session_status: false,
        token: ``
    });
    await result.save();
    return result;
}

export const GenerateLogin = async ({id,token}: {id:string,token:string}) => {
    
    const result = await userSchema.findByIdAndUpdate(
        id,
        {
            "$set": {
                access_token: token,
                session_status: true
            }
        }
    );
    return result;
}
