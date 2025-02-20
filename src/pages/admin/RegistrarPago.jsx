


import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/Client";
import Layout from "../../components/Layout";
import { FaRegCreditCard, FaCheckCircle, FaSearch } from "react-icons/fa";
import dayjs from "dayjs";

const RegistrarPago = () => {
  const [pago, setPago] = useState({
    monto: "",
    fecha_pago: dayjs().format("YYYY-MM-DD"),
    id_estudiante: { id: "", name: "", padre: "" },
  });

  const [estudiantes, setEstudiantes] = useState([]);
  const [search, setSearch] = useState("");
  const [pagosRealizados, setPagosRealizados] = useState([]);
  const [showFormulario, setShowFormulario] = useState(false);
  const [pagosStatus, setPagosStatus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: estudiantesData, error: estudiantesError } = await supabase
          .from("Estudiantes")
          .select("id, nombre, apellido, id_padre, monto");

        if (estudiantesError) throw estudiantesError;
        setEstudiantes(estudiantesData);

        const currentMonth = dayjs().month() + 1;
        const currentYear = dayjs().year();

        const { data: pagosData, error: pagosError } = await supabase
          .from("Pagos")
          .select("id_estudiante, fecha_pago")
          .filter("fecha_pago", "gte", `${currentYear}-${currentMonth}-01`)
          .filter("fecha_pago", "lt", `${currentYear}-${currentMonth + 1}-01`);

        if (pagosError) throw pagosError;
        setPagosRealizados(pagosData);

        const pagosStatusUpdate = {};
        pagosData.forEach((pago) => {
          pagosStatusUpdate[pago.id_estudiante] = true;
        });
        setPagosStatus(pagosStatusUpdate);
      } catch (error) {
        console.error("Error al cargar los datos:", error.message);
      }
    };

    fetchData();
  }, []);

  const estudiantesNoPagados = estudiantes.filter((est) => {
    return !pagosRealizados.some((pago) => pago.id_estudiante === est.id);
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "id_estudiante") {
      const estudianteSeleccionado = estudiantes.find(
        (estudiante) => estudiante.id === parseInt(value)
      );
      const nombrePadre = estudianteSeleccionado
        ? estudianteSeleccionado.id_padre
        : "";

      setPago({
        ...pago,
        id_estudiante: {
          id: estudianteSeleccionado.id,
          name: `${estudianteSeleccionado.nombre} ${estudianteSeleccionado.apellido}`,
          padre: nombrePadre,
        },
        monto: estudianteSeleccionado ? estudianteSeleccionado.monto : "",
      });
    } else {
      setPago({ ...pago, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pago.monto || !pago.fecha_pago || !pago.id_estudiante.id) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    try {
      const { error } = await supabase.from("Pagos").insert({
        monto: pago.monto,
        fecha_pago: pago.fecha_pago,
        id_estudiante: pago.id_estudiante.name,
        id_padre: pago.id_estudiante.padre,
      });

      if (error) throw error;

      alert("¡Pago registrado con éxito!");
      setPagosStatus((prevStatus) => ({
        ...prevStatus,
        [pago.id_estudiante.id]: true,
      }));
      handleCancel();
    } catch (error) {
      console.error("Error al registrar el pago:", error.message);
      alert("Hubo un error al registrar el pago.");
    }
  };

  const handleCancel = () => {
    setPago({
      monto: "",
      fecha_pago: dayjs().format("YYYY-MM-DD"),
      id_estudiante: { id: "", name: "", padre: "" },
    });
    setShowFormulario(false);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredEstudiantes = estudiantesNoPagados.filter(
    (est) =>
      est.nombre.toLowerCase().includes(search.toLowerCase()) ||
      est.apellido.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-xl rounded-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Registrar Pago
        </h2>

        {/* Barra de búsqueda */}
        <div className="mb-6 flex items-center border-b-2 border-gray-300">
          <FaSearch className="text-gray-600 mr-3 text-lg" />
          <input
            type="text"
            placeholder="Buscar estudiante..."
            value={search}
            onChange={handleSearchChange}
            className="w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
          />
        </div>

        {/* Lista de estudiantes no pagados */}
        {!showFormulario && (
          <div className="space-y-4">
            {filteredEstudiantes.map((est) => (
              <div
                key={est.id}
                className="flex justify-between items-center border-b py-3"
              >
                <span className="font-semibold text-gray-800">
                  {est.nombre} {est.apellido}
                </span>

                <button
                  onClick={() => {
                    setPago({
                      ...pago,
                      id_estudiante: {
                        id: est.id,
                        name: `${est.nombre} ${est.apellido}`,
                        padre: est.id_padre,
                      },
                      monto: est.monto,
                    });
                    setShowFormulario(true);
                  }}
                  className={`${
                    pagosStatus[est.id] ? "bg-green-600" : "bg-blue-500"
                  } text-white py-2 px-6 rounded-lg flex items-center hover:bg-blue-600 transition duration-300`}
                >
                  {pagosStatus[est.id] ? (
                    <FaCheckCircle className="mr-3 text-lg" />
                  ) : (
                    <FaRegCreditCard className="mr-3 text-lg" />
                  )}
                  {pagosStatus[est.id] ? "Pagado" : "Realizar Pago"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Formulario de pago */}
        {showFormulario && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">Formulario de Pago</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label htmlFor="monto" className="text-sm font-medium text-gray-700">
                  Monto
                </label>
                <input
                  type="number"
                  id="monto"
                  name="monto"
                  value={pago.monto}
                  onChange={handleInputChange}
                  className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  readOnly
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="fecha_pago" className="text-sm font-medium text-gray-700">
                  Fecha de Pago
                </label>
                <input
                  type="date"
                  id="fecha_pago"
                  name="fecha_pago"
                  value={pago.fecha_pago}
                  onChange={handleInputChange}
                  className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="id_estudiante" className="text-sm font-medium text-gray-700">
                  Estudiante Seleccionado
                </label>
                <input
                  type="text"
                  value={pago.id_estudiante.name}
                  readOnly
                  className="mt-2 p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  Registrar Pago
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition duration-300"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RegistrarPago;
