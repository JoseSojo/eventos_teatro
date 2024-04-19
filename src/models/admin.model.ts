import userSchema from "../schema/user.schema"

export const GetAllUsers = async () => {
    const users = await userSchema.find({ delete_at: undefined });
    return users;
}

export const DeleteViewUser = async ({id}:{id:string}) => {
    const result = await userSchema.findByIdAndUpdate(id, {
        "$set": {
            delete_at: Date.now()
        }
    });
    return result;
}

export const GetCounts = async () => {
    const users = await userSchema.find({ delete_at: undefined }).countDocuments();
    // const usersDelete = await userSchema.find({ delete_at: !undefined }).countDocuments();
    return {users_count:users}; 
}
