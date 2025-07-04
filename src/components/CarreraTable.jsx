export default function CarreraTable({ carreras }) {
  return (
    <table className="min-w-full bg-white rounded shadow">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Nombre</th>
          <th className="px-4 py-2">Usuarios inscriptos</th>
        </tr>
      </thead>
      <tbody>
        {carreras.map((c) => (
          <tr key={c.id} className="border-t">
            <td className="px-4 py-2">{c.id}</td>
            <td className="px-4 py-2">{c.nombre}</td>
            <td className="px-4 py-2">{c.users?.length || 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
