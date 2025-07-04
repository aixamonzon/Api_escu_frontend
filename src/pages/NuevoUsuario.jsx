import UsuarioForm from "../components/UsuarioForm";
import { useNavigate } from "react-router-dom";

export default function NuevoUsuario() {
  const navigate = useNavigate();

  const handleCreate = async (form) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      console.log("Enviando:", form);
      const res = await fetch("http://localhost:8000/users/register/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok || !data.success) {
        alert(data.detail || "Error al crear usuario");
        return;
      }

      alert("Usuario creado");
      navigate("/usuarios");
    } catch (error) {
      console.error(error);
      alert("Error interno");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nuevo Usuario</h1>
      <UsuarioForm onSubmit={handleCreate} />
    </div>
  );
}