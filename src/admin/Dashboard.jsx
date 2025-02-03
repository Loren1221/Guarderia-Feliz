// Dashboard.jsx
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  // Estado de la guardería
  const [totalChildren, setTotalChildren] = useState(0);
  const [availableSpaces, setAvailableSpaces] = useState(10); // Supongamos que hay 10 espacios disponibles
  const [pendingRegistrations, setPendingRegistrations] = useState(3); // Ejemplo de inscripciones pendientes
  const [isMobile, setIsMobile] = useState(false); // Estado para saber si la pantalla es móvil

  useEffect(() => {
    // Aquí podrías hacer una llamada a tu API para obtener datos reales, por ahora se simulan
    setTotalChildren(30);

    // Detectar el tamaño de la pantalla y ajustarlo según sea necesario
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Detectar si es móvil (puedes ajustar el tamaño)
    };

    // Añadir evento para el cambio de tamaño de la pantalla
    window.addEventListener("resize", handleResize);

    // Llamar la función de tamaño al cargar
    handleResize();

    // Limpiar el evento al desmontar el componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    
    
      <div className="flex flex-col gap-4 p-6 w-full h-full">
        {/* Resumen de la guardería */}
        <div
          className={`bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-4 ${
            isMobile ? "flex flex-col items-center" : ""
          }`}
        >
          {/* Total de niños inscritos */}
          <div className="bg-green-300 text-green-500 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold">Niños Inscritos</h3>
            <p className="text-3xl font-bold">{totalChildren}</p>
          </div>

          {/* Espacios disponibles */}
          <div className="bg-blue-300 text-blue-500 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold">Espacios Disponibles</h3>
            <p className="text-3xl font-bold">{availableSpaces}</p>
          </div>

          {/* Inscripciones pendientes */}
          <div className="bg-yellow-300 text-yellow-500 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold">Inscripciones Pendientes</h3>
            <p className="text-3xl font-bold">{pendingRegistrations}</p>
          </div>
        </div>

        {/* Atajos para administración */}
        <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
          <h3 className="text-lg font-semibold">Accesos Rápidos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Botón para ver niños */}
            <div className="bg-blue-500 text-white p-4 rounded-lg text-center cursor-pointer hover:bg-blue-600">
              <h4 className="text-lg">Ver Lista de Niños</h4>
            </div>

            {/* Botón para gestionar inscripciones */}
            <div className="bg-yellow-500 text-white p-4 rounded-lg text-center cursor-pointer hover:bg-yellow-600">
              <h4 className="text-lg">Gestionar Inscripciones</h4>
            </div>

            {/* Botón para gestionar horarios */}
            <div className="bg-green-500 text-white p-4 rounded-lg text-center cursor-pointer hover:bg-green-600">
              <h4 className="text-lg">Gestionar Horarios</h4>
            </div>

            {/* Botón para ver reportes */}
            <div className="bg-purple-500 text-white p-4 rounded-lg text-center cursor-pointer hover:bg-purple-600">
              <h4 className="text-lg">Asistencia</h4>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Dashboard;
