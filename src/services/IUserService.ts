export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

export interface IUserService {
    setUserRoles(uid: string, roles: { email: string; roles: { admin: boolean } }):Promise<void>;
    
    // getCitas(uid:string):Promise<
}