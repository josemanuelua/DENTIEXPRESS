

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import React, { Suspense, useEffect, useState } from "react";
import { userService } from "../../services/UserService";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";

const CitaList = React.lazy(() =>
  new Promise<{ default: React.ComponentType<any> }>((resolve) => {
    setTimeout(() => {
      import('./CitaList').then(module => {
        resolve(module);
      });
    }, 500);
  })
);


interface Cita {
    id: string;
    uid: string;
    name: string;
    lastname: string;
    medico: string;
    tratamiento: string;
    fecha: string;
}

const Perfil: React.FC = () => {


    const uid = useSelector((state: RootState) => state.auth.userid);
    const [citas, setCitas] = useState<Cita[]>([]);
    const [error, setError] = useState<string>("");
    const intl = useIntl();
    useEffect(() => {
        const fetchCitas = async () => {
            const mensajeErrorCargar = intl.formatMessage({ id: 'app.perfil.mensajeErrorCargar' });
            if (uid) {
                try {
                    const citasObtenidas = await userService.getCitasByUser(uid);
                    if (citasObtenidas) {
                        setCitas(citasObtenidas);
                    }
                } catch (error) {
                    console.log("Error al obtener citas: " + error);
                    setError(mensajeErrorCargar);
                }
            }
        };
        fetchCitas();
    }, [uid]);

    const handleDelete = async (citaId: string) => {
        const mensajeAlerta = intl.formatMessage({ id: 'app.perfil.alertaEliminar' });
        const mensajeErrorEliminar = intl.formatMessage({ id: 'app.perfil.mensajeErrorEliminar' });
        const confirmacion = window.confirm(mensajeAlerta);
        if (!confirmacion) {
            return;
        }

        const success = await userService.deleteCita(citaId);
        if (success) {
            setCitas(citas.filter((cita) => cita.id !== citaId));
        } else {
            alert(mensajeErrorEliminar);
        }
    };

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2 className="text-center mb-4"><FormattedMessage id="app.perfil.perfilUsuario" /></h2>
                    <div className="d-flex justify-content-end align-items-center mb-3">
                        {/* <p className="mb-0">Esta es la página de perfil</p> */}
                        <Link to="/nuevaCita" className="btn btn-primary">
                            <FormattedMessage id="app.perfil.nuevaCita" />
                        </Link>
                    </div>

                    <h4><FormattedMessage id="app.perfil.misCitas" /></h4>

                    {error && <Alert variant="danger">{error}</Alert>}

                    {citas.length > 0 ? (
                        <Suspense fallback={<div><FormattedMessage id="app.perfil.cargandoCitas" /></div>}>
                            <CitaList citas={citas} handleDelete={handleDelete} />
                        </Suspense>
                    ) : (
                        <Alert variant="info" className="mt-3">
                            <FormattedMessage id="app.perfil.noCitas" />
                        </Alert>
                    )}

                </Col>
            </Row>
        </Container>
    );
};

export default Perfil;
