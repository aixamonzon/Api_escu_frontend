import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PagoForm() {
  const { id } = useParams(); // si existe, estamos editando
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    user_id: "",
    carrera_id: "",
    monto: "",
    mes: "",
  });

  const [usuarios, setUsuarios] = useState([]);
  const [carreras, setCarreras] = useState([]);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    // Obtener usuarios y carreras para los selects
    const fetchData = async () => {
      const usuariosRes = await fetch("http://localhost:8000/users/all", { headers });
      const carrerasRes = await fetch("http://localhost:8000/carreras/all", { headers });

      const usuariosData = await usuariosRes.json();
      const carrerasData = await carrerasRes.json();

      setUsuarios(usuariosData);
      setCarreras(carrerasData);
    };

    fetchData();

    if (id) {
      // Obtener datos del pago a editar
      fetch(`http://localhost:8000/pagos/alumno?user_id=${id}`, { headers })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const pago = data[0];
            setForm({
              user_id: pago.user_id,
              carrera_id: pago.carrera_id,
              monto: pago.monto,
              mes: pago.mes,
            });
          }
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = id
      ? `http://localhost:8000/pagos/edit/${id}`
      : "http://localhost:8000/pagos/create";

    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers,
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/pagos");
      } else {
        alert(data.detail || "Error al guardar el pago");
      }
    } catch (error) {
      alert("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{id ? "Editar Pago" : "Nuevo Pago"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Alumno</label>
          <select
            name="user_id"
            value={form.user_id}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Seleccione un usuario</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Carrera</label>
          <select
            name="carrera_id"
            value={form.carrera_id}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Seleccione una carrera</option>
            {carreras.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Monto</label>
          <input
            type="number"
            name="monto"
            value={form.monto}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
            step="0.01"
            min="0"
          />
        </div>

        <div>
          <label className="block mb-1">Mes (01 - 12)</label>
          <input
            type="text"
            name="mes"
            value={form.mes}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            pattern="^(0[1-9]|1[0-2])$"
            required
            placeholder="Ej: 03"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {id ? "Actualizar Pago" : "Registrar Pago"}
        </button>
      </form>
    </div>
  );
}
