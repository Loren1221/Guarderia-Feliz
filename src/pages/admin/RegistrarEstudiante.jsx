

import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/Client";
import Layout from "../../components/Layout";
import { jsPDF } from "jspdf";

const RegistrarEstudiante = () => {
  const [estudiante, setEstudiante] = useState({
    nombre: "",
    apellido: "",
    sexo_id: "", // Cambiado a solo el ID
    fecha_nacimiento: "",
    id_padre: "", // Cambiado a solo el ID
    direccion: "",
    telefono_contacto: "",
    alergias: "",
    observaciones: "",
    monto: "",
  });

  const [padres, setPadres] = useState([]);
  const [sexos, setSexos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch padres
        const { data: padresData, error: padresError } = await supabase
          .from("Users")
          .select("id, name, last_name");
        if (padresError) throw padresError;

        setPadres(padresData);

        // Fetch sexos
        const { data: sexosData, error: sexosError } = await supabase
          .from("Sexo")
          .select("id, name");
        if (sexosError) throw sexosError;

        setSexos(sexosData);
      } catch (error) {
        console.error("Error al cargar los datos:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEstudiante({ ...estudiante, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si hay campos vacíos (obligatorios)
    if (
      !estudiante.nombre ||
      !estudiante.apellido ||
      !estudiante.sexo_id ||
      !estudiante.fecha_nacimiento ||
      !estudiante.id_padre ||
      !estudiante.direccion ||
      !estudiante.monto
    ) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    try {
      // Intentar insertar los datos en la tabla 'Estudiantes'
      const { error } = await supabase.from("Estudiantes").insert({
        nombre: estudiante.nombre,
        apellido: estudiante.apellido,
        sexo_id: estudiante.sexo_id, // Enviar solo el ID
        fecha_nacimiento: estudiante.fecha_nacimiento,
        id_padre: estudiante.id_padre, // Enviar solo el ID
        direccion: estudiante.direccion,
        telefono_contacto: estudiante.telefono_contacto,
        alergias: estudiante.alergias,
        observaciones: estudiante.observaciones,
        monto: estudiante.monto,
      });

      if (error) throw error;

      alert("¡Estudiante registrado con éxito!");
      handleGenerateReceipt(); // Generar recibo después de registrar al estudiante
      handleCancel();
    } catch (error) {
      console.error("Error al registrar el estudiante:", error.message);
      alert("Hubo un error al registrar el estudiante.");
    }
  };

  const handleGenerateReceipt = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Recibo de Inscripción", 105, 10, null, null, "center");

    // Buscar el nombre del padre y el sexo seleccionado
    const padreSeleccionado = padres.find((padre) => padre.id === parseInt(estudiante.id_padre));
    const sexoSeleccionado = sexos.find((sexo) => sexo.id === parseInt(estudiante.sexo_id));

    doc.setFontSize(12);
    doc.text(`Nombre del Estudiante: ${estudiante.nombre} ${estudiante.apellido}`, 20, 30);
    doc.text(`Fecha de Nacimiento: ${estudiante.fecha_nacimiento}`, 20, 40);
    doc.text(`Sexo: ${sexoSeleccionado ? sexoSeleccionado.name : ""}`, 20, 50);
    doc.text(`Nombre del Padre: ${padreSeleccionado ? `${padreSeleccionado.name} ${padreSeleccionado.last_name}` : ""}`, 20, 60);
    doc.text(`Dirección: ${estudiante.direccion}`, 20, 70);
    doc.text(`Teléfono de Contacto: ${estudiante.telefono_contacto}`, 20, 80);
    doc.text(`Alergias: ${estudiante.alergias}`, 20, 90);
    doc.text(`Observaciones: ${estudiante.observaciones}`, 20, 100);
    doc.text(`Monto de Inscripción: $${estudiante.monto}`, 20, 110);

    // Guardar el PDF
    doc.save(`recibo_inscripcion_${estudiante.nombre}_${estudiante.apellido}.pdf`);
  };

  const handleCancel = () => {
    setEstudiante({
      nombre: "",
      apellido: "",
      sexo_id: "",
      fecha_nacimiento: "",
      id_padre: "",
      direccion: "",
      telefono_contacto: "",
      alergias: "",
      observaciones: "",
      monto: "",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Registrar Estudiante
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Ingrese el nombre del niño"
                value={estudiante.nombre}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="apellido" className="text-sm font-medium text-gray-700">
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                placeholder="Ingrese el apellido del niño"
                value={estudiante.apellido}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="sexo_id" className="text-sm font-medium text-gray-700">
                Sexo
              </label>
              <select
                id="sexo_id"
                name="sexo_id"
                value={estudiante.sexo_id}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Seleccione el sexo</option>
                {sexos.map((sexo) => (
                  <option key={sexo.id} value={sexo.id}>
                    {sexo.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label htmlFor="fecha_nacimiento" className="text-sm font-medium text-gray-700">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                value={estudiante.fecha_nacimiento}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="id_padre" className="text-sm font-medium text-gray-700">
                Seleccionar Padre
              </label>
              <select
                id="id_padre"
                name="id_padre"
                value={estudiante.id_padre}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Seleccione un padre</option>
                {padres.map((padre) => (
                  <option key={padre.id} value={padre.id}>
                    {padre.name} {padre.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="direccion" className="text-sm font-medium text-gray-700">
                Dirección
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                placeholder="Ingrese la dirección del niño"
                value={estudiante.direccion}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label htmlFor="telefono_contacto" className="text-sm font-medium text-gray-700">
                Teléfono de Contacto
              </label>
              <input
                type="text"
                id="telefono_contacto"
                name="telefono_contacto"
                placeholder="Teléfono de contacto del niño"
                value={estudiante.telefono_contacto}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="alergias" className="text-sm font-medium text-gray-700">
                Alergias
              </label>
              <input
                type="text"
                id="alergias"
                name="alergias"
                placeholder="Ingrese alergias conocidas"
                value={estudiante.alergias}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="observaciones" className="text-sm font-medium text-gray-700">
                Observaciones
              </label>
              <textarea
                id="observaciones"
                name="observaciones"
                placeholder="Ingrese observaciones adicionales"
                value={estudiante.observaciones}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="monto" className="text-sm font-medium text-gray-700">
              Monto
            </label>
            <input
              type="number"
              id="monto"
              name="monto"
              placeholder="Ingrese el monto"
              value={estudiante.monto}
              onChange={handleInputChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Registrar Estudiante
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default RegistrarEstudiante;