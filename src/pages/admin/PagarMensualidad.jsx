
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/Client";
import Layout from "../../components/Layout";
import dayjs from "dayjs";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

// Estilos para la factura
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

// Componente de la factura en PDF
const FacturaPDF = ({ facturaData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Encabezado */}
      <Text style={styles.header}>Factura de Pago</Text>

      {/* Información del padre */}
      <View style={styles.section}>
        <Text style={styles.label}>Padre:</Text>
        <Text style={styles.value}>
          {facturaData.padre.name} {facturaData.padre.last_name}
        </Text>
      </View>

      {/* Fecha de pago y meses pagados */}
      <View style={styles.section}>
        <Text style={styles.label}>Fecha de Pago:</Text>
        <Text style={styles.value}>
          {dayjs(facturaData.fechaPago).format("DD/MM/YYYY")}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Meses Pagados:</Text>
        <Text style={styles.value}>{facturaData.meses}</Text>
      </View>

      {/* Estudiantes */}
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
          {facturaData.estudiantes.map((est, index) => (
            <View style={styles.tableRow} key={index}>
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
                <Text>${est.monto * facturaData.meses}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Total pagado */}
      <View style={styles.section}>
        <Text style={styles.label}>Total Pagado:</Text>
        <Text style={styles.value}>${facturaData.montoTotal}</Text>
      </View>

      {/* Pie de página */}
      <Text style={styles.footer}>Gracias por su pago</Text>
      
    </Page>
  </Document>
);

const PagarMensualidad = () => {
  const [padres, setPadres] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedPadre, setSelectedPadre] = useState(null);
  const [montoTotal, setMontoTotal] = useState(0);
  const [meses, setMeses] = useState(1);
  const [fechaPago, setFechaPago] = useState(dayjs().format("YYYY-MM"));
  const [estadosPago, setEstadosPago] = useState([]);
  const [estadoPago, setEstadoPago] = useState("");
  const [pagosExistentes, setPagosExistentes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [facturaData, setFacturaData] = useState(null);

  useEffect(() => {
    const fetchPadres = async () => {
      const { data, error } = await supabase.from("Users").select("id, name, last_name");
      if (error) console.error("Error al obtener los padres", error);
      else setPadres(data);
    };

    const fetchEstadosPago = async () => {
      const { data, error } = await supabase.from("EstadoPago").select("*");
      if (error) console.error("Error al obtener estados de pago", error);
      else setEstadosPago(data);
    };

    fetchPadres();
    fetchEstadosPago();
  }, []);

  const handleSelectPadre = async (padreId) => {
    const padreSeleccionado = padres.find((p) => p.id === parseInt(padreId));
    if (!padreSeleccionado) {
      alert("Padre no encontrado");
      return;
    }

    setSelectedPadre(padreSeleccionado);

    const { data: estudiantesData, error: estudiantesError } = await supabase
      .from("Estudiantes")
      .select("id, nombre, apellido, monto")
      .eq("id_padre", padreSeleccionado.id);

    if (estudiantesError) {
      console.error("Error al obtener los estudiantes", estudiantesError);
    } else {
      setEstudiantes(estudiantesData);
      calcularTotal(estudiantesData, meses);
    }

    const { data: pagosData, error: pagosError } = await supabase
      .from("Pagos")
      .select("*")
      .eq("id_padre", padreSeleccionado.id);

    if (pagosError) {
      console.error("Error al obtener los pagos", pagosError);
    } else {
      setPagosExistentes(pagosData);
    }
  };

  const handleMesesChange = (e) => {
    const cantidad = parseInt(e.target.value, 10);
    if (!isNaN(cantidad)) {
      setMeses(cantidad);
      calcularTotal(estudiantes, cantidad);
    }
  };

  const calcularTotal = (hijos, numMeses) => {
    const total = hijos.reduce((sum, estudiante) => sum + parseFloat(estudiante.monto), 0) * numMeses;
    setMontoTotal(total);
  };

  const handlePagar = async () => {
    if (!selectedPadre || estudiantes.length === 0) {
      alert("No hay estudiantes asociados a este padre para generar el pagaré");
      return;
    }

    if (!estadoPago) {
      alert("Por favor seleccione un estado de pago");
      return;
    }

    const { error } = await supabase.from("Pagos").insert({
      id_padre: selectedPadre.id,
      monto_total: montoTotal,
      meses_pagados: meses,
      fecha: dayjs(fechaPago).startOf("month").format("YYYY-MM-DD"),
      estado_pago: estadoPago,
    });

    if (error) {
      console.error("Error al registrar el pago", error);
      alert(`Hubo un error al registrar el pago: ${error.message}`);
    } else {
      // Configurar los datos de la factura
      setFacturaData({
        padre: selectedPadre,
        estudiantes,
        montoTotal,
        meses,
        fechaPago,
        estadoPago: estadosPago.find((e) => e.id === estadoPago)?.nombre,
      });
    }
  };

  // Filtrar padres basado en el término de búsqueda
  const filteredPadres = padres.filter((padre) =>
    `${padre.name} ${padre.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Generar Pagaré</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Seleccionar Mes de Pago</label>
          <input
            type="month"
            value={fechaPago}
            onChange={(e) => setFechaPago(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Buscar Padre</label>
          <input
            type="text"
            placeholder="Buscar padre por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Seleccionar Padre</label>
          <select
            onChange={(e) => handleSelectPadre(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          >
            <option value="">Seleccione un padre</option>
            {filteredPadres.map((padre) => (
              <option key={padre.id} value={padre.id}>
                {padre.name} {padre.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Estado de Pago</label>
          <select
            value={estadoPago}
            onChange={(e) => setEstadoPago(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          >
            <option value="">Seleccione un estado</option>
            {estadosPago.map((estado) => (
              <option key={estado.id} value={estado.id}>{estado.nombre}</option>
            ))}
          </select>
        </div>

        {selectedPadre && estudiantes.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Estudiantes Asociados</h3>
            <ul className="border border-gray-300 rounded-lg p-4">
              {estudiantes.map((est) => (
                <li key={est.id} className="mb-2">
                  {est.nombre} {est.apellido} - ${est.monto} por mes
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Meses a pagar</label>
              <input
                type="number"
                min="1"
                max="12"
                value={meses}
                onChange={handleMesesChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <p className="mt-4 font-semibold text-lg">Total a pagar: ${montoTotal}</p>
            <button
              onClick={handlePagar}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Generar Pagaré
            </button>
          </div>
        )}

        {/* Botón para descargar la factura */}
        {facturaData && (
          <div className="mt-6">
            <PDFDownloadLink
              document={<FacturaPDF facturaData={facturaData} />}
              fileName={`factura_${facturaData.padre.name}_${dayjs().format("YYYYMMDD")}.pdf`}
            >
              {({ loading }) =>
                loading ? (
                  <button className="w-full bg-gray-500 text-white py-2 rounded-lg">
                    Generando factura...
                  </button>
                ) : (
                  <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                    Descargar Factura
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

export default PagarMensualidad;