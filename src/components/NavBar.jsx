import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ userType, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("nombre");
        localStorage.removeItem("type");
        onLogout();
        navigate("/");
  };

      return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <button
          className="text-blue-600 font-semibold hover:underline"
          onClick={() => navigate("/dashboard")}
        >
          Home
        </button>

        {userType === "alumno" && (
          <>
            <button
              className="text-blue-600 font-semibold hover:underline"
              onClick={() => navigate("/mis-pagos")}
            >
              Mis Pagos
            </button>
            <button
              className="text-blue-600 font-semibold hover:underline"
              onClick={() => navigate("/mi-perfil")}
            >
              Mi Perfil
            </button>
          </>
        )}

        {userType === "admin" && (
          <>
            <button
              className="text-blue-600 font-semibold hover:underline"
              onClick={() => navigate("/pagos")}
            >
              Pagos
            </button>
            <button
              className="text-blue-600 font-semibold hover:underline"
              onClick={() => navigate("/usuarios")}
            >
              Usuarios
            </button>
            <button
              className="text-blue-600 font-semibold hover:underline"
              onClick={() => navigate("/carreras")}
            >
              Carreras
            </button>
          </>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
      >
        Cerrar sesión
      </button>
    </nav>
  );
}

export default NavBar;