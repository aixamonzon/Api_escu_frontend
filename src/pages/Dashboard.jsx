import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import Navbar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard({ onLogout }) {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType={user.type} userName={user.nombre} onLogout={logout} />
      
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎉 Bienvenido, {user.nombre}
          </h1>
          <p className="text-gray-600">
            Has iniciado sesión correctamente. Usá el menú para navegar por la plataforma.
          </p>
        </div>
      </main>
    </div>
  );
}