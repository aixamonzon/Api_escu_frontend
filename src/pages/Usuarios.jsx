import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

export default function Usuarios() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  const userType = localStorage.getItem("type") || "alumno";

  useEffect(() => {
    if (!isAuthenticated || user.type !== "admin") {
      navigate("/dashboard");
      return;
    }

    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/users/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al obtener usuarios");

        const data = await res.json();
        setUsuarios(data);
      } catch (error) {
        alert("Error al cargar usuarios");
        console.error(error);
      }
    };

    fetchUsuarios();
  }, [isAuthenticated, user.type]);

  return (
    <>
      <Navbar userType={user.type} />
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Usuarios registrados</h1>

      <button
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => navigate("/usuarios/nuevo")}
      >
        ➕ Crear nuevo usuario
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">DNI</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellido</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-2">{u.username}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.dni}</td>
                <td className="px-4 py-2">{u.first_name}</td>
                <td className="px-4 py-2">{u.last_name}</td>
                <td className="px-4 py-2 capitalize">{u.type}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => navigate(`/usuarios/editar/${u.id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}