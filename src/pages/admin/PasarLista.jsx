


// import React, { useState, useEffect } from "react";
// import { supabase } from "../../supabase/Client";
// import Layout from "../../components/Layout";
// import { ClipboardDocumentCheckIcon, UserIcon, UserMinusIcon } from "@heroicons/react/24/outline"; // Rutas actualizadas

// // Componente para renderizar un estudiante y su toggle switch
// const EstudianteItem = ({ estudiante, estado, onEstadoToggle }) => {
//   return (

    
//     <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm">
    
//       <span className="text-gray-800 font-medium">
//         {estudiante.nombre} {estudiante.apellido}
//       </span>
//       {/* Toggle Switch */}
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



// // Componente para listar estudiantes (presentes o ausentes)
// const ListaEstudiantes = ({ titulo, estudiantes, onEstadoToggle }) => (
//   <div>
//     <h2 className="text-xl font-semibold text-gray-800 mb-4">{titulo}</h2>
//     <div className="space-y-4">
//       {estudiantes.length > 0 ? (
//         estudiantes.map((estudiante) => (
//           <EstudianteItem
//             key={estudiante.id}
//             estudiante={estudiante}
//             estado="presente" // Esto se controla desde el componente padre
//             onEstadoToggle={onEstadoToggle}
//           />
//         ))
//       ) : (
//         <p className="text-gray-500">No hay estudiantes en esta lista.</p>
//       )}
//     </div>
//   </div>
// );

// // Componente principal
// const PasarLista = () => {
//   const [estudiantes, setEstudiantes] = useState([]);
//   const [asistencia, setAsistencia] = useState({});
//   const [fecha, setFecha] = useState("");
//   const [view, setView] = useState("pasar-lista");
//   const [loading, setLoading] = useState(false);

//   // Cargar estudiantes al montar el componente
//   useEffect(() => {
//     const fetchEstudiantes = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("Estudiantes")
//           .select("id, nombre, apellido");

//         if (error) throw error;

//         setEstudiantes(data);

//         const initialAsistencia = {};
//         data.forEach((estudiante) => {
//           initialAsistencia[estudiante.id] = "ausente"; // Default: ausente
//         });
//         setAsistencia(initialAsistencia);
//       } catch (error) {
//         console.error("Error al cargar los estudiantes:", error.message);
//       }
//     };

//     fetchEstudiantes();
//   }, []);

//   // Manejar el toggle del estado de asistencia
//   const handleEstadoToggle = (idEstudiante) => {
//     setAsistencia((prev) => ({
//       ...prev,
//       [idEstudiante]:
//         prev[idEstudiante] === "presente" ? "ausente" : "presente",
//     }));
//   };

//   // Guardar asistencia en la base de datos
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!fecha) {
//       alert("Por favor, seleccione una fecha.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const registros = Object.keys(asistencia).map((idEstudiante) => ({
//         fecha,
//         id_estudiante: idEstudiante,
//         estado: asistencia[idEstudiante],
//       }));

//       const { error } = await supabase
//         .from("Asistencia")
//         .insert(registros, { returning: "minimal" });

//       if (error) throw error;

//       alert("¡Asistencia registrada con éxito!");
//     } catch (error) {
//       console.error("Error al guardar la asistencia:", error.message);
//       alert("Hubo un error al guardar la asistencia.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filtrar presentes y ausentes
//   const presentes = estudiantes.filter((est) => asistencia[est.id] === "presente");
//   const ausentes = estudiantes.filter((est) => asistencia[est.id] === "ausente");

//   return (
//     <Layout>
//       <div className="max-w-6xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
//         {/* Menú de navegación */}
//         <nav className="flex justify-center space-x-6 mb-6">
//           {[
//             { view: "pasar-lista", label: "Pasar Lista", icon: <ClipboardDocumentCheckIcon className="w-5 h-5 inline" /> },
//             { view: "presentes", label: "Presentes", icon: <UserIcon className="w-5 h-5 inline" /> },
//             { view: "ausentes", label: "Ausentes", icon: <UserMinusIcon className="w-5 h-5 inline" /> },
//           ].map((item) => (
//             <button
//               key={item.view}
//               className={`flex items-center gap-2 ${
//                 view === item.view ? "text-blue-600 font-bold" : "text-gray-600"
//               }`}
//               onClick={() => setView(item.view)}
//             >
//               {item.icon}
//               {item.label}
//             </button>
//           ))}
//         </nav>

//         {/* Vistas */}
//         {view === "pasar-lista" && (
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Selección de fecha */}
//             <div className="flex flex-col">
//               <label htmlFor="fecha" className="text-sm font-medium text-gray-700">
//                 Fecha
//               </label>
//               <input
//                 type="date"
//                 id="fecha"
//                 name="fecha"
//                 value={fecha}
//                 onChange={(e) => setFecha(e.target.value)}
//                 className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Lista de estudiantes */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {estudiantes.map((estudiante) => (
//                 <EstudianteItem
//                   key={estudiante.id}
//                   estudiante={estudiante}
//                   estado={asistencia[estudiante.id]}
//                   onEstadoToggle={handleEstadoToggle}
//                 />
//               ))}
//             </div>

//             {/* Botón para guardar */}
//             <button
//               type="submit"
//               className={`${
//                 loading ? "bg-gray-400" : "bg-blue-500"
//               } text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600`}
//               disabled={loading}
//             >
//               {loading ? "Guardando..." : "Guardar Asistencia"}
//             </button>
//           </form>
//         )}

//         {view === "presentes" && (
//           <ListaEstudiantes
//             titulo="Estudiantes Presentes"
//             estudiantes={presentes}
//             onEstadoToggle={handleEstadoToggle}
//           />
//         )}

//         {view === "ausentes" && (
//           <ListaEstudiantes
//             titulo="Estudiantes Ausentes"
//             estudiantes={ausentes}
//             onEstadoToggle={handleEstadoToggle}
//           />
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default PasarLista;
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/Client";
import Layout from "../../components/Layout";
import { ClipboardDocumentCheckIcon, UserIcon, UserMinusIcon } from "@heroicons/react/24/outline";

// Componente para renderizar un estudiante y su toggle switch
const EstudianteItem = ({ estudiante, estado, onEstadoToggle }) => {
  return (
    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm">
      <span className="text-gray-800 font-medium">
        {estudiante.nombre} {estudiante.apellido}
      </span>
      {/* Toggle Switch */}
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

// Componente para listar estudiantes (presentes o ausentes)
const ListaEstudiantes = ({ titulo, estudiantes }) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{titulo}</h2>
    <div className="space-y-4">
      {estudiantes.length > 0 ? (
        estudiantes.map((estudiante) => (
          <div
            key={estudiante.id}
            className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm"
          >
            <span className="text-gray-800 font-medium">
              {estudiante.nombre} {estudiante.apellido}
            </span>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No hay estudiantes en esta lista.</p>
      )}
    </div>
  </div>
);

// Componente principal
const PasarLista = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [asistencia, setAsistencia] = useState({});
  const [fecha, setFecha] = useState("");
  const [view, setView] = useState("pasar-lista");
  const [loading, setLoading] = useState(false);

  // Cargar estudiantes y asistencia al montar el componente o cambiar la fecha
  useEffect(() => {
    const fetchDatos = async () => {
      if (!fecha) return;

      try {
        // Cargar estudiantes
        const { data: estudiantesData, error: estudiantesError } = await supabase
          .from("Estudiantes")
          .select("id, nombre, apellido");

        if (estudiantesError) throw estudiantesError;

        setEstudiantes(estudiantesData);

        // Cargar asistencia para la fecha seleccionada
        const { data: asistenciaData, error: asistenciaError } = await supabase
          .from("Asistencia")
          .select("*")
          .eq("fecha", fecha);

        if (asistenciaError) throw asistenciaError;

        if (asistenciaData.length > 0) {
          // Mapear estados de asistencia si ya existen
          const asistenciaMap = asistenciaData.reduce((acc, registro) => {
            acc[registro.id_estudiante] = registro.estado;
            return acc;
          }, {});
          setAsistencia(asistenciaMap);
        } else {
          // Inicializar todos como ausente si no hay registros
          const initialAsistencia = {};
          estudiantesData.forEach((estudiante) => {
            initialAsistencia[estudiante.id] = "ausente";
          });
          setAsistencia(initialAsistencia);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error.message);
      }
    };

    fetchDatos();
  }, [fecha]);

  // Manejar el toggle del estado de asistencia
  const handleEstadoToggle = (idEstudiante) => {
    setAsistencia((prev) => ({
      ...prev,
      [idEstudiante]: prev[idEstudiante] === "presente" ? "ausente" : "presente",
    }));
  };

  // Guardar asistencia en la base de datos
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fecha) {
      alert("Por favor, seleccione una fecha.");
      return;
    }

    setLoading(true);

    try {
      const registros = Object.keys(asistencia).map((idEstudiante) => ({
        fecha,
        id_estudiante: idEstudiante,
        estado: asistencia[idEstudiante],
      }));

      const { error } = await supabase
        .from("Asistencia")
        .upsert(registros, { onConflict: ["fecha", "id_estudiante"] });

      if (error) throw error;

      alert("¡Asistencia registrada con éxito!");
    } catch (error) {
      console.error("Error al guardar la asistencia:", error.message);
      alert("Hubo un error al guardar la asistencia.");
    } finally {
      setLoading(false);
    }
  };

  // Filtrar presentes y ausentes
  const presentes = estudiantes.filter((est) => asistencia[est.id] === "presente");
  const ausentes = estudiantes.filter((est) => asistencia[est.id] === "ausente");

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        {/* Menú de navegación */}
        <nav className="flex justify-center space-x-6 mb-6">
          {[
            { view: "pasar-lista", label: "Pasar Lista", icon: <ClipboardDocumentCheckIcon className="w-5 h-5 inline" /> },
            { view: "presentes", label: "Presentes", icon: <UserIcon className="w-5 h-5 inline" /> },
            { view: "ausentes", label: "Ausentes", icon: <UserMinusIcon className="w-5 h-5 inline" /> },
          ].map((item) => (
            <button
              key={item.view}
              className={`flex items-center gap-2 ${
                view === item.view ? "text-blue-600 font-bold" : "text-gray-600"
              }`}
              onClick={() => setView(item.view)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Vistas */}
        {view === "pasar-lista" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selección de fecha */}
            <div className="flex flex-col">
              <label htmlFor="fecha" className="text-sm font-medium text-gray-700">
                Fecha
              </label>
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

            {/* Lista de estudiantes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {estudiantes.map((estudiante) => (
                <EstudianteItem
                  key={estudiante.id}
                  estudiante={estudiante}
                  estado={asistencia[estudiante.id]}
                  onEstadoToggle={handleEstadoToggle}
                />
              ))}
            </div>

            {/* Botón para guardar */}
            <button
              type="submit"
              className={`${
                loading ? "bg-gray-400" : "bg-blue-500"
              } text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600`}
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar Asistencia"}
            </button>
          </form>
        )}

        {view === "presentes" && <ListaEstudiantes titulo="Estudiantes Presentes" estudiantes={presentes} />}

        {view === "ausentes" && <ListaEstudiantes titulo="Estudiantes Ausentes" estudiantes={ausentes} />}
      </div>
    </Layout>
  );
};

export default PasarLista;
