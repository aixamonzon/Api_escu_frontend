import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CarreraForm() {
  const { id } = useParams(); // si existe, estamos editando
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (id) {
      // cargar datos para editar
      fetch(`http://localhost:8000/carreras/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setNombre(data.nombre);
        })
        .catch((err) => {
          console.error("Error al cargar carrera:", err);
          toast.error("No se pudo cargar la carrera");
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = id
      ? `http://localhost:8000/carreras/edit/${id}`
      : "http://localhost:8000/carreras/create";
    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Error al guardar carrera");
      }

      toast.success(data.detail);
      navigate("/carreras");
    } catch (err) {
      console.error(err);
      toast.error("Ocurrió un error");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-10">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        {id ? "Editar carrera" : "Nueva carrera"}
      </h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Nombre de la carrera
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {id ? "Guardar cambios" : "Crear carrera"}
        </button>
      </form>
    </div>
  );
}
