import { IUserService, Role } from '../IUserService';
// import {getAuth} from 'firebase/auth';
// import { app } from '../../firebase/firebaseConfig';
import { FirebaseDatabaseService } from '../FirebaseDatabaseService';
import { Medico } from '../../models/Medico';
import { User } from '../../models/User';

interface Cita {
    id: string;
    uid: string;
    name: string;
    lastname: string;
    medico: string;
    tratamiento: string;
    fecha: string;
}
export class FirebaseUserService implements IUserService {
    private databaseService: FirebaseDatabaseService;
    constructor() {
        this.databaseService = new FirebaseDatabaseService();
    }


    async getUserRoles(user: any): Promise<Role[]> {
        // Para el usuario por defecto, se devuelve siempre el rol ADMIN.
        if (user.email === 'drizo@dlsi.ua.es') {
            return [Role.ADMIN];
        }
        // Delegamos la obtención de roles al servicio de base de datos.
        return this.databaseService.getUserRoles(user.uid);

    }

    async getUserData(userId: string): Promise<{ name: string; lastname: string } | null> {
        return this.databaseService.getUserData(userId); // Delegamos la obtención de datos al servicio de base de datos
    }
    
    async getCitasByUser(userId:string): Promise<Cita[] |null>{
        return this.databaseService.getCitasByUser(userId);
    }

    async getAllCitas():Promise<Cita[] | null>{
        return this.databaseService.getAllCitas();
    }
    async deleteCita(citaId:string): Promise<boolean>{
        return this.databaseService.deleteCita(citaId);
    }

    async modificarCita(citaId:string, nuevaCita:Cita): Promise<boolean>{
        return this.databaseService.modificarCita(citaId, nuevaCita);
    }

    async getAllMedicos():Promise<Medico[] | null>{
        return this.databaseService.getAllMedicos();
    }

    async deleteMedico(idMedico:string):Promise<boolean>{
        return this.databaseService.deleteMedico(idMedico);
    }

    async getAllUsuarios(): Promise<User[] | null>{
        return this.databaseService.getAllUsuarios();
    }

    async setUserRoles(uid: string, roles: { email: string; name: string; lastname:string; roles: { admin: boolean; }; }): Promise<void> {
        this.databaseService.setUserRoles(uid, roles);
    }
}