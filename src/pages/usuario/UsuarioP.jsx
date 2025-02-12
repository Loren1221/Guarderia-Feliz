import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import { useUser } from "../../hooks/useContext";
import Cookies from "js-cookie";
import { LayoutUser } from "../../components/LayoutUser";

export default function UsuarioP () {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      navigate("/login");
    }
  }, [setUser, navigate]);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "L,";
  };

  const handleLogout = () => {
    Cookies.remove("user");
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <LayoutUser>
    <main>
      <div className="flex-1 min-h-screen bg-gray-100">
        <header className="flex justify-between items-center bg-white shadow p-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Hola, {user ? user.name : "Cargando..."}
          </h1>
          <div className="relative flex items-center">
            <div className="w-12 h-12 bg-indigo-600 text-white flex items-center justify-center rounded-full text-xl font-bold border-2 border-indigo-400">
              {user ? getInitial(user.name) : ""}
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
              Bienvenido a tu Dashboard
            </h2>
            <div className="mb-6">
              {user ? (
                <p className="text-xl text-gray-700 text-center">
                  Hola,{" "}
                  <span className="font-semibold text-indigo-600">
                    {user.name}
                  </span>
                </p>
              ) : (
                <p className="text-xl text-gray-500 text-center">Cargando...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
    </LayoutUser>
  );
}
