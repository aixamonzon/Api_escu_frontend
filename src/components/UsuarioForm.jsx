import { useState, useEffect } from "react";

export default function UsuarioForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    dni: "",
    first_name: "",
    last_name: "",
    type: "alumno",
    password: "",
    ...initialData,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
      <input name="username" placeholder="Username" className="input" value={form.username} onChange={handleChange} required />
      <input name="email" placeholder="Email" className="input" value={form.email} onChange={handleChange} required />
      <input name="dni" placeholder="DNI" className="input" value={form.dni} onChange={handleChange} required />
      <input name="first_name" placeholder="Nombre" className="input" value={form.first_name} onChange={handleChange} required />
      <input name="last_name" placeholder="Apellido" className="input" value={form.last_name} onChange={handleChange} required />
      <select name="type" value={form.type} onChange={handleChange} className="input" required>
        <option value="alumno">Alumno</option>
        <option value="admin">Admin</option>
      </select>
      {!initialData.id && (
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="input"
          value={form.password}
          onChange={handleChange}
          required
        />
      )}
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
    </form>
  );
}