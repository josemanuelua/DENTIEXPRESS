import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { ref, push, get } from "firebase/database";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // español
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";

const CrearCita: React.FC = () => {
  const nombre = useSelector((state: RootState) => state.auth.name);
  const apellidos = useSelector((state: RootState) => state.auth.lastname);
  const uid = useSelector((state: RootState) => state.auth.userid);

  const [fecha, setFecha] = useState<Date | null>(null);
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [medico, setMedico] = useState<string>("");
  const [tratamiento, setTratamiento] = useState<string>("");
  const [medicos, setMedicos] = useState<{ id: string; nombre: string }[]>([]);
  const [tratamientos, setTratamientos] = useState<{ id: string; nombre: string }[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const intl = useIntl();
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        if (nombre && apellidos) {
          setName(nombre);
          setLastname(apellidos);
        }
        const medicosRef = ref(db, "medicos");
        const medicosSnap = await get(medicosRef);
        if (medicosSnap.exists()) {
          const listaMedicos = Object.values(medicosSnap.val());
          setMedicos(listaMedicos as { id: string; nombre: string }[]);
        }

        const tratamientosRef = ref(db, "tratamientos");
        const tratamientosSnap = await get(tratamientosRef);
        if (tratamientosSnap.exists()) {
          const listaTratamientos = Object.values(tratamientosSnap.val());
          setTratamientos(listaTratamientos as { id: string; nombre: string }[]);
        }
      } catch (err) {
        console.error("Error al cargar datos:", err);
      }
    };

    cargarDatos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const mensajeExito = intl.formatMessage({id: 'app.crearCita.mensajeExito'});
    const mensajeError = intl.formatMessage({id : 'app.crearCita.mensajeError'});
    if (!fecha || !name || !lastname || !medico || !tratamiento) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const citasRef = ref(db, "citas");
      await push(citasRef, {
        uid,
        name,
        lastname,
        medico,
        tratamiento,
        fecha: format(fecha, "dd-MM-yyyy HH:mm", { locale: es }),
      });

      setSuccess(mensajeExito);
      setFecha(null);
      setMedico("");
      setTratamiento("");

      setTimeout(() => {
        navigate("/perfil");
      }, 2000);
    } catch (err) {
      console.error("Error al guardar cita:", err);
      setError(mensajeError);
    }
  };

  return (
    <Container className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <h3 className="text-center mb-4"><FormattedMessage id="app.crearCita.reserva"/></h3>
          <Form onSubmit={handleSubmit} className="shadow-sm p-4 bg-light rounded">
            <Form.Group className="mb-3">
              <Form.Label><FormattedMessage id="app.crearCita.paciente"/></Form.Label>
              <Form.Control type="text" value={`${name} ${lastname}`} disabled readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FormattedMessage id="app.crearCita.medico"/></Form.Label>
              <Form.Select value={medico} onChange={(e) => setMedico(e.target.value)} required>
                <option value=""><FormattedMessage id="app.crearCita.placeholderMedico"/></option>
                {medicos.map((med) => (
                  <option key={med.id} value={med.nombre}>
                    {med.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FormattedMessage id="app.crearCita.tratamiento"/></Form.Label>
              <Form.Select value={tratamiento} onChange={(e) => setTratamiento(e.target.value)} required>
                <option value=""><FormattedMessage id="app.crearCita.placeholderTratamiento"/></option>
                {tratamientos.map((trat) => (
                  <option key={trat.id} value={trat.nombre}>
                    {trat.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FormattedMessage id="app.crearCita.fechayhora"/></Form.Label>
              <div>
                <DatePicker
                  selected={fecha}
                  onChange={(date: Date | null) => setFecha(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="dd-MM-yyyy HH:mm"
                  locale={es}
                  minDate={new Date()}
                  className="form-control"
                  required
                />
              </div>
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Button type="submit" variant="dark" className="w-100"><FormattedMessage id="app.crearCita.crearCita"/></Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CrearCita;
