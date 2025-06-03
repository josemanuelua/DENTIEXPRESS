import { Role } from "../services/IUserService";

export interface User{
    id:string;
    email:string;
    lastname:string;
    name:string;
    roles:Role;
}
