// import React, { useState, useEffect } from "react";
// import { supabase } from "../../supabase/Client";
// import Layout from "../../components/Layout";
// import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

// const EstudianteItem = ({ estudiante, estado, onEstadoToggle }) => {
//   return (
//     <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm">
//       <span className="text-gray-800 font-medium">
//         {estudiante.nombre} {estudiante.apellido}
//       </span>
//       <label className="relative inline-flex items-center cursor-pointer">
//         <input
//           type="checkbox"
//           checked={estado === "presente"}
//           onChange={() => onEstadoToggle(estudiante.id)}
//           className="sr-only peer"
//         />
//         <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-5 peer-checked:after:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-red-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
//       </label>
//     </div>
//   );
// };

// const PasarLista = () => {
//   const [estudiantes, setEstudiantes] = useState([]);
//   const [asistencia, setAsistencia] = useState({});
//   const [fecha, setFecha] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchDatos = async () => {
//       if (!fecha) return;

//       try {
//         const { data: estudiantesData, error: estudiantesError } = await supabase
//           .from("Estudiantes")
//           .select("id, nombre, apellido");
//         if (estudiantesError) throw estudiantesError;

//         setEstudiantes(estudiantesData);

//         const { data: asistenciaData, error: asistenciaError } = await supabase
//           .from("Asistencia")
//           .select("id_estudiante, estado")
//           .eq("fecha", fecha);
//         if (asistenciaError) throw asistenciaError;

//         const asistenciaMap = {};
//         estudiantesData.forEach((estudiante) => {
//           asistenciaMap[estudiante.id] = asistenciaData.find(a => a.id_estudiante === estudiante.id)?.estado || "ausente";
//         });
//         setAsistencia(asistenciaMap);
//       } catch (error) {
//         console.error("Error al cargar datos:", error.message);
//       }
//     };

//     fetchDatos();
//   }, [fecha]);

//   const handleEstadoToggle = (idEstudiante) => {
//     setAsistencia((prev) => ({
//       ...prev,
//       [idEstudiante]: prev[idEstudiante] === "presente" ? "ausente" : "presente",
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!fecha) {
//       alert("Por favor, seleccione una fecha.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const registros = Object.entries(asistencia).map(([id_estudiante, estado]) => ({
//         fecha,
//         id_estudiante: parseInt(id_estudiante),
//         estado,
//       }));

//       const { error } = await supabase.from("Asistencia").upsert(registros, { onConflict: ["fecha", "id_estudiante"] });

//       if (error) throw error;
//       alert("¡Asistencia registrada/actualizada con éxito!");
//     } catch (error) {
//       console.error("Error al guardar la asistencia:", error.message);
//       alert("Hubo un error al guardar la asistencia.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className="max-w-6xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//         Pase De Lista 
//       </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex flex-col">
//             <label htmlFor="fecha" className="text-sm font-medium text-gray-700">Fecha</label>
//             <input
//               type="date"
//               id="fecha"
//               name="fecha"
//               value={fecha}
//               onChange={(e) => setFecha(e.target.value)}
//               className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {estudiantes.map((estudiante) => (
//               <EstudianteItem
//                 key={estudiante.id}
//                 estudiante={estudiante}
//                 estado={asistencia[estudiante.id]}
//                 onEstadoToggle={handleEstadoToggle}
//               />
//             ))}
//           </div>
//           <button
//             type="submit"
//             className={`${loading ? "bg-gray-400" : "bg-blue-500"} text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600`}
//             disabled={loading}
//           >
//             {loading ? "Guardando..." : "Guardar Asistencia"}
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default PasarLista;
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/Client";
import Layout from "../../components/Layout";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

const EstudianteItem = ({ estudiante, estado, onEstadoToggle }) => {
  return (
    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm">
      <span className="text-gray-800 font-medium">
        {estudiante.nombre} {estudiante.apellido}
      </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={estado === "presente"}
          onChange={() => onEstadoToggle(estudiante.id)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-5 peer-checked:after:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-red-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
      </label>
    </div>
  );
};

const PasarLista = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [asistencia, setAsistencia] = useState({});
  const [fecha, setFecha] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDatos = async () => {
      if (!fecha) return;

      try {
        const { data: estudiantesData, error: estudiantesError } = await supabase
          .from("Estudiantes")
          .select("id, nombre, apellido");
        if (estudiantesError) throw estudiantesError;

        setEstudiantes(estudiantesData);

        const { data: asistenciaData, error: asistenciaError } = await supabase
          .from("Asistencia")
          .select("id_estudiante, estado")
          .eq("fecha", fecha);
        if (asistenciaError) throw asistenciaError;

        const asistenciaMap = {};
        estudiantesData.forEach((estudiante) => {
          asistenciaMap[estudiante.id] = asistenciaData.find(a => a.id_estudiante === estudiante.id)?.estado || "ausente";
        });
        setAsistencia(asistenciaMap);
      } catch (error) {
        console.error("Error al cargar datos:", error.message);
      }
    };

    fetchDatos();
  }, [fecha]);

  const handleEstadoToggle = (idEstudiante) => {
    setAsistencia((prev) => ({
      ...prev,
      [idEstudiante]: prev[idEstudiante] === "presente" ? "ausente" : "presente",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fecha) {
      alert("Por favor, seleccione una fecha.");
      return;
    }
    setLoading(true);
    try {
      const registros = Object.entries(asistencia).map(([id_estudiante, estado]) => ({
        fecha,
        id_estudiante: parseInt(id_estudiante),
        estado,
      }));

      const { error } = await supabase.from("Asistencia").upsert(registros, { onConflict: ["fecha", "id_estudiante"] });

      if (error) throw error;
      alert("¡Asistencia registrada/actualizada con éxito!");
    } catch (error) {
      console.error("Error al guardar la asistencia:", error.message);
      alert("Hubo un error al guardar la asistencia.");
    } finally {
      setLoading(false);
    }
  };

  // Filtrar estudiantes presentes y ausentes
  const estudiantesPresentes = estudiantes.filter((estudiante) => asistencia[estudiante.id] === "presente");
  const estudiantesAusentes = estudiantes.filter((estudiante) => asistencia[estudiante.id] === "ausente");

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Pase De Lista
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="fecha" className="text-sm font-medium text-gray-700">Fecha</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Sección de estudiantes presentes */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-600">Estudiantes Presentes</h3>
            {estudiantesPresentes.length > 0 ? (
              estudiantesPresentes.map((estudiante) => (
                <EstudianteItem
                  key={estudiante.id}
                  estudiante={estudiante}
                  estado={asistencia[estudiante.id]}
                  onEstadoToggle={handleEstadoToggle}
                />
              ))
            ) : (
              <p className="text-gray-500">No hay estudiantes presentes.</p>
            )}
          </div>

          {/* Sección de estudiantes ausentes */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-red-600">Estudiantes Ausentes</h3>
            {estudiantesAusentes.length > 0 ? (
              estudiantesAusentes.map((estudiante) => (
                <EstudianteItem
                  key={estudiante.id}
                  estudiante={estudiante}
                  estado={asistencia[estudiante.id]}
                  onEstadoToggle={handleEstadoToggle}
                />
              ))
            ) : (
              <p className="text-gray-500">No hay estudiantes ausentes.</p>
            )}
          </div>

          <button
            type="submit"
            className={`${loading ? "bg-gray-400" : "bg-blue-500"} text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600`}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar Asistencia"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default PasarLista;