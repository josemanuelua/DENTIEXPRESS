import { FormattedMessage } from "react-intl";
import { Container, Row, Col, Card } from "react-bootstrap";
const Home: React.FC = () => {

    return (
        <div className="homediv">
            <div
                style={{
                    width: '100vw',
                    height: '400px',
                    maxHeight: '400px',
                    overflow: 'hidden',
                }}
            >
                <img
                    src={`${import.meta.env.VITE_APP_BASE_URL}assets/clinica-dental.jpeg`}
                    alt="Logo"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                />
            </div>

            <h2 style={{ textAlign: 'center' }}><FormattedMessage id="app.home.label.welcome" /> <FormattedMessage id="app.home.label.title" /></h2>

            <Container>
                <Row>
                    <Col md={4} xs={12} className="mb-4">
                        <Card>
                            <Card.Header className="d-flex align-items-center">
                                <strong><FormattedMessage id="app.home.label.implantologia" /></strong>
                            </Card.Header>
                            <Card.Img
                                variant="top"
                                src={`${import.meta.env.VITE_APP_BASE_URL}assets/implantologia.jpg`}
                                alt="Implantología"
                            />
                            <Card.Body>
                                <Card.Text>
                                    <FormattedMessage id="app.home.text.implantologia" />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4} xs={12} className="mb-4">
                        <Card>
                            <Card.Header className="d-flex align-items-center">
                                <strong><FormattedMessage id="app.home.label.ortodoncia" /></strong>
                            </Card.Header>
                            <Card.Img
                                variant="top"
                                src={`${import.meta.env.VITE_APP_BASE_URL}assets/ortodoncia.jpg`}
                                alt="Ortodoncia"
                            />
                            <Card.Body>
                                <Card.Text>
                                    <FormattedMessage id="app.home.text.ortodoncia" />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4} xs={12} className="mb-4">
                        <Card>
                            <Card.Header className="d-flex align-items-center">
                                <strong><FormattedMessage id="app.home.label.periodoncia" /></strong>
                            </Card.Header>
                            <Card.Img
                                variant="top"
                                src={`${import.meta.env.VITE_APP_BASE_URL}assets/Periodoncia.jpg`}
                                alt="Periodoncia"
                            />
                            <Card.Body>
                                <Card.Text>
                                    <FormattedMessage id="app.home.text.periodoncia" />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default Home;