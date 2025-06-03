import { authService } from "../../services/AuthService";
import { userService } from "../../services/UserService";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";

const Registro: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();
  const intl = useIntl();
  const placeholderEmail = intl.formatMessage({ id: "app.registro.emailPlaceholder" }); 
  const placeholderPassword = intl.formatMessage({ id: "app.registro.passwordPlaceholder" });
  const placeholderApellidos = intl.formatMessage({ id: "app.registro.apellidosPlaceholder" });
  const placeholderNombre = intl.formatMessage({ id: "app.registro.nombrePlaceholder" });    

  // Manejador del submit
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!email || !name || !lastname || !password) {
      alert("Todos los campos son obligatorios");
      return;
    }
    e.preventDefault(); // Evita el refresco de la página
    setError("");
    try {
      const userCredential = await authService.signUp(email, password);
      console.log("Usuario registrado:", userCredential.user);

      // Crear registro en BBDD con roles iniciales (admin: false)
      await userService.setUserRoles(userCredential.user.uid, {
        email: userCredential.user.email,
        name: name,
        lastname: lastname,
        roles: { admin: false },
      });

      setSuccess("Registro exitoso. Redirigiendo a la página de login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      console.error("Error al registrarse:", error);
      setError("Hubo algún error durante el registro");
    }
  };

  return (
    <Container className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <h3 className="text-center mb-4"><FormattedMessage id="app.registro.registro"/></h3>
          <Form onSubmit={handleRegister} className="shadow-sm p-4 bg-light rounded">
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label><FormattedMessage id="app.registro.nombre"/></Form.Label>
              <Form.Control
                type="text"
                placeholder={placeholderNombre}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastname" className="mb-3">
              <Form.Label><FormattedMessage id="app.registro.apellidos"/></Form.Label>
              <Form.Control
                type="text"
                placeholder={placeholderApellidos}
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </Form.Group>

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
              <Form.Label><FormattedMessage id="app.registro.password"/></Form.Label>
              <Form.Control
                type="password"
                placeholder={placeholderPassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Button variant="dark" type="submit" className="w-100"><FormattedMessage id="app.registro.registrar"/></Button>
          </Form>

          <p className="mt-3 text-center">
            <FormattedMessage id="app.registro.yaCuenta"/> <Link to="/login"> <FormattedMessage id="app.registro.iniciarSesion"/></Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Registro;
