import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const [totalChildren, setTotalChildren] = useState(0);
  const [pendingRegistrations, setPendingRegistrations] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setTotalChildren(30);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 w-full h-full bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 text-center">Panel de Administración</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          <NavLink to="/rep_Asistencia" className="bg-blue-50 p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h4 className="text-lg font-semibold text-gray-700 mt-4">Asistencia Rep</h4>
          </NavLink>

          {/* Botón: Gestionar Inscripciones */}
          <NavLink to="/reportpago" className="bg-yellow-50 p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-yellow-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h4 className="text-lg font-semibold text-gray-700 mt-4">Inscripciones</h4>
          </NavLink>

          {/* Botón: Asistencia */}
          <NavLink to="/reportpago" className="bg-purple-50 p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-purple-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <h4 className="text-lg font-semibold text-gray-700 mt-4">Pago Rep</h4>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
