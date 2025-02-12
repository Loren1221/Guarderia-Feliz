

import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/Client";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { LayoutUser } from "../../components/LayoutUser";

export default function Perfil() {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    last_name: "",
    phone: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = Cookies.get("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user && user.id) {
          const { data, error } = await supabase
            .from("Users")
            .select("id, name, last_name, phone, email")
            .eq("id", user.id)
            .single();

          if (data) {
            setUserData({
              id: data.id,
              name: data.name,
              last_name: data.last_name,
              phone: data.phone,
              email: data.email,
            });
          } else if (error) {
            console.error("Error fetching user data:", error);
          }
        } else {
          console.error("No user ID found in cookies.");
        }
      } else {
        console.error("No user data found in cookies.");
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (!userData || !userData.id) {
      console.error("Error: ID del usuario no encontrado.");
      return;
    }

    const updatedData = {
      name: userData.name,
      last_name: userData.last_name,
      phone: userData.phone,
    };

    try {
      const { error } = await supabase
        .from("Users")
        .update(updatedData)
        .eq("id", userData.id);

      if (error) {
        console.error(
          "Error updating user data:",
          error.message,
          error.details
        );
      } else {
        alert("Perfil actualizado con éxito");

        Cookies.set("user", JSON.stringify({ ...userData, ...updatedData }), {
          expires: 7,
        });
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <LayoutUser>
      <div className="max-w-3xl mx-auto mt-12 p-6 bg-gray-50 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">
          Perfil de Usuario
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Nombre:</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Apellido:</label>
            <input
              type="text"
              name="last_name"
              value={userData.last_name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Teléfono:</label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-8">
          <button
            onClick={handleGoBack}
            className="w-full md:w-auto mb-4 md:mb-0 px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Volver
          </button>
          <Link
            to="/cambiar-contrasena"
            className="w-full md:w-auto mb-4 md:mb-0 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-center"
          >
            Cambiar Contraseña
          </Link>
          <button
            onClick={handleSave}
            className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Actualizar
          </button>
        </div>
      </div>
    </LayoutUser>
  );
}
