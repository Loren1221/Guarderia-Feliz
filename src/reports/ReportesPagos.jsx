

// import React, { useState, useEffect } from "react";
// import { supabase } from "../supabase/Client";
// import Layout from "../components/Layout";
// import { FaSearch, FaCalendar } from "react-icons/fa";
// import dayjs from "dayjs";

// const ReportesCobros = () => {
//   const [cobros, setCobros] = useState([]);
//   const [search, setSearch] = useState("");
//   const [mes, setMes] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchCobros = async () => {
//       setLoading(true);
//       try {
//         let query = supabase
//           .from("Cobros")
//           .select("id, monto, fecha_pago, id_estudiante, id_padre");

//         // Aplicar filtro por mes si existe
//         if (mes) {
//           const inicioMes = dayjs(mes).startOf("month").format("YYYY-MM-DD");
//           const finMes = dayjs(mes).endOf("month").format("YYYY-MM-DD");
//           query = query.gte("fecha_pago", inicioMes).lte("fecha_pago", finMes);
//         }

//         const { data, error } = await query;
//         if (error) throw error;
//         setCobros(data);
//       } catch (error) {
//         console.error("Error al obtener los cobros:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCobros();
//   }, [mes]);

//   // Filtrar cobros por ID de estudiante (simulación, necesita nombre real)
//   const filteredCobros = cobros.filter((cobro) =>
//     cobro.id_estudiante.toString().includes(search)
//   );

//   return (
//     <Layout>
//       <div className="max-w-6xl mx-auto mt-8 p-6 bg-white shadow-xl rounded-lg border border-gray-200">
//         <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//           Reportes de Cobros
//         </h2>

//         {/* Filtros de búsqueda */}
//         <div className="mb-6 flex flex-col md:flex-row gap-4">
//           {/* Barra de búsqueda por estudiante */}
//           <div className="flex items-center border-b-2 border-gray-300 flex-1">
//             <FaSearch className="text-gray-600 mr-3 text-lg" />
//             <input
//               type="text"
//               placeholder="Buscar por ID de estudiante..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
//             />
//           </div>

//           {/* Filtro por mes */}
//           <div className="flex items-center border-b-2 border-gray-300">
//             <FaCalendar className="text-gray-600 mr-3 text-lg" />
//             <input
//               type="month"
//               value={mes}
//               onChange={(e) => setMes(e.target.value)}
//               className="py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
//             />
//           </div>
//         </div>

//         {/* Tabla de cobros */}
//         {loading ? (
//           <p className="text-center text-gray-600">Cargando cobros...</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white">
//               <thead>
//                 <tr>
//                   <th className="py-3 px-6 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">
//                     Fecha de Cobro
//                   </th>
//                   <th className="py-3 px-6 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">
//                     ID Estudiante
//                   </th>
//                   <th className="py-3 px-6 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">
//                     ID Padre
//                   </th>
//                   <th className="py-3 px-6 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">
//                     Monto
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredCobros.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="py-4 px-6 text-center text-gray-600">
//                       No se encontraron cobros.
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredCobros.map((cobro) => (
//                     <tr key={cobro.id} className="hover:bg-gray-50">
//                       <td className="py-4 px-6 border-b border-gray-200 text-sm text-gray-700">
//                         {dayjs(cobro.fecha_pago).format("DD/MM/YYYY")}
//                       </td>
//                       <td className="py-4 px-6 border-b border-gray-200 text-sm text-gray-700">
//                         {cobro.id_estudiante}
//                       </td>
//                       <td className="py-4 px-6 border-b border-gray-200 text-sm text-gray-700">
//                         {cobro.id_padre}
//                       </td>
//                       <td className="py-4 px-6 border-b border-gray-200 text-sm text-gray-700">
//                         ${cobro.monto}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default ReportesCobros;
import React, { useState, useEffect } from "react";
 import { supabase } from "../supabase/Client";
 import Layout from "../components/Layout";
import dayjs from "dayjs";

const ReportePagos = () => {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mes, setMes] = useState(dayjs().format("YYYY-MM"));
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPagos = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("Cobros")
          .select("id, estudiante_id, monto, fecha_pago") // Verifica si "estudiante_id" es el nombre correcto
          .gte("fecha_pago", `${mes}-01`)
          .lt("fecha_pago", dayjs(mes).add(1, "month").format("YYYY-MM-DD"));

        if (error) throw error;
        setPagos(data);
      } catch (error) {
        console.error("Error al obtener los pagos:", error.message);
        setError("Hubo un error al obtener los pagos. Por favor, intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchPagos();
  }, [mes]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-xl rounded-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Reporte de Pagos Mensuales
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">Seleccionar mes:</label>
          <input 
            type="month" 
            value={mes} 
            onChange={(e) => setMes(e.target.value)} 
            className="mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {loading ? (
          <p className="text-center text-gray-600">Cargando...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : pagos.length === 0 ? (
          <p className="text-center text-gray-600">No hay pagos registrados en este mes.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-3">ID</th>
                <th className="border border-gray-300 p-3">Estudiante</th>
                <th className="border border-gray-300 p-3">Monto</th>
                <th className="border border-gray-300 p-3">Fecha de Pago</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map((pago) => (
                <tr key={pago.id} className="text-center">
                  <td className="border border-gray-300 p-3">{pago.id}</td>
                  <td className="border border-gray-300 p-3">{pago.estudiante_id || "N/A"}</td>
                  <td className="border border-gray-300 p-3">${pago.monto}</td>
                  <td className="border border-gray-300 p-3">{pago.fecha_pago}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default ReportePagos;
