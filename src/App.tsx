import { useContext } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Registro from './components/Registro/Registro';
import Perfil from './components/Perfil/Perfil';
import CrearCita from './components/CrearCita/CrearCita';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AuthListener from '../src/components/AuthListener/AuthListener';
import { LanguageProvider } from './language/languageProvider';
import { LanguageContext } from './language/languageContenxt';
import { IntlProvider } from 'react-intl';
import AdminRoute from './routes/AdminRoutes';
import ProtectedRoute from './routes/ProtectedRoutes';
import UsuariosAdmin from './components/Admin/UsuariosAdmin/UsuariosAdmin';
import MedicosAdmin from './components/Admin/MedicosAdmin/MedicosAdmin';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import Admin from './components/Admin/Admin';
import CrearMedico from './components/CrearMedico/CrearMedico';
import GestionarCitas from './components/Admin/GestionarCitas/GestionarCitas';
import ModificarCita from './components/Admin/ModificarCita/ModificarCita';

// ⬇ Nuevo componente para asegurarnos de que `useContext` se ejecuta dentro del `Provider`
const AppContent = () => {
  const { locale, messages } = useContext(LanguageContext);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
            <Route path="/nuevaCita" element={<ProtectedRoute><CrearCita /></ProtectedRoute>} />
            <Route path="/admin" element={<AdminRoute> <Admin /></AdminRoute>}>
              <Route index element={<Dashboard/>} />
              <Route path="usuarios" element={<UsuariosAdmin/>}/>
              <Route path="medicos" element={<MedicosAdmin/>}/>
                <Route path="medicos/nuevoMedico" element={<CrearMedico/>}/>
              <Route path="gestionarCitas" element={<GestionarCitas/>} />
                <Route path="gestionarCitas/modificarCita" element={<ModificarCita/>}/>
              
            </Route>   
          </Routes>
        </div>
      </Router>
    </IntlProvider>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Provider store={store}>
        <AuthListener>
          <AppContent /> {/* Se asegura de que `useContext(LanguageContext)` tenga acceso a `Provider` */}
        </AuthListener>
      </Provider>
    </LanguageProvider>
  );
}

export default App;
