import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from '../../services/AuthService';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FormattedMessage, useIntl } from "react-intl";

const Login: React.FC = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string>('');

    const intl = useIntl();
    const placeholderEmail = intl.formatMessage({ id: "app.login.emailPlaceholder" }); 
    const placeholderPassword = intl.formatMessage({ id: "app.login.passwordPlaceholder" }); 
    // Manejador del submit
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita el refresco de la página
        setError('');
        
        try {
            const userCredential = await authService.signIn(email, password);
            console.log("Usuario autenticado login:", userCredential.user);
            //navigate('/');
        } catch (error: any) {
            console.error("Error al iniciar sesión:", error);
            setError("Credenciales inválidas");
        }
    };

    return (
        <Container className="d-flex justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col md={6} className="mx-auto">
                    <h3 className="text-center mb-4"><FormattedMessage id="app.login.iniciarSesion"/></h3>
                    <Form onSubmit={handleLogin} className="shadow-sm p-4 bg-light rounded">
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder={placeholderEmail}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label><FormattedMessage  id="app.login.password"/></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder={placeholderPassword}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Button variant="dark" type="submit" className="w-100"><FormattedMessage id="app.login.ingresar"/></Button>
                    </Form>

                    <p className="mt-3 text-center">
                        <FormattedMessage id="app.login.noCuenta"/><Link to="/registro"> <FormattedMessage id="app.login.registrate"/></Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
