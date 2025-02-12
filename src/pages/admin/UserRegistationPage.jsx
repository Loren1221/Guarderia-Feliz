import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/Client";
import { AiOutlineDelete } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Layout from "../../components/Layout";

const UserRegistration = () => {
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
    // Filtra los usuarios en función del término de búsqueda
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

  const handleDelete = async (userId, userName) => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar al usuario ${userName}?`
      )
    ) {
      try {
        const { error } = await supabase
          .from("Users")
          .delete()
          .eq("id", userId);
        if (error) throw error;

        // Remove user from local state
        setUsers(users.filter((user) => user.id !== userId));
        setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
      } catch (error) {
        setError("Error al eliminar el usuario");
        console.error(error);
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 1:
        return "Administrador";
      case 2:
        return "Usuario";
      default:
        return "Desconocido";
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Usuarios Registrados
        </h1>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        {/* Input de búsqueda */}
        <div className="mb-4 flex flex-row items-center">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md pr-2 w-full"
          />
          <NavLink to="/register">
            <button className="inline-flex items-center px-4 py-2 ml-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                </svg>
              </span>
              <a className="pl-2">Nuevo</a>
            </button>
          </NavLink>
        </div>

        {/* Tabla*/}
        <div className="overflow-x-auto hidden md:block">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">
                  ID
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">
                  Nombre
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">
                  Apellido
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 hidden lg:table-cell">
                  Email
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 hidden md:table-cell">
                  Teléfono
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 hidden lg:table-cell">
                  Cédula
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">
                  Rol
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">
                    {user.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">
                    {user.last_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800 hidden lg:table-cell">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800 hidden md:table-cell">
                    {user.phone}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800 hidden lg:table-cell">
                    {user.cedula}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">
                    {getRoleLabel(user.id_rol)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">
                    <button
                      className="bg-red-600 text-white py-1 px-2 rounded-md flex items-center gap-2 hover:bg-red-700 transition-colors text-sm"
                      onClick={() => handleDelete(user.id, user.name)}
                    >
                      <AiOutlineDelete className="text-base" />
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vista en tarjetas para dispositivos móviles */}
        <div className="block md:hidden">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white border border-gray-300 rounded-lg p-4 mb-4 shadow-md"
            >
              <p className="text-gray-800 font-bold">ID: {user.id}</p>
              <p className="text-gray-800">Nombre: {user.name}</p>
              <p className="text-gray-800">Apellido: {user.last_name}</p>
              <p className="text-gray-800">Email: {user.email}</p>
              <p className="text-gray-800">Teléfono: {user.phone}</p>
              <p className="text-gray-800">Cédula: {user.cedula}</p>
              <p className="text-gray-800">Rol: {getRoleLabel(user.id_rol)}</p>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-red-700 transition-colors mt-4"
                onClick={() => handleDelete(user.id, user.name)}
              >
                <AiOutlineDelete className="text-base" />
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default UserRegistration;
