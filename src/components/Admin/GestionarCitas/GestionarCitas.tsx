import { useEffect, useState } from "react";
import { userService } from "../../../services/UserService";
import { Cita } from "../../../models/Cita";
import { Alert, Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import { User } from "../../../models/User";
import { useDispatch } from 'react-redux';
import { setCita } from '../../../redux/citaSlice';
import logger from "../../../services/logging";
import { FormattedMessage, useIntl } from "react-intl";


const GestionarCitas: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [citas, setCitas] = useState<Cita[]>([]);
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [error, setError] = useState<string>("");
    const [idSeleccionado, setIdSeleccionado] = useState<string>("");
    const intl = useIntl();

    
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const usuariosObtenidos = await userService.getAllUsuarios();
                if (usuariosObtenidos) {
                    setUsuarios(usuariosObtenidos);
                }
            } catch (error) {
                logger.error("hubo algun error obteniedo los usuarios");
            }
        };
        fetchUsuarios();
    }, []);

    const usuarioSeleccionado = usuarios.find((u) => u.id === idSeleccionado);

    const handleDelete = async (idCita: string) => {
        const alertaEliminar= intl.formatMessage({ id: "app.gestionarCitas.alertaEliminar" }); 
        const confirmacion = window.confirm(alertaEliminar);
        if (!confirmacion) {
            return;
        }

        const success = await userService.deleteCita(idCita);
        if (success) {
            setCitas(citas.filter((cita) => cita.id !== idCita));
        } else {
            logger.error("hubo algun error eliminando la cita");
        }
    };

    const handleChange = async (event:any) =>{
        logger.debug("id seleccionado: " + event.target.value);
        setIdSeleccionado(event.target.value);
            try{
                const citasObtenidas = await userService.getCitasByUser(event.target.value);
                if(citasObtenidas){
                    setCitas(citasObtenidas);
                }else{
                    setCitas([]);
                }
            }catch(error){
                logger.error("Hubo algun error obteniendo las citas");
                setError("Hubo algun error obteniendo las citas");
            }
    }

    const handleModificar=(cita:Cita)=>{
        dispatch(setCita({
            id: cita.id,
            fecha: cita.fecha,
            lastname: cita.lastname,
            medico: cita.medico,
            name: cita.name,
            tratamiento: cita.tratamiento,
            uid: idSeleccionado
          }));
          navigate(`modificarCita`);
    };

    return (
        <div>
            {/* <p>Pagina de modificacion de Cita</p> */}
            <Container className="py-4">
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="usuarioSelect">
                            <Form.Select
                                style={{ width: 'fit-content' }}
                                onChange={(e) => handleChange(e)}
                                defaultValue=""
                            >
                                <option value="" disabled><FormattedMessage id="app.gestionarCitas.seleccionar"/></option>
                                {usuarios.map((usuario) => (
                                    <option key={usuario.id} value={usuario.id}>
                                        {usuario.name} {usuario.lastname}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                {citas && usuarios &&
                    <Row className="justify-content-center">
                    <Col md={8}>
                        <h2 className="text-center mb-4"><FormattedMessage id="app.gestionarCitas.citasTitulo"/> {usuarioSeleccionado?.name} {usuarioSeleccionado?.lastname}</h2>
                        {/* <div className="d-flex justify-content-between align-items-center mb-3">
                            <p className="mb-0">Esta es la página de perfil</p>
                            <Link to="/nuevaCita" className="btn btn-primary">
                                Nueva Cita
                            </Link>
                        </div> */}

                        {/* <h4>Citas</h4> */}

                        {error && <Alert variant="danger">{error}</Alert>}

                        {citas.length > 0 ? (
                            <ListGroup>
                                {citas.map((cita) => (
                                    <ListGroup.Item key={cita.id} className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>ID:</strong> {cita.id} <br />
                                            <strong><FormattedMessage id="app.gestionarCitas.fecha"/>:</strong> {cita.fecha} <br />
                                            <strong><FormattedMessage id="app.gestionarCitas.medico"/>:</strong> {cita.medico} <br />
                                            <strong><FormattedMessage id="app.gestionarCitas.tratamiento"/>:</strong> {cita.tratamiento}
                                        </div>
                                        <div className="d-flex gap-2">
                                            <Button variant="danger" size="sm" onClick={() => handleDelete(cita.id)}>
                                                <FormattedMessage id="app.gestionarCitas.eliminar"/>
                                            </Button>
                                            <Button variant="primary" size="sm" onClick={() => handleModificar(cita)}>
                                            <FormattedMessage id="app.gestionarCitas.modificar"/>
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <Alert variant="info" className="mt-3">
                                <FormattedMessage id="app.gestionarCitas.noCitas"/>
                            </Alert>
                        )}
                    </Col>
                </Row>
            }
            </Container>


        </div>
    );
};

export default GestionarCitas;