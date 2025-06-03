import { Role } from "./IAuthService";

export interface IUserDatabaseService {
    getUserRoles(uid: string): Promise<Role[]>;
    setUserRoles(uid: string, roles: { email: string; roles: { admin: boolean } }):Promise<void>;
}