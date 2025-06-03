import { Container, Row, Col, Nav } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { Link, Outlet } from "react-router-dom";

const Admin: React.FC = () => {
  return (
    <Container fluid className="mt-0">
      <Row>
        {/* Sidebar */}
        <Col md={3} lg={2} className="bg-dark text-light vh-auto p-0 sticky-top">
          <Nav className="flex-column p-3">
            <h4 className="text-left text-white mb-4 ms-3"><FormattedMessage id="app.admin.menu"/></h4>
            {/* <Nav.Link as={Link} to="usuarios" className="text-light">Gestionar Usuarios</Nav.Link>
            <Nav.Link as={Link} to="medicos" className="text-light">Gestionar Médicos</Nav.Link> */}
            <Nav.Link as={Link} to="gestionarCitas" className="text-light"><FormattedMessage id="app.admin.gestionarCitas"/></Nav.Link>
          </Nav>
        </Col>

        {/* Contenido principal */}
        <Col md={9} lg={10} className="p-4">
          
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
