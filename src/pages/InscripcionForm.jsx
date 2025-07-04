import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import InscripcionTable from "../components/InscripcionTable";
import Navbar from "../components/NavBar";

export default function Inscripciones() {
  const [inscripciones, setInscripciones] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchInscripciones();
  }, []);

  const fetchInscripciones = async () => {
    try {
      const res = await fetch("http://localhost:8000/user_carreras/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail);

      const mapped = data.map((i) => ({
        id: i.id,
        user_id: i.user_id,
        carrera_id: i.carrera_id,
        usuario_nombre: i.user.username,
        carrera_nombre: i.carrera.nombre,
      }));

      setInscripciones(mapped);
    } catch (error) {
      toast.error(error.message || "Error al cargar inscripciones");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Desea eliminar esta inscripción?")) return;
    try {
      const res = await fetch(`http://localhost:8000/user_carreras/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail);

      toast.success(data.detail || "Inscripción eliminada");
      fetchInscripciones();
    } catch (error) {
      toast.error(error.message || "Error al eliminar inscripción");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userType="admin" />
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Inscripciones</h1>
          <button
            onClick={() => navigate("/inscripciones/nueva")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Nueva Inscripción
          </button>
        </div>

        <InscripcionTable inscripciones={inscripciones} onDelete={handleDelete} />
      </div>
    </div>
  );
}
