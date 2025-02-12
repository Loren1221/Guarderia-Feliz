
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/Client";
import Layout from "../../components/Layout";

const RegistrarEmpleado = () => {
  // Estado para los datos del empleado
  const [empleado, setEmpleado] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    puesto: "",
    fecha_contratacion: "",
  });

  // Estado para los puestos (cargar desde la tabla Puesto)
  const [puestos, setPuestos] = useState([]);

  // Cargar los puestos desde la tabla `Puesto` en Supabase
  useEffect(() => {
    const fetchPuestos = async () => {
      const { data, error } = await supabase.from("Puesto").select("name");
      if (error) {
        console.error("Error al cargar los puestos:", error.message);
      } else {
        setPuestos(data);
      }
    };
    fetchPuestos();
  }, []);

  // Manejo de cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmpleado({ ...empleado, [name]: value });
  };

  // Enviar el formulario y registrar al empleado
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Insertar el empleado en la tabla `Empleados`
      const { error: insertError } = await supabase.from("Empleados").insert({
        cedula: empleado.cedula,
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        telefono: empleado.telefono,
        email: empleado.email,
        puesto: empleado.puesto,
        fecha_contratacion: empleado.fecha_contratacion,
      });

      if (insertError) {
        console.error("Error al insertar empleado:", insertError.message);
        throw insertError;
      }

      alert("¡Empleado registrado con éxito!");
      // Limpiar el formulario
      setEmpleado({
        cedula: "",
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        puesto: "",
        fecha_contratacion: "",
      });
    } catch (error) {
      console.error("Error al registrar el empleado:", error.message);
      alert("Hubo un error al registrar el empleado.");
    }
  };

  return (
    <Layout>
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Registrar Empleado
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="cedula" className="text-sm font-medium text-gray-700">
              Cédula
            </label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              placeholder="Ingrese la cédula"
              value={empleado.cedula}
              onChange={handleInputChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingrese el nombre"
              value={empleado.nombre}
              onChange={handleInputChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="apellido" className="text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              placeholder="Ingrese el apellido"
              value={empleado.apellido}
              onChange={handleInputChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="telefono" className="text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              placeholder="Ingrese el teléfono"
              value={empleado.telefono}
              onChange={handleInputChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ingrese el correo electrónico"
            value={empleado.email}
            onChange={handleInputChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="puesto" className="text-sm font-medium text-gray-700">
            Puesto
          </label>
          <select
            name="puesto"
            value={empleado.puesto}
            onChange={handleInputChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleccionar puesto</option>
            {puestos.map((puesto) => (
              <option key={puesto.name} value={puesto.name}>
                {puesto.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="fecha_contratacion" className="text-sm font-medium text-gray-700">
            Fecha de Contratación
          </label>
          <input
            type="date"
            id="fecha_contratacion"
            name="fecha_contratacion"
            value={empleado.fecha_contratacion}
            onChange={handleInputChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
        >
          Registrar Empleado
        </button>
      </form>
    </div>
    </Layout>
  );
};

export default RegistrarEmpleado;
