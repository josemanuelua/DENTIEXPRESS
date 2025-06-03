import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MedicosAdmin : React.FC = ()=>{
    const navigate = useNavigate();
    useEffect(()=>{
        console.log("hola desde gestion de medicos")}
        ,[]);
    return (
        <div>
            <h1>Gestión Médicos</h1>
            <button style={{borderRadius:'5px', color: 'blue'}} onClick={() => navigate('nuevoMedico')} >Nuevo medico</button>
        </div>
    );
};

export default MedicosAdmin;