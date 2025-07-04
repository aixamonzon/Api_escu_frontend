import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NavBar({ }) {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("nombre");
        localStorage.removeItem("type");
        logout();
        navigate("/");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <button
          className="text-blue-600 font-semibold hover:underline"
          onClick={() => navigate("/dashboard")}
        >
          Principal
        </button>

        {user.type === "alumno" && (
          <>
            <button onClick={() => navigate("/mis-pagos")} className="text-blue-600 hover:underline">
              Mis Pagos
            </button>
            <button onClick={() => navigate("/mi-perfil")} className="text-blue-600 hover:underline">
              Mi Perfil
            </button>
          </>
        )}

        {user.type === "admin" && (
          <>
            <button onClick={() => navigate("/pagos")} className="text-blue-600 hover:underline">
              Pagos
            </button>
            <button onClick={() => navigate("/usuarios")} className="text-blue-600 hover:underline">
              Usuarios
            </button>
            <button onClick={() => navigate("/carreras")} className="text-blue-600 hover:underline">
              Carreras
            </button>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default NavBar;