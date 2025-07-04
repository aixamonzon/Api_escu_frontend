import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function InscripcionModal({ show, onClose, onSuccess }) {
  const [alumnos, setAlumnos] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [form, setForm] = useState({ user_id: "", carrera_id: "" });

  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    if (!show) return;

    const fetchData = async () => {
      const [resAlumnos, resCarreras] = await Promise.all([
        fetch("http://localhost:8000/users/alumnos", { headers }),
        fetch("http://localhost:8000/carreras/all", { headers }),
      ]);
      const alumnosData = await resAlumnos.json();
      const carrerasData = await resCarreras.json();
      setAlumnos(alumnosData);
      setCarreras(carrerasData);
    };

    fetchData();
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/user_carreras/assign", {
        method: "POST",
        headers,
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Inscripción creada exitosamente");
        onSuccess(); // para recargar inscripciones en Carreras.jsx
        onClose();
      } else {
        toast.error(data.detail || "Error al asignar inscripción");
      }
    } catch (err) {
      toast.error("Error de conexión");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">Nueva Inscripción</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Alumno</label>
            <select
              required
              value={form.user_id}
              onChange={(e) => setForm({ ...form, user_id: parseInt(e.target.value) })}
              className="w-full border px-2 py-1 rounded"
            >
              <option value="">Seleccione un alumno</option>
              {alumnos.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.username}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Carrera</label>
            <select
              required
              value={form.carrera_id}
              onChange={(e) => setForm({ ...form, carrera_id: parseInt(e.target.value) })}
              className="w-full border px-2 py-1 rounded"
            >
              <option value="">Seleccione una carrera</option>
              {carreras.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">
              Cancelar
            </button>
            <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
              Inscribir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}