import React, { useState, useEffect } from "react";
import { supabase } from "../services/supabase/Client";
import { jsPDF } from "jspdf";
import Layout from "../security/Layout";


const ReportesEstu = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        // Cargar los datos de la tabla "Estudiantes"
        const { data: estudiantesData, error } = await supabase
          .from("Estudiantes") // Suponiendo que tu tabla se llama "Estudiantes"
          .select("*");

        if (error) throw error;
        setEstudiantes(estudiantesData || []); // Manejar caso null
      } catch (error) {
        console.error("Error al cargar los estudiantes:", error.message);
      }
    };

    fetchEstudiantes();
  }, []);

  const handleDownload = (estudiante) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Reporte Detallado de Estudiante", 105, 10, null, null, "center");

    // Agregar los detalles del estudiante
    doc.setFontSize(12);
    doc.text(`ID Estudiante: ${estudiante.id || "N/A"}`, 20, 30);
    doc.text(`Nombre: ${estudiante.nombre || "N/A"}`, 20, 40);
    doc.text(`Apellido: ${estudiante.apellido || "N/A"}`, 20, 50);
    doc.text(`Sexo: ${estudiante.sexo || "N/A"}`, 20, 60);
    doc.text(`Fecha de Nacimiento: ${estudiante.fecha_nacimiento || "N/A"}`, 20, 70);
    doc.text(`Nombre del Padre/Tutor: ${estudiante.nombre_padre || "N/A"}`, 20, 80);
    doc.text(`Teléfono de Contacto: ${estudiante.telefono_contacto || "N/A"}`, 20, 90);
    doc.text(`Dirección: ${estudiante.direccion || "N/A"}`, 20, 100);
    doc.text(`Alergias: ${estudiante.alergias || "N/A"}`, 20, 110);
    doc.text(`Observaciones: ${estudiante.observaciones || "N/A"}`, 20, 120);
    doc.text(`Monto de Inscripción: $${estudiante.monto_inscripcion || "N/A"}`, 20, 130);
    doc.text(`Fecha de Inscripción: ${estudiante.fecha_inscripcion || "N/A"}`, 20, 140);

    doc.save(`reporte_${estudiante.id}.pdf`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar este estudiante?"
    );
    if (!confirmDelete) return;

    try {
      const { error } = await supabase.from("Estudiantes").delete().match({ id });
      if (error) throw error;
      setEstudiantes(estudiantes.filter((estudiante) => estudiante.id !== id));
      alert("Estudiante eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar el estudiante:", error.message);
      alert("Hubo un error al eliminar el estudiante.");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Estudiantes Registrados
        </h2>

        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Fecha Inscripción</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes && estudiantes.length > 0 ? (
              estudiantes.map((estudiante) => (
                <tr
                  key={estudiante.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{estudiante.id}</td>
                  <td className="px-4 py-2">{`${estudiante.nombre} ${estudiante.apellido}`}</td>
                  <td className="px-4 py-2">{estudiante.fecha_inscripcion}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleDownload(estudiante)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                      Descargar
                    </button>
                    <button
                      onClick={() => handleDelete(estudiante.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No hay estudiantes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ReportesEstu;
