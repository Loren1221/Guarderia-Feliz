import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/Client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  InformationCircleIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const Actividades = () => {
  const [reservationFormData, setReservationFormData] = useState({
    id_instalacion: "",
    fecha_inicio: "",
    fecha_fin: "",
  });

  const [installations, setInstallations] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedInstallation, setSelectedInstallation] = useState(null);
  const [filter, setFilter] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    fetchInstallations();
  }, []);

  const fetchInstallations = async () => {
    const { data, error } = await supabase.from("Enclosures").select("*");
    if (error) {
      console.error("Error fetching installations:", error);
      toast.error("Error al cargar las instalaciones");
    } else {
      setInstallations(data);
    }
  };

  const handleReservationChange = (event) => {
    const { name, value } = event.target;
    setReservationFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const installationDetails = installations.find(
        (inst) => inst.id === reservationFormData.id_instalacion
      );

      if (!installationDetails) {
        toast.error("Instalación no encontrada");
        setIsSubmitting(false);
        return;
      }

      const { data, error } = await supabase.from("Reservation").insert({
        id_instalacion: reservationFormData.id_instalacion,
        fecha_inicio: reservationFormData.fecha_inicio,
        fecha_fin: reservationFormData.fecha_fin,
        id_usuario: "user-id",
        capacidad: installationDetails.capasity,
        estado_reserva: "Pendiente",
      });

      if (error) {
        console.error("Error inserting reservation:", error);
        toast.error("Error al hacer la reserva");
      } else {
        toast.success("Reserva realizada exitosamente");
        setReservationFormData({
          id_instalacion: "",
          fecha_inicio: "",
          fecha_fin: "",
        });
        setSelectedInstallation(null);
        fetchInstallations();
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Error inesperado al hacer la reserva");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredInstallations = installations.filter((instalacion) =>
    instalacion.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleShowReservationDetails = async (instalacionId) => {
    const { data, error } = await supabase
      .from("Reservacion")
      .select("*")
      .eq("id_instalacion", instalacionId);

    if (error) {
      console.error("Error fetching reservation details:", error);
      toast.error("Error al cargar los detalles de la reserva");
    } else {
      setSelectedReservation(data);
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-8 border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Buscar Instalaciones
        </h2>
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Buscar por nombre"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Instalaciones Disponibles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstallations.map((instalacion) => (
            <div
              key={instalacion.id}
              className="bg-white p-6 rounded-lg shadow-lg relative border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {instalacion.name}
              </h3>
              <p className="text-gray-700 mt-2">{instalacion.descriptin}</p>
              <p className="text-gray-600 mt-1">
                Capacidad: {instalacion.capasity}
              </p>
              <div className="flex justify-between items-center mt-4">
                <motion.button
                  onClick={() => setSelectedInstallation(instalacion.id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Reservar
                </motion.button>
                <button
                  onClick={() => handleShowReservationDetails(instalacion.id)}
                  className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
                >
                  <InformationCircleIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedInstallation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative border border-gray-300">
            <button
              onClick={() => setSelectedInstallation(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Por favor ingrese estos datos
            </h2>
            <form onSubmit={handleReservationSubmit} className="space-y-4">
              <input
                type="hidden"
                name="id_instalacion"
                value={selectedInstallation}
              />
              <div>
                <label
                  htmlFor="fecha_inicio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de Inicio
                </label>
                <input
                  type="date"
                  name="fecha_inicio"
                  id="fecha_inicio"
                  value={reservationFormData.fecha_inicio}
                  onChange={handleReservationChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="fecha_fin"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de Fin
                </label>
                <input
                  type="date"
                  name="fecha_fin"
                  id="fecha_fin"
                  value={reservationFormData.fecha_fin}
                  onChange={handleReservationChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? "Reservando..." : "Reservar"}
              </motion.button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Actividades;
