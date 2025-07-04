import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
    const [tipoUsuario, setTipoUsuario] = useState("");

    useEffect(() => {
        const storedTipoUsuario = localStorage.getItem("tipoUsuario");
        if (storedTipoUsuario) {
            setTipoUsuario(storedTipoUsuario);
        }
    }, []);

    return(
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">Inicio</Link>
                <div className="space-x-4">
                    {tipoUsuario === "admin" && (
                        <>
                            <Link to="/pagos" className="text-white">Pagos</Link>
                            <Link to="/usuarios" className="text-white">Usuarios</Link>
                        </>
                    )}
                    {tipoUsuario === "alumno" && (
                        <Link to="/perfil" className="text-white">Perfil</Link>
                    )}
                    <Link to="/login" className="text-white">Cerrar Sesión</Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;