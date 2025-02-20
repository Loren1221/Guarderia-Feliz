// import React, { useState, useEffect } from "react";
// import UserReport from "../../reports/UserReport";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import useReports from "../../hooks/useReports";
// import Layout from "../../components/Layout";

// export default function ReportsUser() {
//   const { getDataReportUser, data } = useReports();
//   const [filter, setFilter] = useState("");
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     getDataReportUser();
//   }, [getDataReportUser]);

//   useEffect(() => {
//     setFilteredData(
//       data.filter(
//         (user) =>
//           user.name.toLowerCase().includes(filter.toLowerCase()) ||
//           user.last_name.toLowerCase().includes(filter.toLowerCase()) ||
//           user.phone.includes(filter) ||
//           user.email.toLowerCase().includes(filter.toLowerCase()) ||
//           user.cedula.includes(filter)
//       )
//     );
//   }, [filter, data]);

//   const dataToExport = filter ? filteredData : data;

//   return (
//     <Layout>
//       <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <input
//             type="text"
//             placeholder="Filtrar por nombre, apellido, teléfono, email o cédula"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             style={{
//               padding: "10px",
//               width: "60%",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           />

//           <PDFDownloadLink
//             document={<UserReport data={dataToExport} />}
//             fileName={`ListaUsuarios${filter ? "_Filtrado" : ""}.pdf`}
//           >
//             {({ loading }) =>
//               loading ? (
//                 <button style={buttonStyle}>Cargando...</button>
//               ) : (
//                 <button style={buttonStyle}>Descargar PDF</button>
//               )
//             }
//           </PDFDownloadLink>
//         </div>

//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             marginTop: "20px",
//           }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
//               <th style={thStyle}>ID</th>
//               <th style={thStyle}>Nombre</th>
//               <th style={thStyle}>Apellido</th>
//               <th style={thStyle}>Teléfono</th>
//               <th style={thStyle}>Email</th>
//               <th style={thStyle}>Cédula</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((user, index) => (
//               <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
//                 <td style={tdStyle}>{user.id}</td>
//                 <td style={tdStyle}>{user.name}</td>
//                 <td style={tdStyle}>{user.last_name}</td>
//                 <td style={tdStyle}>{user.phone}</td>
//                 <td style={tdStyle}>{user.email}</td>
//                 <td style={tdStyle}>{user.cedula}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </Layout>
//   );
// }

// const buttonStyle = {
//   padding: "10px 20px",
//   backgroundColor: "#4CAF50",
//   color: "white",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
//   fontSize: "16px",
//   fontWeight: "bold",
//   transition: "background-color 0.3s ease",
// };

// const thStyle = {
//   padding: "12px 8px",
//   border: "1px solid #ddd",
//   backgroundColor: "#f9f9f9",
//   fontWeight: "bold",
// };

// const tdStyle = {
//   padding: "8px",
//   border: "1px solid #ddd",
// };
import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/Client";
import Layout from "../components/Layout";

const PadreReports = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from("Users").select("*");
        if (error) throw error;
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        setError("Error al cargar los usuarios");
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.cedula.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Reporte de Padres
        </h1>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        
        <div className="mb-4 flex flex-row items-center">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Nombre</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Apellido</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Teléfono</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Cédula</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{user.id}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{user.last_name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{user.phone}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{user.cedula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default PadreReports;
