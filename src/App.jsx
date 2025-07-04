import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import fondo from './assets/Fondo.jpeg';
import './App.css'
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Usuarios from "./pages/Usuarios";
import NuevoUsuario from "./pages/NuevoUsuario";
import EditarUsuario from "./pages/EditarUsuario";
import CarreraForm from "./pages/CarreraForm";
import Carreras from "./pages/Carreras";
import Pagos from "./pages/Pagos";
import PagoForm from "./pages/PagoForm";
import Inscripciones from "./pages/InscripcionForm";
import MisPagos from "./pages/MisPagos";
import MiPerfil from "./pages/MiPerfil";

function App() {
   const { isAuthenticated } = useContext(AuthContext);

  return (
    <div
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
      >
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/usuarios" element={isAuthenticated ? <Usuarios /> : <Navigate to="/" />} />
        <Route path="/usuarios/nuevo" element={isAuthenticated ? <NuevoUsuario /> : <Navigate to="/" />} />
        <Route path="/usuarios/editar/:id" element={isAuthenticated ? <EditarUsuario /> : <Navigate to="/" />} />
        <Route path="/carreras" element={isAuthenticated ? <Carreras /> : <Navigate to="/" />} />
        <Route path="/carreras/nueva" element={<CarreraForm />} />
        <Route path="/carreras/editar/:id" element={<CarreraForm />} />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/pagos/nuevo" element={<PagoForm />} />
        <Route path="/pagos/editar/:id" element={<PagoForm />} />
        <Route path="/inscripciones/nueva" element={<Inscripciones />} />
        <Route path="/mis-pagos" element={<MisPagos />} />
        <Route path="/mi-perfil" element={<MiPerfil />} />
      </Routes>
    </Router>
        </div>
  )
}

export default App
