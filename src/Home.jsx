import NavBar from "./components/NavBar";

function Home () {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <NavBar/>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Bienvenido a la Aplicación</h1>
        <p className="text-gray-600 text-center">Esta es la página de inicio de tu aplicación.</p>
      </div>
    </div>
  );
}

export default Home;