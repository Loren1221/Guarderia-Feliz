// import React, { useState, useEffect } from "react";
// import { supabase } from "../supabase/Client";
// import Layout from "../components/Layout";
// import { jsPDF } from "jspdf";

// const ReportesEstu = () => {
//   const [estudiantes, setEstudiantes] = useState([]);

//   useEffect(() => {
//     const fetchEstudiantes = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("Estudiantes")
//           .select("nombre, apellido, fecha_nacimiento, direccion, telefono_contacto, alergias, observaciones, monto, sexo_id, id_padre");
        
//         if (error) throw error;
//         setEstudiantes(data);
//       } catch (error) {
//         console.error("Error al cargar los datos de estudiantes:", error.message);
//       }
//     };

//     fetchEstudiantes();
//   }, []);

//   const handleGenerateReport = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(20);
//     doc.text("Reporte de Estudiantes", 105, 10, null, null, "center");
//     doc.setFontSize(12);

//     let y = 20;
//     estudiantes.forEach((estudiante, index) => {
//       doc.text(`Estudiante ${index + 1}:`, 10, y);
//       doc.text(`Nombre: ${estudiante.nombre} ${estudiante.apellido}`, 20, y + 10);
//       doc.text(`Fecha de Nacimiento: ${estudiante.fecha_nacimiento}`, 20, y + 20);
//       doc.text(`Dirección: ${estudiante.direccion}`, 20, y + 30);
//       doc.text(`Teléfono: ${estudiante.telefono_contacto}`, 20, y + 40);
//       doc.text(`Alergias: ${estudiante.alergias}`, 20, y + 50);
//       doc.text(`Observaciones: ${estudiante.observaciones}`, 20, y + 60);
//       doc.text(`Monto: $${estudiante.monto}`, 20, y + 70);
//       doc.line(10, y + 75, 200, y + 75);
//       y += 85;
//     });

//     doc.save("reporte_estudiantes.pdf");
//   };

//   return (
//     <Layout>
//       <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Reporte de Estudiantes</h2>
//         <button
//           onClick={handleGenerateReport}
//           className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
//         >
//           Generar Reporte PDF
//         </button>
//       </div>
//     </Layout>
//   );
// };

// export default ReportesEstu;
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


/*
import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/Client";
import Layout from "../components/Layout";

const ReportesEstu = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const { data: estudiantesData, error } = await supabase
          .from("Estudiantes")
          .select("*");

        if (error) throw error;
        setEstudiantes(estudiantesData || []);
      } catch (error) {
        console.error("Error al cargar los estudiantes:", error.message);
      }
    };

    fetchEstudiantes();
  }, []);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Reporte Estudiantes 
        </h2>

        <input
          type="text"
          placeholder="Buscar estudiante..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
        />

        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Sexo</th>
              <th className="px-4 py-2 text-left">Fecha Nacimiento</th>
              <th className="px-4 py-2 text-left">Teléfono</th>
              <th className="px-4 py-2 text-left">Dirección</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.filter(est => est.nombre.toLowerCase().includes(search.toLowerCase())).map((estudiante) => (
              <tr key={estudiante.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{estudiante.id}</td>
                <td className="px-4 py-2">{`${estudiante.nombre} ${estudiante.apellido}`}</td>
                <td className="px-4 py-2">{estudiante.sexo}</td>
                <td className="px-4 py-2">{estudiante.fecha_nacimiento}</td>
                <td className="px-4 py-2">{estudiante.telefono_contacto}</td>
                <td className="px-4 py-2">{estudiante.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ReportesEstu;
*/