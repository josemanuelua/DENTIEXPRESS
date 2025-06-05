import { useEffect, useState } from "react";
import { userService } from "../../../services/UserService";
import { User } from "../../../models/User";
import logger from "../../../services/logging";
import { Container, Row, Col, Form, ListGroup, Button, Alert, } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
const UsuariosAdmin: React.FC = () => {
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const intl = useIntl();
    useEffect(() => {
        const fetchUsuarios = async () => {
            setCargando(true);
            setError(null);
            try {
                const usuariosObtenidos = await userService.getAllUsuarios();
                if (usuariosObtenidos) {
                    setUsuarios(usuariosObtenidos);
                }
            } catch (error) {
                const mensajeError = intl.formatMessage({id:"app.usuariosAdmin.mensajeError"});
                logger.error("Hubo algún error obteniendo los usuarios" + error);
                setError(mensajeError);
            } finally {
                setCargando(false);
            }
        };
        fetchUsuarios();
    }, []);

    // Filtrado sensible a minúsculas
    const usuariosFiltrados = usuarios.filter((usuario) =>
        usuario.name.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleEliminar = async (userId: string) => {
        const mensajeEliminar = intl.formatMessage({id:"app.usuariosAdmin.mensajeEliminar"});
        const mensajeEliminarError = intl.formatMessage({id:"app.usuariosAdmin.mensajeEliminarError"});
        if (!window.confirm(mensajeEliminar)) return;
        try {
            await userService.deleteUsuario(userId);
            setUsuarios((prev) => prev.filter((u) => u.id !== userId));
        } catch (error) {
            logger.error("Error eliminando usuario" + error);
            alert(mensajeEliminarError);
        }
        console.log("boton pulsado");
    };


    return (
        <Container className="py-4">
            <Row>
                <Col>
                    <h1 style={{ textAlign: "center" }}><FormattedMessage id="app.usuariosAdmin.title" /></h1>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={{ span: 6, offset: 3 }}>
                    <Form.Control
                        type="text"
                        placeholder={intl.formatMessage({ id: "app.usuariosAdmin.placeholderBusqueda" })}
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    {cargando && <Alert variant="info"><FormattedMessage id="app.usuariosAdmin.alertaCargando" /></Alert>}

                    {error && <Alert variant="danger">{error}</Alert>}

                    {!cargando && usuariosFiltrados.length === 0 && (
                        <Alert variant="warning"><FormattedMessage id="app.usuariosAdmin.alertaSinResultados" /></Alert>
                    )}

                    <ListGroup>
                        {usuariosFiltrados.map((usuario) => (
                            <ListGroup.Item
                                key={usuario.id}
                                className="d-flex justify-content-between align-items-center"
                            >
                                <span>{usuario.name}</span>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleEliminar(usuario.id)}
                                >
                                    <FormattedMessage id="app.usuariosAdmin.btnEliminar" />
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default UsuariosAdmin;
