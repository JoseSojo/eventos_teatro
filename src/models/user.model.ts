import userSchema from '../schema/user.schema';

export const GetUserByEmail = async ({email}: {email: string}) => {

    const result = await userSchema.findOne({
        delete_at: undefined,
        email
    }) as any;
    if(!result) return `DANGER_EMAIL_NOT_VALID`;
    return result;
}

export const GetUserByEmailUsername = async ({username}: {username: string}) => {
    const result = await userSchema.findOne({
        delete_at: undefined,
        username
    }) as any;
    if(!result) return `DANGER_USERNAME_NOT_VALID`;
    return result;
}

export const GetUserByTokenSession = async ({ts}: {ts: string}) => {
    const result = await userSchema.findOne({
        delete_at: undefined,
        access_token: ts
    }) as any;
    if(!result) return `DANGER_ACCESS_TOKEN_NOT_VALID`;
    return result;
}

export const GetUserById = async ({id}: {id: string}) => {
    const result = await userSchema.findById(id);
    if(!result) return `DANGER_USER_ID`;
    return result;
}

export const CloseSessionById = async ({id}: {id: string}) => {
    const result = await userSchema.findByIdAndUpdate(id, {
        "$set": {
            access_token: ``,
            session_status: false
        }
    });
    return result;
}

export const UpdateUser = async ({id, data}: {id: string, data: {email:string,username:string}}) => {
    const result = await userSchema.findByIdAndUpdate(id, {
        "$set": {
            email: data.email,
            username: data.username
        }
    });
    return result;
}

export const UpdateUserPassword = async ({id, password}: {id:string, password: string}) => {
    const result = await userSchema.findByIdAndUpdate(id, {"$set": { password }});
    return result;
}

export const UpdateUserPhoto = async ({id, fileName, fileRef}: {id: string, fileName: string, fileRef: string}) => {
    const result = await userSchema.findByIdAndUpdate(id, {"$set": { photo:fileName,photo_id:fileRef }});
    return result;
}

export const DeleteUserView = async ({ id }: {id: string}) => {
    const result = await userSchema.findByIdAndUpdate(id, {
        "$set": {
            delete_at: Date.now()
        }
    });
    return result;
}
