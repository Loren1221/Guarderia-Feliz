

// import React, { useState, useEffect } from "react";
// import { supabase } from "../../supabase/Client";
// import { LayoutUser } from "../../components/LayoutUser";

// const EventsUser = () => {
//   const [events, setEvents] = useState([]);
//   const [filter, setFilter] = useState("");

//   useEffect(() => {
//     const fetchEvents = async () => {
//       const { data, error } = await supabase.from("Events").select("*");
//       if (error) {
//         console.error("Error fetching events:", error);
//       } else {
//         setEvents(data);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const filteredEvents = events.filter((event) =>
//     event.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   const handleFilterChange = (event) => {
//     setFilter(event.target.value);
//   };

//   return (
//     <LayoutUser>
//       <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
//         <h2 className="text-4xl font-bold text-teal-600 mb-6 text-center">
//           Eventos Especiales para Niños
//         </h2>
//         <div className="mb-6">
//           <input
//             type="text"
//             value={filter}
//             onChange={handleFilterChange}
//             placeholder="Busca eventos divertidos..."
//             className="mt-1 block w-full px-4 py-3 border border-teal-400 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition duration-300 ease-in-out transform hover:scale-105"
//           />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredEvents.map((event) => (
//             <div
//               key={event.id}
//               className="bg-teal-50 border border-teal-300 rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300 ease-in-out"
//             >
//               <h3 className="text-2xl font-semibold text-teal-700 mb-3">
//                 {event.name}
//               </h3>
//               <p className="text-teal-600 mb-2">
//                 <strong>Descripción:</strong> {event.description || "No disponible"}
//               </p>
//               <p className="text-teal-600 mb-2">
//                 <strong>Ubicación:</strong> {event.location || "No disponible"}
//               </p>
//               <p className="text-teal-600 mb-2">
//                 <strong>Fecha:</strong> {event.date || "No disponible"}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </LayoutUser>
//   );
// };

// export default EventsUser;


import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/Client";
import { LayoutUser } from "../../components/LayoutUser";

const EventsUser = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("Events").select("*");
      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();

    // Suscribirse a cambios en la tabla "Events" (Realtime)
    const subscription = supabase
      .channel("events-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Events" },
        () => {
          fetchEvents(); // Volver a cargar eventos cuando haya cambios
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <LayoutUser>
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
        <h2 className="text-4xl font-bold text-teal-600 mb-6 text-center">
          Eventos Especiales para Niños
        </h2>
        <div className="mb-6">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Busca eventos divertidos..."
            className="mt-1 block w-full px-4 py-3 border border-teal-400 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition duration-300 ease-in-out transform hover:scale-105"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-teal-50 border border-teal-300 rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300 ease-in-out"
            >
              <h3 className="text-2xl font-semibold text-teal-700 mb-3">
                {event.name}
              </h3>
              <p className="text-teal-600 mb-2">
                <strong>Descripción:</strong> {event.description || "No disponible"}
              </p>
              <p className="text-teal-600 mb-2">
                <strong>Ubicación:</strong> {event.location || "No disponible"}
              </p>
              <p className="text-teal-600 mb-2">
                <strong>Fecha:</strong> {event.date || "No disponible"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </LayoutUser>
  );
};

export default EventsUser;
