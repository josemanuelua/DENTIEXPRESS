import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../../language/languageContenxt";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Role } from "../../services/IUserService";
import { logout } from "../../redux/authSlice";
import { authService } from "../../services/AuthService";
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { FormattedMessage, useIntl } from "react-intl";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { changeLanguage, locale } = useContext(LanguageContext);
  const user = useSelector((state: RootState) => state.auth.userid);
  const roles = useSelector((state: RootState) => state.auth.roles);
  const name = useSelector((state: RootState) => state.auth.name);
  const lastname = useSelector((state: RootState) => state.auth.lastname);
  // dentro del componente
  const intl = useIntl();
  const dropdownTitle = intl.formatMessage({ id: "app.navbar.idioma" }); 
  console.log("locale es:" + locale);
  // const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   changeLanguage(e.target.value);
  //   console.log("actualizo desde navbar " + e.target.value);
  // };

  const handleLogout = () => {
    dispatch(logout());
    authService.signOut();
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <BootstrapNavbar.Brand as={Link} to="/">MiApp</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="p-0" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {!user && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
            {roles && roles.includes(Role.ADMIN) && <Nav.Link as={Link} to="/admin"><FormattedMessage id="app.navbar.admin"/></Nav.Link>}
            {roles && roles.includes(Role.USER) && <Nav.Link as={Link} to="/perfil"><FormattedMessage id="app.navbar.user"/></Nav.Link>}
          </Nav>

          <Nav className="ms-auto d-flex align-items-center">
            <NavDropdown title={dropdownTitle} id="language-select" className="me-3">
              <NavDropdown.Item as="button" onClick={() => changeLanguage('es')}><FormattedMessage id="app.navbar.idioma.spanish"/></NavDropdown.Item>
              <NavDropdown.Item as="button" onClick={() => changeLanguage('en')}><FormattedMessage id="app.navbar.idioma.english"/></NavDropdown.Item>
            </NavDropdown>

            {user ? (
              <>
                <Nav.Link disabled className="text-nowrap me-3">
                  <FormattedMessage id="app.navbar.label.welcome"/>, {name} {lastname}
                </Nav.Link>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Nav.Link disabled><FormattedMessage id="app.navbar.noAutenticado"/></Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
