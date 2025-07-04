import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UsuarioForm from "../components/UsuarioForm";

export default function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/users/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const user = data.find((u) => u.id === parseInt(id));
      if (!user) {
        alert("Usuario no encontrado");
        navigate("/usuarios");
      } else {
        setUsuario(user);
      }
    };

    fetchUsuario();
  }, [id]);

  const handleUpdate = async (form) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/users/${id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.detail || "Error al actualizar usuario");
        return;
      }

      alert("Usuario actualizado");
      navigate("/usuarios");
    } catch (error) {
      console.error(error);
      alert("Error interno");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Usuario</h1>
      {usuario && <UsuarioForm initialData={usuario} onSubmit={handleUpdate} />}
    </div>
  );
}