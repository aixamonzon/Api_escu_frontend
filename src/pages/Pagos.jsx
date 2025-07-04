import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";

export default function Pagos() {
  const [pagos, setPagos] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("type");

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const res = await fetch("http://localhost:8000/pagos/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al obtener pagos");
        const data = await res.json();
        setPagos(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (userType === "admin") fetchPagos();
  }, [token, userType]);

  const handleDelete = async (id) => {
    if (!confirm("¿Desea eliminar este pago?")) return;

    const res = await fetch(`http://localhost:8000/pagos/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setPagos(pagos.filter((p) => p.id !== id));
    } else {
      alert("Error al eliminar pago");
    }
  };

  return (
    <>
      <Navbar userType={userType} />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Pagos Registrados</h1>
          <Link
            to="/pagos/nuevo"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Registrar pago
          </Link>
        </div>

        {error && <div className="text-red-600">{error}</div>}

        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">Usuario</th>
              <th className="py-2 px-4">Carrera</th>
              <th className="py-2 px-4">Mes</th>
              <th className="py-2 px-4">Monto</th>
              <th className="py-2 px-4">Fecha de Pago</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr key={pago.id}>
                <td className="py-2 px-4">{pago.user.username}</td>
                <td className="py-2 px-4">{pago.carrera_id}</td>
                <td className="py-2 px-4">{pago.mes}</td>
                <td className="py-2 px-4">${pago.monto}</td>
                <td className="py-2 px-4">{pago.fecha_pago}</td>
                <td className="py-2 px-4">
                  <Link
                    to={`/pagos/editar/${pago.id}`}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(pago.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
