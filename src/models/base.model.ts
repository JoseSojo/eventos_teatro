
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const TOKEN = process.env.KEY

export const HashPassword = async (password: string) => {
    return await bcrypt.hash(password, 11);
}

export const ComparePassword = async ({p, hash}: {p:string, hash:string}) => {
    return await bcrypt.compare(p, hash)
}

export const CreateAccessToken = async ({ data }: {data: any}) => {
    return jwt.sign(data, `${TOKEN}`);
} 

export const VerifyAccessToken = async ({ data }: {data: any}) => {
    return jwt.decode(data);
} 
