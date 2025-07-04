import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { toast } from "react-toastify";

export default function MisPagos() {
  const [pagos, setPagos] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const res = await fetch("http://localhost:8000/pagos/mis_pagos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setPagos(data);
        } else {
          toast.error(data.detail || "Error al obtener pagos");
        }
      } catch (err) {
        toast.error("Error de conexión");
      }
    };

    fetchPagos();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Mis Pagos</h1>
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">Mes</th>
              <th className="py-2 px-4">Monto</th>
              <th className="py-2 px-4">Fecha de pago</th>
              <th className="py-2 px-4">Carrera ID</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((p) => (
              <tr key={p.id}>
                <td className="py-2 px-4">{p.mes}</td>
                <td className="py-2 px-4">${p.monto}</td>
                <td className="py-2 px-4">{p.fecha_pago}</td>
                <td className="py-2 px-4">{p.carrera_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}