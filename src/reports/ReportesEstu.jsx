
import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/Client";
import Layout from "../components/Layout";
import { jsPDF } from "jspdf";

const ReportesEstu = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const { data, error } = await supabase
          .from("Estudiantes")
          .select("nombre, apellido, fecha_nacimiento, direccion, telefono_contacto, alergias, observaciones, monto, sexo_id, id_padre");
        
        if (error) throw error;
        setEstudiantes(data);
      } catch (error) {
        console.error("Error al cargar los datos de estudiantes:", error.message);
      }
    };

    fetchEstudiantes();
  }, []);

  const handleGenerateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Reporte de Estudiantes", 105, 10, null, null, "center");
    doc.setFontSize(10);

    doc.autoTable({
      head: [["Nombre", "Apellido", "Fecha de Nacimiento", "Dirección", "Teléfono", "Alergias", "Observaciones", "Monto"]],
      body: estudiantes.map(est => [
        est.nombre,
        est.apellido,
        est.fecha_nacimiento,
        est.direccion,
        est.telefono_contacto,
        est.alergias,
        est.observaciones,
        `$${est.monto}`
      ]),
    });

    doc.save("reporte_estudiantes.pdf");
  };

  const filteredEstudiantes = estudiantes.filter(est =>
    `${est.nombre} ${est.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg relative">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Reporte de Estudiantes</h2>
        <div className="absolute top-4 right-4">
          <button
            onClick={handleGenerateReport}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Descargar PDF
          </button>
        </div>
        <input
          type="text"
          placeholder="Buscar estudiante..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Nombre</th>
                <th className="px-4 py-2 border">Apellido</th>
                <th className="px-4 py-2 border">Fecha de Nacimiento</th>
                <th className="px-4 py-2 border">Dirección</th>
                <th className="px-4 py-2 border">Teléfono</th>
                <th className="px-4 py-2 border">Alergias</th>
                <th className="px-4 py-2 border">Observaciones</th>
                <th className="px-4 py-2 border">Monto</th>
              </tr>
            </thead>
            <tbody>
              {filteredEstudiantes.map((est, index) => (
                <tr key={index} className="text-center border">
                  <td className="px-4 py-2 border">{est.nombre}</td>
                  <td className="px-4 py-2 border">{est.apellido}</td>
                  <td className="px-4 py-2 border">{est.fecha_nacimiento}</td>
                  <td className="px-4 py-2 border">{est.direccion}</td>
                  <td className="px-4 py-2 border">{est.telefono_contacto}</td>
                  <td className="px-4 py-2 border">{est.alergias}</td>
                  <td className="px-4 py-2 border">{est.observaciones}</td>
                  <td className="px-4 py-2 border">${est.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ReportesEstu;

