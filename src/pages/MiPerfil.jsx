import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/NavBar";

export default function MiPerfil() {
  const [perfil, setPerfil] = useState(null);
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await fetch("http://localhost:8000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPerfil(data);
      } catch (err) {
        toast.error("Error al cargar perfil");
      }
    };

    fetchPerfil();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/users/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Contraseña cambiada correctamente");
        setForm({ old_password: "", new_password: "" });
      } else {
        toast.error(data.detail || "Error al cambiar contraseña");
      }
    } catch (err) {
      toast.error("Error de conexión");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
        {perfil ? (
          <div className="mb-6">
            <p><strong>Usuario:</strong> {perfil.username}</p>
            <p><strong>Email:</strong> {perfil.email}</p>
            <p><strong>Nombre:</strong> {perfil.first_name} {perfil.last_name}</p>
            <p><strong>DNI:</strong> {perfil.dni}</p>
            <p><strong>Tipo:</strong> {perfil.type}</p>
          </div>
        ) : (
          <p>Cargando perfil...</p>
        )}

        <h2 className="text-lg font-semibold mb-2">Cambiar contraseña</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label>Contraseña actual</label>
            <input
              type="password"
              className="w-full border px-2 py-1 rounded"
              value={form.old_password}
              onChange={(e) => setForm({ ...form, old_password: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Nueva contraseña</label>
            <input
              type="password"
              className="w-full border px-2 py-1 rounded"
              value={form.new_password}
              onChange={(e) => setForm({ ...form, new_password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Cambiar
          </button>
        </form>
      </div>
    </>
  );
}