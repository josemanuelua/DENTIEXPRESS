import { get, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase/firebaseConfig";
import { es } from "date-fns/locale";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { format, parse } from "date-fns";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import logger from "../../../services/logging";
import { FormattedMessage, useIntl } from "react-intl";

const ModificarCita: React.FC = () => {
  const navigate = useNavigate();
  const cita = useSelector((state: RootState) => state.cita);
  const [fecha, setFecha] = useState<Date | null>(null);
  const [medico, setMedico] = useState<string>("");
  const [tratamiento, setTratamiento] = useState<string>("");
  const [medicos, setMedicos] = useState<{ id: string; nombre: string }[]>([]);
  const [tratamientos, setTratamientos] = useState<{ id: string; nombre: string }[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const intl = useIntl();
  useEffect(() => {
    if (!cita || !cita.id) {
      navigate("/admin/gestionarCitas"); // Redirige si no hay cita en el estado
      return;
    }

    // Parsear la fecha si existe (viene como string dd-MM-yyyy HH:mm)
    if (cita.fecha) {
      try {
        logger.debug("cita.fecha cruda:" + cita.fecha);
        const parsedDate = parse(cita.fecha, "dd-MM-yyyy HH:mm", new Date());
        if (!isNaN(parsedDate.getTime())) {
          setFecha(parsedDate);
        } else {
          logger.warn("Fecha parseada inválida:" + parsedDate);
        }
        
      } catch {
        logger.warn("Fecha mal formateada en cita original");
      }
    }

    if (cita.medico) {
      setMedico(cita.medico);
    }

    if (cita.tratamiento) {
      setTratamiento(cita.tratamiento);
    }
    const cargarDatos = async () => {
      try {

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
        logger.error("Error al cargar datos:" + err);
      }
    };

    cargarDatos();
  }, [cita, navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    const mensajeExito = intl.formatMessage({ id: "app.modificarCita.citaExitosa" }); 
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fecha || !medico || !tratamiento) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const citaRef = ref(db, `citas/${cita.id}`);
      await update(citaRef, {
        name: cita.name,
        lastname: cita.lastname,
        uid: cita.uid,
        medico,
        tratamiento,
        fecha: format(fecha, "dd-MM-yyyy HH:mm", { locale: es }),
      });

      setSuccess(mensajeExito);
      setTimeout(() => {
        navigate("/admin/gestionarCitas");
      }, 2000);
    } catch (err) {
      logger.error("Error al actualizar cita:" + err);
      setError("Error al modificar la cita. Intenta de nuevo.");
    }
  };

  return (
    <Container className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <h3 className="text-center mb-4"><FormattedMessage id="app.modificarCita.modificar"/></h3>
          <Form onSubmit={handleSubmit} className="shadow-sm p-4 bg-light rounded">
            <Form.Group className="mb-3">
              <Form.Label><FormattedMessage id="app.modificarCita.paciente"/></Form.Label>
              <Form.Control type="text" value={`${cita.name} ${cita.lastname}`} disabled readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FormattedMessage id="app.modificarCita.medico"/></Form.Label>
              <Form.Select value={medico} onChange={(e) => setMedico(e.target.value)} required>
                <option value=""><FormattedMessage id="app.modificarCita.seleccionarMedico"/></option>
                {medicos.map((med) => (
                  <option key={med.id} value={med.nombre}>
                    {med.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FormattedMessage id="app.modificarCita.tratamiento"/></Form.Label>
              <Form.Select value={tratamiento} onChange={(e) => setTratamiento(e.target.value)} required>
                <option value=""><FormattedMessage id="app.modificarCita.seleccionarTratamiento"/></option>
                {tratamientos.map((trat) => (
                  <option key={trat.id} value={trat.nombre}>
                    {trat.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FormattedMessage id="app.modificarCita.fechayhora"/></Form.Label>
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

            <Button type="submit" variant="primary" className="w-100"><FormattedMessage id="app.modificarCita.guardarCambios"/></Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ModificarCita;