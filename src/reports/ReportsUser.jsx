import React, { useState, useEffect } from "react";

import { PDFDownloadLink } from "@react-pdf/renderer";
import useReports from "../hooks/useReports";
import Layout from "../security/Layout";

export default function ReportsUser() {
  const { getDataReportUser, data } = useReports();
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getDataReportUser();
  }, [getDataReportUser]);

  useEffect(() => {
    setFilteredData(
      data.filter(
        (user) =>
          user.name.toLowerCase().includes(filter.toLowerCase()) ||
          user.last_name.toLowerCase().includes(filter.toLowerCase()) ||
          user.phone.includes(filter) ||
          user.email.toLowerCase().includes(filter.toLowerCase()) ||
          user.cedula.includes(filter)
      )
    );
  }, [filter, data]);

  const dataToExport = filter ? filteredData : data;

  return (
    <Layout>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Filtrar por nombre, apellido, teléfono, email o cédula"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: "10px",
              width: "60%",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <PDFDownloadLink
            document={<UserReport data={dataToExport} />}
            fileName={`ListaUsuarios${filter ? "_Filtrado" : ""}.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <button style={buttonStyle}>Cargando...</button>
              ) : (
                <button style={buttonStyle}>Descargar PDF</button>
              )
            }
          </PDFDownloadLink>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Apellido</th>
              <th style={thStyle}>Teléfono</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Cédula</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={tdStyle}>{user.id}</td>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.last_name}</td>
                <td style={tdStyle}>{user.phone}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.cedula}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  transition: "background-color 0.3s ease",
};

const thStyle = {
  padding: "12px 8px",
  border: "1px solid #ddd",
  backgroundColor: "#f9f9f9",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "8px",
  border: "1px solid #ddd",
};
