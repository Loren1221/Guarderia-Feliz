// import React, { useState, useEffect } from "react";
// import { supabase } from "../../supabase/Client";
// import Layout from "../../components/Layout";
// import { FaMoneyBillWave } from "react-icons/fa";
// import { IoArrowBack } from "react-icons/io5";

// export default function Cobros() {
//   const [estudiantes, setEstudiantes] = useState([]);
//   const [selectedEstudiante, setSelectedEstudiante] = useState(null);
//   const [mes, setMes] = useState("");
//   const [monto, setMonto] = useState(0);
//   const [estadoPagoId, setEstadoPagoId] = useState(null);
//   const [estadosPago, setEstadosPago] = useState([]);
//   const [pagos, setPagos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [activeTab, setActiveTab] = useState("no-pagados"); // Estado para controlar la pestaña activa

//   useEffect(() => {
//     fetchEstudiantes();
//     fetchEstadosPago();
//     fetchPagos();
//   }, []);

//   async function fetchEstudiantes() {
//     const { data, error } = await supabase.from("Estudiantes").select("id, nombre, apellido, monto");
//     if (error) {
//       alert("Error cargando estudiantes");
//     } else {
//       setEstudiantes(data);
//     }
//   }

//   async function fetchEstadosPago() {
//     const { data, error } = await supabase.from("EstadoPago").select("id, nombre");
//     if (!error) setEstadosPago(data);
//   }

//   async function fetchPagos() {
//     const { data, error } = await supabase.from("Cobros").select("estudiante_id, mes, estado_pago_id");
//     if (!error) setPagos(data);
//   }

//   function verificarEstadoPago(estudianteId) {
//     const pago = pagos.find((p) => p.estudiante_id === estudianteId && p.mes === mes);
//     return pago ? pago.estado_pago_id : null;
//   }

//   async function registrarPago() {
//     if (!selectedEstudiante || !mes || !monto || !estadoPagoId) return alert("Todos los campos son requeridos");

//     setLoading(true);
//     const { error } = await supabase.from("Cobros").insert([
//       {
//         estudiante_id: selectedEstudiante.id,
//         mes,
//         monto,
//         estado_pago_id: estadoPagoId,
//         fecha_pago: new Date().toISOString().split("T")[0],
//       },
//     ]);

//     if (!error) {
//       alert("Pago registrado con éxito");
//       fetchPagos();
//       setSelectedEstudiante(null);
//       setMes("");
//       setMonto(0);
//       setEstadoPagoId(null);
//     } else {
//       alert("Error registrando el pago");
//     }
//     setLoading(false);
//   }

//   // Filtrar estudiantes pagados y no pagados
//   const estudiantesPagados = estudiantes.filter((est) => {
//     const pago = pagos.find((p) => p.estudiante_id === est.id && p.mes === mes);
//     return pago && pago.estado_pago_id === 1; // Asumiendo que el estado 1 es "Pagado"
//   });

//   const estudiantesNoPagados = estudiantes.filter((est) => {
//     const pago = pagos.find((p) => p.estudiante_id === est.id && p.mes === mes);
//     return !pago || pago.estado_pago_id !== 1; // No tiene pago o no está pagado
//   });

//   return (
//     <Layout>
//       <div className="p-6 max-w-4xl mx-auto">
//         <h2 className="text-2xl font-bold text-center mb-6">Gestión de Pagos</h2>

//         {/* Selección de mes */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Seleccione el mes:</label>
//           <input
//             type="month"
//             className="w-full p-2 border rounded-lg"
//             value={mes}
//             onChange={(e) => setMes(e.target.value)}
//           />
//         </div>

//         {mes ? (
//           <>
//             <input
//               type="text"
//               className="w-full p-2 border rounded-lg mb-4"
//               placeholder="Buscar estudiante..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />

//             {/* Menú de pestañas */}
//             <div className="flex space-x-4 mb-4">
//               <button
//                 className={`px-4 py-2 rounded-lg ${activeTab === "no-pagados" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
//                 onClick={() => setActiveTab("no-pagados")}
//               >
//                 No Pagados
//               </button>
//               <button
//                 className={`px-4 py-2 rounded-lg ${activeTab === "pagados" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
//                 onClick={() => setActiveTab("pagados")}
//               >
//                 Pagados
//               </button>
//             </div>

//             {!selectedEstudiante ? (
//               <table className="w-full border-collapse border border-gray-300">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="border p-2">ID</th>
//                     <th className="border p-2">Nombre</th>
//                     <th className="border p-2">Acción</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {(activeTab === "no-pagados" ? estudiantesNoPagados : estudiantesPagados)
//                     .filter((est) =>
//                       `${est.nombre} ${est.apellido}`.toLowerCase().includes(search.toLowerCase())
//                     )
//                     .map((estudiante) => (
//                       <tr key={estudiante.id} className="text-center">
//                         <td className="border p-2">{estudiante.id}</td>
//                         <td className="border p-2">{estudiante.nombre} {estudiante.apellido}</td>
//                         <td className="border p-2">
//                           {activeTab === "no-pagados" ? (
//                             <button
//                               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
//                               onClick={() => {
//                                 setSelectedEstudiante(estudiante);
//                                 setMonto(estudiante.monto); // Asignar el monto del estudiante
//                               }}
//                             >
//                               <FaMoneyBillWave className="mr-2" /> Realizar Pago
//                             </button>
//                           ) : (
//                             <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Pagado</button>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="mt-6 p-4 border rounded-lg shadow-md">
//                 <div className="flex items-center">
//                   <button
//                     className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg flex items-center"
//                     onClick={() => setSelectedEstudiante(null)}
//                   >
//                     <IoArrowBack className="mr-2" /> Volver
//                   </button>
//                   <h3 className="text-xl font-bold ml-4">
//                     Registrar Pago para {selectedEstudiante.nombre} {selectedEstudiante.apellido}
//                   </h3>
//                 </div>
//                 <input
//                   className="w-full p-2 border rounded-lg mt-2"
//                   type="number"
//                   value={monto}
//                   onChange={(e) => setMonto(parseFloat(e.target.value))} // Permitir editar el monto
//                 />
//                 <select
//                   className="w-full p-2 border rounded-lg mt-2"
//                   value={estadoPagoId || ""}
//                   onChange={(e) => setEstadoPagoId(parseInt(e.target.value))}
//                 >
//                   <option value="">Seleccione un estado</option>
//                   {estadosPago.map((estado) => (
//                     <option key={estado.id} value={estado.id}>{estado.nombre}</option>
//                   ))}
//                 </select>
//                 <button
//                   className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mt-4"
//                   onClick={registrarPago}
//                   disabled={loading}
//                 >
//                   {loading ? "Guardando..." : "Registrar Pago"}
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <p className="text-center text-gray-500">Seleccione un mes para ver los pagos.</p>
//         )}
//       </div>
//     </Layout>
//   );
// }

import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/Client";
import Layout from "../../components/Layout";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { jsPDF } from "jspdf";

export default function Cobros() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [mes, setMes] = useState("");
  const [monto, setMonto] = useState(0);
  const [estadoPagoId, setEstadoPagoId] = useState(null);
  const [estadosPago, setEstadosPago] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("no-pagados"); // Estado para controlar la pestaña activa

  useEffect(() => {
    fetchEstudiantes();
    fetchEstadosPago();
    fetchPagos();
  }, []);

  async function fetchEstudiantes() {
    const { data, error } = await supabase.from("Estudiantes").select("id, nombre, apellido, monto");
    if (error) {
      alert("Error cargando estudiantes");
    } else {
      setEstudiantes(data);
    }
  }

  async function fetchEstadosPago() {
    const { data, error } = await supabase.from("EstadoPago").select("id, nombre");
    if (!error) setEstadosPago(data);
  }

  async function fetchPagos() {
    const { data, error } = await supabase.from("Cobros").select("estudiante_id, mes, estado_pago_id");
    if (!error) setPagos(data);
  }

  function verificarEstadoPago(estudianteId) {
    const pago = pagos.find((p) => p.estudiante_id === estudianteId && p.mes === mes);
    return pago ? pago.estado_pago_id : null;
  }

  async function registrarPago() {
    if (!selectedEstudiante || !mes || !monto || !estadoPagoId) return alert("Todos los campos son requeridos");

    setLoading(true);
    const { error } = await supabase.from("Cobros").insert([
      {
        estudiante_id: selectedEstudiante.id,
        mes,
        monto,
        estado_pago_id: estadoPagoId,
        fecha_pago: new Date().toISOString().split("T")[0],
      },
    ]);

    if (!error) {
      alert("Pago registrado con éxito");
      generarRecibo(); // Generar recibo después de registrar el pago
      fetchPagos();
      setSelectedEstudiante(null);
      setMes("");
      setMonto(0);
      setEstadoPagoId(null);
    } else {
      alert("Error registrando el pago");
    }
    setLoading(false);
  }

  // Función para generar el recibo
  const generarRecibo = () => {
    const doc = new jsPDF();

    // Configuración del diseño del recibo
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 128); // Azul marino
    doc.setFont("helvetica", "bold");
    doc.text("Guardería Los Pequeños Traviesos", 105, 20, null, null, "center");

    // Línea divisoria
    doc.setDrawColor(0, 0, 128); // Azul marino
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // Detalles del recibo
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Negro
    doc.setFont("helvetica", "normal");
    doc.text(`Recibo de Pago`, 20, 40);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 50);
    doc.text(`Nombre del Estudiante: ${selectedEstudiante.nombre} ${selectedEstudiante.apellido}`, 20, 60);
    doc.text(`Mes: ${mes}`, 20, 70);
    doc.text(`Monto: $${monto.toFixed(2)}`, 20, 80);

    // Línea divisoria
    doc.line(20, 85, 190, 85);

    // Información de la guardería
    doc.setFontSize(12);
    doc.text("Guardería Los Pequeños Traviesos", 20, 95);
    doc.text("Dirección: Calle Falsa 123, Ciudad, País", 20, 105);
    doc.text("Teléfono: +123 456 7890", 20, 115);
    doc.text("Email: info@guarderialospequeñostraviesos.com", 20, 125);

    // Espacio para el sello
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150); // Gris
    doc.text("Sello de la Guardería", 140, 140);
    doc.rect(140, 145, 40, 40); // Espacio para el sello

    // Espacio para la firma del padre
    doc.text("Firma del Padre/Madre o Tutor", 20, 160);
    doc.line(20, 165, 80, 165); // Línea para la firma

    // Mensaje de agradecimiento
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Negro
    doc.text("¡Gracias por confiar en nosotros!", 105, 180, null, null, "center");

    // Guardar el PDF
    doc.save(`recibo_${selectedEstudiante.nombre}_${mes}.pdf`);
  };

  // Filtrar estudiantes pagados y no pagados
  const estudiantesPagados = estudiantes.filter((est) => {
    const pago = pagos.find((p) => p.estudiante_id === est.id && p.mes === mes);
    return pago && pago.estado_pago_id === 1; // Asumiendo que el estado 1 es "Pagado"
  });

  const estudiantesNoPagados = estudiantes.filter((est) => {
    const pago = pagos.find((p) => p.estudiante_id === est.id && p.mes === mes);
    return !pago || pago.estado_pago_id !== 1; // No tiene pago o no está pagado
  });

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Gestión de Pagos</h2>

        {/* Selección de mes */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Seleccione el mes:</label>
          <input
            type="month"
            className="w-full p-2 border rounded-lg"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
          />
        </div>

        {mes ? (
          <>
            <input
              type="text"
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Buscar estudiante..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Menú de pestañas */}
            <div className="flex space-x-4 mb-4">
              <button
                className={`px-4 py-2 rounded-lg ${activeTab === "no-pagados" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                onClick={() => setActiveTab("no-pagados")}
              >
                No Pagados
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${activeTab === "pagados" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                onClick={() => setActiveTab("pagados")}
              >
                Pagados
              </button>
            </div>

            {!selectedEstudiante ? (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Nombre</th>
                    <th className="border p-2">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === "no-pagados" ? estudiantesNoPagados : estudiantesPagados)
                    .filter((est) =>
                      `${est.nombre} ${est.apellido}`.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((estudiante) => (
                      <tr key={estudiante.id} className="text-center">
                        <td className="border p-2">{estudiante.id}</td>
                        <td className="border p-2">{estudiante.nombre} {estudiante.apellido}</td>
                        <td className="border p-2">
                          {activeTab === "no-pagados" ? (
                            <button
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                              onClick={() => {
                                setSelectedEstudiante(estudiante);
                                setMonto(estudiante.monto); // Asignar el monto del estudiante
                              }}
                            >
                              <FaMoneyBillWave className="mr-2" /> Realizar Pago
                            </button>
                          ) : (
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Pagado</button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <div className="mt-6 p-4 border rounded-lg shadow-md">
                <div className="flex items-center">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg flex items-center"
                    onClick={() => setSelectedEstudiante(null)}
                  >
                    <IoArrowBack className="mr-2" /> Volver
                  </button>
                  <h3 className="text-xl font-bold ml-4">
                    Registrar Pago para {selectedEstudiante.nombre} {selectedEstudiante.apellido}
                  </h3>
                </div>
                <input
                  className="w-full p-2 border rounded-lg mt-2"
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(parseFloat(e.target.value))} // Permitir editar el monto
                />
                <select
                  className="w-full p-2 border rounded-lg mt-2"
                  value={estadoPagoId || ""}
                  onChange={(e) => setEstadoPagoId(parseInt(e.target.value))}
                >
                  <option value="">Seleccione un estado</option>
                  {estadosPago.map((estado) => (
                    <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                  ))}
                </select>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mt-4"
                  onClick={registrarPago}
                  disabled={loading}
                >
                  {loading ? "Guardando..." : "Registrar Pago"}
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">Seleccione un mes para ver los pagos.</p>
        )}
      </div>
    </Layout>
  );
}
