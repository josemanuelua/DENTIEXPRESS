import { Button, ListGroup } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

interface Cita {
  id: string;
  uid: string;
  name: string;
  lastname: string;
  medico: string;
  tratamiento: string;
  fecha: string;
}

interface CitaListProps {
  citas: Cita[];
  handleDelete: (citaId: string) => void;
}

const CitaList: React.FC<CitaListProps> = ({ citas, handleDelete }) => (
  <ListGroup>
    {citas.map((cita) => (
      <ListGroup.Item key={cita.id} className="d-flex justify-content-between align-items-center">
        <div>
          <strong>ID:</strong> {cita.id} <br />
          <strong><FormattedMessage id="app.perfil.fecha" />:</strong> {cita.fecha} <br />
          <strong><FormattedMessage id="app.perfil.medico" />:</strong> {cita.medico} <br />
          <strong><FormattedMessage id="app.perfil.tratamiento" />:</strong> {cita.tratamiento}
        </div>
        <Button variant="danger" size="sm" onClick={() => handleDelete(cita.id)}>
          <FormattedMessage id="app.perfil.eliminar" />
        </Button>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

export default CitaList;
