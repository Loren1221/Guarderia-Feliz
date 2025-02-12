


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/Client";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/Layout";

const AdminEvents = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    description: "",
  });

  const [events, setEvents] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("Events").select("*");
      if (error) {
        console.error("Error fetching events:", error);
        toast.error("Error al cargar los eventos");
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      let { data, error } = editingId
        ? await supabase
            .from("Events")
            .update({
              name: formData.name,
              location: formData.location,
              date: formData.date,
              description: formData.description,
            })
            .eq("id", editingId)
            .select()
        : await supabase
            .from("Events")
            .insert({
              name: formData.name,
              location: formData.location,
              date: formData.date,
              description: formData.description,
            })
            .select();

      if (error) throw error;

      toast.success("Datos guardados exitosamente");

      const { data: updatedData, error: fetchError } = await supabase
        .from("Events")
        .select("*");

      if (fetchError) {
        console.error("Error fetching updated events:", fetchError);
        toast.error("Error al actualizar la lista de eventos");
      } else {
        setEvents(updatedData);
      }

      setFormData({
        name: "",
        location: "",
        date: "",
        description: "",
      });
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error inesperado:", err);
      toast.error("Error inesperado al guardar los datos");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      try {
        const { error } = await supabase.from("Events").delete().eq("id", id);

        if (error) throw error;

        toast.success("Datos eliminados exitosamente");

        const { data: updatedData, error: fetchError } = await supabase
          .from("Events")
          .select("*");

        if (fetchError) {
          console.error("Error fetching updated events:", fetchError);
          toast.error("Error al actualizar la lista de eventos");
        } else {
          setEvents(updatedData);
        }
      } catch (err) {
        console.error("Error inesperado:", err);
        toast.error("Error inesperado al eliminar los datos");
      }
    }
  };

  const handleEdit = (event) => {
    setFormData({
      name: event.name,
      location: event.location,
      date: event.date,
      description: event.description,
    });
    setEditingId(event.id);
    setShowForm(true);
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNewClick = () => {
    setShowForm(true);
    setEditingId(null); // Resetear la edición al crear un nuevo evento
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      name: "",
      location: "",
      date: "",
      description: "",
    });
    setEditingId(null);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
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

        {!showForm && (
          <div className="w-full max-w-4xl mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-700">Eventos Registrados</h2>
              <button
                onClick={handleNewClick}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon className="h-6 w-6 mr-2" />
                Nuevo
              </button>
            </div>

            <div className="mb-6">
              <input
                type="text"
                value={filter}
                onChange={handleFilterChange}
                placeholder="Buscar por nombre"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300 ease-in-out transform hover:scale-105"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                  <p className="text-gray-700 mt-2">{event.description}</p>
                  <p className="text-gray-600 mt-1">Ubicación: {event.location}</p>
                  <p className="text-gray-600 mt-1">Fecha: {event.date}</p>
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="inline-flex items-center p-2 border border-transparent text-base font-medium rounded-md shadow-sm text-yellow-600 hover:text-yellow-800 transition-colors duration-300"
                    >
                      <PencilIcon className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="inline-flex items-center p-2 border border-transparent text-base font-medium rounded-md shadow-sm text-red-600 hover:text-red-800 transition-colors duration-300"
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showForm && (
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-8">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
              {editingId ? "Editar Evento" : "Registrar Evento"}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-600"
                >
                  Ubicación
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-600"
                >
                  Fecha
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-600"
                >
                  Descripción
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  rows="4"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Enviando..."
                    : editingId
                    ? "Actualizar"
                    : "Registrar"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <XMarkIcon className="h-6 w-6 mr-2" />
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminEvents;
/*
import { supabase } from "../../supabase/Client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/Layout";

const AdminEvents = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    description: "",
  });

  const [events, setEvents] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Para el estado del tamaño del menú

  // Función para alternar el estado del menú
  const toggleMenuSize = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      let { data, error } = editingId
        ? await supabase
            .from("Events")
            .update({
              name: formData.name,
              location: formData.location,
              date: formData.date,
              description: formData.description,
            })
            .eq("id", editingId)
            .select()
        : await supabase
            .from("Events")
            .insert({
              name: formData.name,
              location: formData.location,
              date: formData.date,
              description: formData.description,
            })
            .select();

      if (error) throw error;

      toast.success("Datos guardados exitosamente");

      const { data: updatedData, error: fetchError } = await supabase
        .from("Events")
        .select("*");

      if (fetchError) {
        console.error("Error fetching updated events:", fetchError);
        toast.error("Error al actualizar la lista de eventos");
      } else {
        setEvents(updatedData);
      }

      setFormData({
        name: "",
        location: "",
        date: "",
        description: "",
      });
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error inesperado:", err);
      toast.error("Error inesperado al guardar los datos");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      try {
        const { error } = await supabase.from("Events").delete().eq("id", id);

        if (error) throw error;

        toast.success("Datos eliminados exitosamente");

        const { data: updatedData, error: fetchError } = await supabase
          .from("Events")
          .select("*");

        if (fetchError) {
          console.error("Error fetching updated events:", fetchError);
          toast.error("Error al actualizar la lista de eventos");
        } else {
          setEvents(updatedData);
        }
      } catch (err) {
        console.error("Error inesperado:", err);
        toast.error("Error inesperado al eliminar los datos");
      }
    }
  };

  const handleEdit = (event) => {
    setFormData({
      name: event.name,
      location: event.location,
      date: event.date,
      description: event.description,
    });
    setEditingId(event.id);
    setShowForm(true);
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNewClick = () => {
    setShowForm(true);
    setEditingId(null); // Resetear la edición al crear un nuevo evento
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      name: "",
      location: "",
      date: "",
      description: "",
    });
    setEditingId(null);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
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

        <div className={`transition-all duration-500 ${isMenuOpen ? 'w-full max-w-4xl' : 'w-80'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700">Eventos Registrados</h2>
            <button
              onClick={toggleMenuSize}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="h-6 w-6 mr-2" />
              {isMenuOpen ? "Reducir Menú" : "Ampliar Menú"}
            </button>
          </div>

        

        </div>
      </div>
    </Layout>
  );
};

export default AdminEvents;
*/