import { JwtPayload } from 'jsonwebtoken';

/**
 * Interface CustomRequets
 * @author sojoj6573@gmail.com
 * Use in valid token of session
 */
export interface CustomRequets {
    token?:string|JwtPayload
}