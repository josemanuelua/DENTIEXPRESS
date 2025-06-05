import { getDatabase, ref, get, set, remove } from 'firebase/database';
import { app } from '../firebase/firebaseConfig';
import { Role } from './IAuthService';
import { IUserDatabaseService } from './IUserDatabaseService';
import { Cita } from '../models/Cita';
import { Medico } from '../models/Medico';
import { User } from '../models/User';
// interface Cita {
//     id: string;
//     uid: string;
//     name: string;
//     lastname: string;
//     medico: string;
//     tratamiento: string;
//     fecha: string;
// }
export class FirebaseDatabaseService implements IUserDatabaseService {
    async getUserRoles(uid: string): Promise<Role[]> {
        const db = getDatabase(app);
        const rolesRef = ref(db, `users/${uid}/roles`);
        const snapshot = await get(rolesRef);
        if (snapshot.exists()) {
            const rolesData = snapshot.val();
            const roles: Role[] = [];
            if (rolesData.admin === true) {
                roles.push(Role.ADMIN);
            }
            // Aquí se pueden agregar otros roles según se requiera.
            if (roles.length === 0) {
                // Si no se ha asignado ningún rol, se asume el rol de usuario.
                roles.push(Role.USER);
            }
            return roles;
        }
        return [Role.USER];
    }

    async getUserData(userId:string): Promise<{name:string; lastname:string} | null>{
        const db= getDatabase(app);
        const userRef = ref(db,`users/${userId}`);
        try {
            const snapshot = await get(userRef);
            
            if (snapshot.exists()) {
                const user = snapshot.val();
                return {
                    name: user.name || '',
                    lastname: user.lastname || ''
                };
            } else {
                console.warn(`No se encontraron datos para el usuario con UID: ${userId}`);
                return null;
            }
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
            return null;
        }
    }

    async deleteCita(citaId:string): Promise<boolean>{
        const db = getDatabase(app);
        const citaRef = ref(db, `citas/${citaId}`);
        try{
            await remove(citaRef);
            console.log(`Cita ${citaId} eliminada correctamente`);
            return true;
        }catch(error){
            console.log("Error eliminado la cita: " +error);
            return false;
        }
    }

    async modificarCita(citaId:string, nuevaCita:Cita):Promise<boolean>{
        const db = getDatabase(app);
        const citaRef = ref (db, `citas/${citaId}`);
        try{
            await set(citaRef, nuevaCita);
            console.log("Cita actualizada correctamente");
            return true;
        }catch(error){
            console.error("Error al actualizar la cita: " + error);
            return false;
        }
    }

    async getCitasByUser(userId:string): Promise<Cita[] | null>{
        const db= getDatabase(app);
        const citasRef = ref(db, "citas");
        try{
            const snapshot = await get(citasRef);
            if(snapshot.exists()){
                const citasData= snapshot.val();
                const citas:Cita[] = [];
                for(const key in citasData){
                    if(citasData[key].uid === userId){
                        citas.push({
                            id: key, // Agregamos el ID de la cita para futuras referencias
                            uid: citasData[key].uid,
                            name: citasData[key].name,
                            lastname: citasData[key].lastname,
                            medico: citasData[key].medico,
                            tratamiento: citasData[key].tratamiento,
                            fecha: citasData[key].fecha,
                        });
                    }
                }
                return citas.length>0 ? citas : null;
            }
            return null;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async getAllCitas():Promise<Cita[] |null>{
        const db= getDatabase(app);
        const citasRef = ref(db, "citas");
        try{
            const snapshot = await get(citasRef);

            if(snapshot.exists()){
                const citasData:Cita[]= snapshot.val();
                const citas:Cita[] = [];
                // Aquí recorremos el objeto de citas y lo convertimos en un array
            for (const key in citasData) {
                citas.push({
                    id: key, // Usamos la clave como el id
                    uid: citasData[key].uid,
                    name: citasData[key].name,
                    lastname: citasData[key].lastname,
                    medico: citasData[key].medico,
                    tratamiento: citasData[key].tratamiento,
                    fecha: citasData[key].fecha,
                });
            }
                return citas;
            }
            return null;

        }catch(error){
            console.error("Hubo un errro al obtener todas las citas " + error);
            return null;
        }
    }

    async getAllMedicos(): Promise<Medico[] | null>{
        const db = getDatabase(app);
        const medicosRef= ref(db, "medicos");
        try{
            const snapshot = await get(medicosRef);
            if(snapshot.exists()){
                const medicosData:Medico[] = snapshot.val();
                const medicos:Medico[] = [];
                for(const key in medicosData){
                    medicos.push({
                        Id:key,
                        id: medicosData[key].id,
                        nombre: medicosData[key].nombre
                    });
                }
                return medicos;
            }
            return null;
        }catch(error){
            console.error("Hubo un error al obtener todas los medicos " + error);
            return null;
        }
    }

    async deleteMedico(idMedico:string):Promise<boolean>{
        const db= getDatabase(app);
        const medicoRef = ref(db, `medicos/${idMedico}`);
        try{
            await remove(medicoRef);
            console.log(`Cita ${idMedico} eliminada correctamente`);
            return true;
        }catch(error){
            console.log("Error eliminado la cita: " +error);
            return false;
        }
    }
    async deleteUsuario(idUsuario:string):Promise<boolean>{
        const db= getDatabase(app);
        const medicoRef = ref(db, `users/${idUsuario}`);
        try{
            await remove(medicoRef);
            console.log(`Cita ${idUsuario} eliminada correctamente`);
            return true;
        }catch(error){
            console.log("Error eliminado el usuario: " +error);
            return false;
        }
    }

    async getAllUsuarios():Promise<User[] | null>{
        const db = getDatabase(app);
        const usuariosRef = ref (db, 'users');
        try{
            const snapshot = await get(usuariosRef);
            if(snapshot.exists()){
                const usuariosData:User[] = snapshot.val();
                const usuarios:User[] = [];
                for(const key in usuariosData){
                    usuarios.push({
                        id:key,
                        email: usuariosData[key].email,
                        lastname: usuariosData[key].lastname,
                        name: usuariosData[key].name,
                        roles: usuariosData[key].roles
                    })

                }
                return usuarios;
            }
            return null;
        }catch(error){
            console.log("Hubo algun error obteniendo los usuarios");
            return null;
        }
    }
    async setUserRoles(uid: string, roles: { email: string; name:string; lastname:string; roles: { admin: boolean } }):Promise<void> {
        const db = getDatabase(app);
        const userRef = ref(db, `users/${uid}`);
        await set(userRef, roles);
    }
}