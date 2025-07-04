import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { Link } from "react-router-dom";
import InscripcionModal from "../components/InscripcionModal";

export default function Carreras() {
  const [carreras, setCarreras] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);

  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("type");

  useEffect(() => {
    const fetchData = async () => {
      const headers = { Authorization: `Bearer ${token}` };

      const resCarreras = await fetch("http://localhost:8000/carreras/all", { headers });
      const dataCarreras = await resCarreras.json();
      setCarreras(dataCarreras);

      const resInscripciones = await fetch("http://localhost:8000/user_carreras/all", { headers });
      const dataInscripciones = await resInscripciones.json();
      setInscripciones(dataInscripciones);
    };

    fetchData();
  }, []);

  const recargarInscripciones = async () => {
  const resInscripciones = await fetch("http://localhost:8000/user_carreras/all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await resInscripciones.json();
  setInscripciones(data);
  };

  return (
    <>
      <Navbar userType={userType} />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Carreras</h1>
          <Link
            to="/carreras/nueva"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Nueva carrera
          </Link>
        </div>

        {/* Lista de carreras */}
        <div className="mb-10">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4">Nombre</th>
                <th className="py-2 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carreras.map((c) => (
                <tr key={c.id}>
                  <td className="py-2 px-4">{c.nombre}</td>
                  <td className="py-2 px-4">
                    <Link to={`/carreras/editar/${c.id}`} className="text-blue-600 hover:underline mr-2">
                      Editar
                    </Link>
                    <button className="text-red-600 hover:underline">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Inscripciones */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Inscripciones</h2>
          <button
            onClick={() => setModalAbierto(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Nueva
          </button>
        </div>

        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">Usuario</th>
              <th className="py-2 px-4">Carrera</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inscripciones.map((i) => (
              <tr key={i.id}>
                <td>{i.user?.username ?? "Desconocido"}</td>
                <td>{i.carrera?.nombre ?? "Sin carrera"}</td>
                <td className="py-2 px-4">
                  <Link to={`/inscripciones/editar/${i.id}`} className="text-blue-600 hover:underline mr-2">
                    Editar
                  </Link>
                  <button className="text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InscripcionModal
        show={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSuccess={recargarInscripciones}
      />
    </>
  );
}
