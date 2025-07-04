import { Link } from "react-router-dom";

export default function InscripcionTable({ inscripciones, onDelete }) {
  return (
    <table className="min-w-full bg-white rounded shadow mt-6">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="px-4 py-2">Usuario</th>
          <th className="px-4 py-2">Carrera</th>
          <th className="px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {inscripciones.map((insc) => (
          <tr key={`${insc.user_id}-${insc.carrera_id}`} className="border-t">
            <td className="px-4 py-2">{insc.usuario_nombre}</td>
            <td className="px-4 py-2">{insc.carrera_nombre}</td>
            <td className="px-4 py-2 flex gap-2">
              <Link
                to={`/inscripciones/editar/${insc.id}`}
                className="text-blue-600 hover:underline"
              >
                Editar
              </Link>
              <button
                onClick={() => onDelete(insc.id)}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
