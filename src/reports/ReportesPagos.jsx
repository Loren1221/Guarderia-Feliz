import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/Client";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import dayjs from "dayjs"; // Importar dayjs
import Layout from "../components/Layout";
// Estilos para el reporte
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "#333333",
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#555555",
  },
  value: {
    fontSize: 12,
    marginBottom: 10,
    color: "#777777",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#cccccc",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#cccccc",
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 5,
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
    color: "#999999",
  },
});

// Componente de factura individual en PDF
const FacturaPDF = ({ factura }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Encabezado */}
      <Text style={styles.header}>Factura de Pago</Text>

      {/* Información del padre */}
      <View style={styles.section}>
        <Text style={styles.label}>Padre:</Text>
        <Text style={styles.value}>
          {factura.padre.name} {factura.padre.last_name}
        </Text>
      </View>

      {/* Fecha de pago y meses pagados */}
      <View style={styles.section}>
        <Text style={styles.label}>Fecha de Pago:</Text>
        <Text style={styles.value}>
          {dayjs(factura.fecha).format("DD/MM/YYYY")}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Meses Pagados:</Text>
        <Text style={styles.value}>{factura.meses_pagados}</Text>
      </View>

      {/* Estudiantes asociados */}
      <View style={styles.section}>
        <Text style={styles.label}>Estudiantes:</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text>Nombre</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Apellido</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Monto por Mes</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Total</Text>
            </View>
          </View>
          {factura.estudiantes.map((est, i) => (
            <View style={styles.tableRow} key={i}>
              <View style={styles.tableCol}>
                <Text>{est.nombre}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{est.apellido}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>${est.monto}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>${est.monto * factura.meses_pagados}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Total pagado */}
      <View style={styles.section}>
        <Text style={styles.label}>Total Pagado:</Text>
        <Text style={styles.value}>${factura.monto_total}</Text>
      </View>

      {/* Pie de página */}
      <Text style={styles.footer}>Gracias por su pago</Text>
    </Page>
  </Document>
);

// Componente de reporte en PDF (todas las facturas)
const ReportePDF = ({ pagos }) => (
  <Document>
    {pagos.map((factura, index) => (
      <Page key={index} size="A4" style={styles.page}>
        {/* Encabezado */}
        <Text style={styles.header}>Factura de Pago #{index + 1}</Text>

        {/* Información del padre */}
        <View style={styles.section}>
          <Text style={styles.label}>Padre:</Text>
          <Text style={styles.value}>
            {factura.padre.name} {factura.padre.last_name}
          </Text>
        </View>

        {/* Fecha de pago y meses pagados */}
        <View style={styles.section}>
          <Text style={styles.label}>Fecha de Pago:</Text>
          <Text style={styles.value}>
            {dayjs(factura.fecha).format("DD/MM/YYYY")}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Meses Pagados:</Text>
          <Text style={styles.value}>{factura.meses_pagados}</Text>
        </View>

        {/* Estudiantes asociados */}
        <View style={styles.section}>
          <Text style={styles.label}>Estudiantes:</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text>Nombre</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text>Apellido</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text>Monto por Mes</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text>Total</Text>
              </View>
            </View>
            {factura.estudiantes.map((est, i) => (
              <View style={styles.tableRow} key={i}>
                <View style={styles.tableCol}>
                  <Text>{est.nombre}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{est.apellido}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>${est.monto}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>${est.monto * factura.meses_pagados}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Total pagado */}
        <View style={styles.section}>
          <Text style={styles.label}>Total Pagado:</Text>
          <Text style={styles.value}>${factura.monto_total}</Text>
        </View>

        {/* Pie de página */}
        <Text style={styles.footer}>Gracias por su pago</Text>
      </Page>
    ))}
  </Document>
);

const ReportePagos = () => {
  const [pagos, setPagos] = useState([]);

  // Obtener todos los pagos registrados
  useEffect(() => {
    const fetchPagos = async () => {
      const { data, error } = await supabase
        .from("Pagos")
        .select("*")
        .order("fecha", { ascending: false });

      if (error) {
        console.error("Error al obtener los pagos:", error);
      } else {
        // Obtener los detalles de los estudiantes y padres para cada pago
        const pagosConDetalles = await Promise.all(
          data.map(async (pago) => {
            const { data: padre } = await supabase
              .from("Users")
              .select("name, last_name")
              .eq("id", pago.id_padre)
              .single();

            const { data: estudiantes } = await supabase
              .from("Estudiantes")
              .select("nombre, apellido, monto")
              .eq("id_padre", pago.id_padre);

            return {
              ...pago,
              padre,
              estudiantes,
            };
          })
        );

        setPagos(pagosConDetalles);
      }
    };

    fetchPagos();
  }, []);

  return (
    <Layout>


    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Reporte de Pagos</h2>

      {/* Lista de facturas */}
      {pagos.map((factura, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-300 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Factura #{index + 1}</h3>
          <p><strong>Padre:</strong> {factura.padre.name} {factura.padre.last_name}</p>
          <p><strong>Fecha de Pago:</strong> {dayjs(factura.fecha).format("DD/MM/YYYY")}</p>
          <p><strong>Meses Pagados:</strong> {factura.meses_pagados}</p>
          <p><strong>Monto Total:</strong> ${factura.monto_total}</p>

          {/* Botón para descargar la factura individual */}
          <div className="mt-4">
            <PDFDownloadLink
              document={<FacturaPDF factura={factura} />}
              fileName={`factura_${factura.padre.name}_${dayjs(factura.fecha).format("YYYYMMDD")}.pdf`}
            >
              {({ loading }) =>
                loading ? (
                  <button className="w-full bg-gray-500 text-white py-2 rounded-lg">
                    Generando factura...
                  </button>
                ) : (
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Descargar Factura #{index + 1}
                  </button>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
      ))}

      {/* Botón para descargar todas las facturas en un solo PDF */}
      {pagos.length > 0 && (
        <div className="mt-6">
          <PDFDownloadLink
            document={<ReportePDF pagos={pagos} />}
            fileName={`reporte_pagos_${dayjs().format("YYYYMMDD")}.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <button className="w-full bg-gray-500 text-white py-2 rounded-lg">
                  Generando reporte completo...
                </button>
              ) : (
                <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                  Descargar Todas las Facturas
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default ReportePagos;