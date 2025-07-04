import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/NavBar";

export default function Dashboard({ onLogout }) {
  const nombre = localStorage.getItem("nombre");
  const userType = localStorage.getItem("type") || "alumno";
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) navigate("/");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Navbar userType={userType} onLogout={onLogout} />
      <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🎉 Bienvenido, {nombre}
        </h1>
        <p className="text-gray-600 mb-6">
          Has iniciado sesión correctamente. Puedes comenzar a usar la plataforma.
        </p>
      </div>
    </div>
  );
}