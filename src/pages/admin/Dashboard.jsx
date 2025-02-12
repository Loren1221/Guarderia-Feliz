// // Dashboard.jsx
// import React, { useState, useEffect } from "react";

// const Dashboard = () => {
//   // Estado de la guardería
//   const [totalChildren, setTotalChildren] = useState(0);
//   const [availableSpaces, setAvailableSpaces] = useState(10); // Supongamos que hay 10 espacios disponibles
//   const [pendingRegistrations, setPendingRegistrations] = useState(3); // Ejemplo de inscripciones pendientes
//   const [isMobile, setIsMobile] = useState(false); // Estado para saber si la pantalla es móvil

//   useEffect(() => {
//     // Aquí podrías hacer una llamada a tu API para obtener datos reales, por ahora se simulan
//     setTotalChildren(30);

//     // Detectar el tamaño de la pantalla y ajustarlo según sea necesario
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768); // Detectar si es móvil (puedes ajustar el tamaño)
//     };

//     // Añadir evento para el cambio de tamaño de la pantalla
//     window.addEventListener("resize", handleResize);

//     // Llamar la función de tamaño al cargar
//     handleResize();

//     // Limpiar el evento al desmontar el componente
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
    
    
//       <div className="flex flex-col gap-4 p-6 w-full h-full">
//         {/* Resumen de la guardería */}
//         <div
//           className={`bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-4 ${
//             isMobile ? "flex flex-col items-center" : ""
//           }`}
//         >
//           {/* Total de niños inscritos */}
//           <div className="bg-green-300 text-green-500 p-6 rounded-lg text-center">
//             <h3 className="text-lg font-semibold">Niños Inscritos</h3>
//             <p className="text-3xl font-bold">{totalChildren}</p>
//           </div>

//           {/* Espacios disponibles */}
//           <div className="bg-blue-300 text-blue-500 p-6 rounded-lg text-center">
//             <h3 className="text-lg font-semibold">Espacios Disponibles</h3>
//             <p className="text-3xl font-bold">{availableSpaces}</p>
//           </div>

//           {/* Inscripciones pendientes */}
//           <div className="bg-yellow-300 text-yellow-500 p-6 rounded-lg text-center">
//             <h3 className="text-lg font-semibold">Inscripciones Pendientes</h3>
//             <p className="text-3xl font-bold">{pendingRegistrations}</p>
//           </div>
//         </div>

//         {/* Atajos para administración */}
//         <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
//           <h3 className="text-lg font-semibold">Accesos Rápidos</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//             {/* Botón para ver niños */}
//             <div className="bg-blue-500 text-white p-4 rounded-lg text-center cursor-pointer hover:bg-blue-600">
//               <h4 className="text-lg">Ver Lista de Niños</h4>
//             </div>

//             {/* Botón para gestionar inscripciones */}
//             <div className="bg-yellow-500 text-white p-4 rounded-lg text-center cursor-pointer hover:bg-yellow-600">
//               <h4 className="text-lg">Gestionar Inscripciones</h4>
//             </div>

//             {/* Botón para gestionar horarios */}
//             <div className="bg-green-500 text-white p-4 rounded-lg text-center cursor-pointer hover:bg-green-600">
//               <h4 className="text-lg">Gestionar Horarios</h4>
//             </div>

//             {/* Botón para ver reportes */}
//             <div className="bg-purple-500 text-white p-4 rounded-lg text-center cursor-pointer hover:bg-purple-600">
//               <h4 className="text-lg">Asistencia</h4>
//             </div>
//           </div>
//         </div>
//       </div>
    
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  // Estado de la guardería
  const [totalChildren, setTotalChildren] = useState(0);
  const [pendingRegistrations, setPendingRegistrations] = useState(3); // Inscripciones pendientes
  const [isMobile, setIsMobile] = useState(false); // Estado para detectar si es móvil

  useEffect(() => {
    // Simulación de datos (puedes reemplazar con una llamada a la API)
    setTotalChildren(30);

    // Detectar el tamaño de la pantalla
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Ajustar el tamaño para móvil
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Llamar al cargar

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 w-full h-full bg-gray-50">
      {/* Título del Dashboard */}
      <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>

      {/* Resumen de la guardería */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarjeta: Niños Inscritos */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Niños Inscritos</h3>
              <p className="text-3xl font-bold text-gray-900">{totalChildren}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Tarjeta: Inscripciones Pendientes */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Inscripciones Pendientes</h3>
              <p className="text-3xl font-bold text-gray-900">{pendingRegistrations}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Atajos para administración */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Accesos Rápidos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Botón: Ver Lista de Niños */}
          <div className="bg-blue-50 p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <h4 className="text-lg font-semibold text-gray-700 mt-4">Lista de Niños</h4>
          </div>

          {/* Botón: Gestionar Inscripciones */}
          <div className="bg-yellow-50 p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-yellow-100 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h4 className="text-lg font-semibold text-gray-700 mt-4">Inscripciones</h4>
          </div>

          {/* Botón: Asistencia */}
          <div className="bg-purple-50 p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-purple-100 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <h4 className="text-lg font-semibold text-gray-700 mt-4">Asistencia</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;