// import React, { useState, useEffect } from "react";
// import { supabase } from "../supabase/Client";
// import Layout from "../components/Layout";
// import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

// const ReporteAsistencia = () => {
//   const [fecha, setFecha] = useState("");
//   const [reporte, setReporte] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchReporte = async () => {
//       if (!fecha) return;
//       setLoading(true);
//       try {
//         const { data, error } = await supabase
//           .from("Asistencia")
//           .select("id_estudiante, estado, Estudiantes(nombre, apellido)")
//           .eq("fecha", fecha);
//         if (error) throw error;
//         setReporte(data);
//       } catch (error) {
//         console.error("Error al obtener el reporte:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReporte();
//   }, [fecha]);

//   const exportCSV = () => {
//     if (reporte.length === 0) {
//       alert("No hay datos para exportar.");
//       return;
//     }

//     const csvContent =
//       "Nombre,Apellido,Estado\n" +
//       reporte
//         .map((row) => `${row.Estudiantes.nombre},${row.Estudiantes.apellido},${row.estado}`)
//         .join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `reporte_asistencia_${fecha}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <Layout>
//       <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
//         <h2 className="text-xl font-bold text-gray-700 mb-4">Reporte de Asistencia</h2>

//         <div className="flex items-center space-x-4 mb-6">
//           <input
//             type="date"
//             value={fecha}
//             onChange={(e) => setFecha(e.target.value)}
//             className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={exportCSV}
//             className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition"
//           >
//             <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
//             Exportar CSV
//           </button>
//         </div>

//         {loading ? (
//           <p className="text-gray-600">Cargando datos...</p>
//         ) : reporte.length === 0 ? (
//           <p className="text-gray-600">No hay asistencia registrada para esta fecha.</p>
//         ) : (
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 p-3 text-left">Nombre</th>
//                 <th className="border border-gray-300 p-3 text-left">Apellido</th>
//                 <th className="border border-gray-300 p-3 text-left">Estado</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reporte.map((registro, index) => (
//                 <tr key={index} className="hover:bg-gray-100 transition">
//                   <td className="border border-gray-300 p-3">{registro.Estudiantes.nombre}</td>
//                   <td className="border border-gray-300 p-3">{registro.Estudiantes.apellido}</td>
//                   <td
//                     className={`border border-gray-300 p-3 font-semibold ${
//                       registro.estado === "presente" ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {registro.estado.charAt(0).toUpperCase() + registro.estado.slice(1)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default ReporteAsistencia;
import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/Client";
import Layout from "../components/Layout";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const ReporteAsistencia = () => {
  const [fecha, setFecha] = useState("");
  const [reporte, setReporte] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReporte = async () => {
      if (!fecha) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("Asistencia")
          .select("id_estudiante, estado, Estudiantes(nombre, apellido)")
          .eq("fecha", fecha);
        if (error) throw error;
        setReporte(data);
      } catch (error) {
        console.error("Error al obtener el reporte:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReporte();
  }, [fecha]);

  const exportCSV = () => {
    if (reporte.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    const csvContent =
      "Nombre,Apellido,Estado\n" +
      reporte
        .map((row) => `${row.Estudiantes.nombre},${row.Estudiantes.apellido},${row.estado}`)
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reporte_asistencia_${fecha}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📋 Reporte de Asistencia
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 mb-6">
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full md:w-auto"
          />
          <button
            onClick={exportCSV}
            className="bg-green-500 text-white px-5 py-3 rounded-lg flex items-center hover:bg-green-600 transition shadow-md"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Exportar CSV
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600 text-center text-lg animate-pulse">
            Cargando datos...
          </p>
        ) : reporte.length === 0 ? (
          <p className="text-gray-600 text-center text-lg">
            No hay asistencia registrada para esta fecha.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-500 text-white text-left">
                  <th className="p-4">Nombre</th>
                  <th className="p-4">Apellido</th>
                  <th className="p-4">Estado</th>
                </tr>
              </thead>
              <tbody>
                {reporte.map((registro, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100 transition"
                  >
                    <td className="p-4">{registro.Estudiantes.nombre}</td>
                    <td className="p-4">{registro.Estudiantes.apellido}</td>
                    <td
                      className={`p-4 font-semibold text-center ${
                        registro.estado === "presente"
                          ? "text-green-600 bg-green-100"
                          : "text-red-600 bg-red-100"
                      } rounded-lg`}
                    >
                      {registro.estado.charAt(0).toUpperCase() + registro.estado.slice(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReporteAsistencia;
