
import { useEffect} from "react";

const UsuariosAdmin: React.FC = ()=>{
    useEffect(()=>{
        console.log("hola");
    },[]);
    return(
        <div>
            <h1>Gestión de Usuarios</h1>
        </div>
    );
}

export default UsuariosAdmin;