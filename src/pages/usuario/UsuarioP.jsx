import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaCaretDown } from "react-icons/fa";
import { useUser } from "../../hooks/useContext";
import Cookies from "js-cookie";
import { LayoutUser } from "../../components/LayoutUser";

export default function UsuarioP() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      navigate("/login");
    }
  }, [setUser, navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmLogout) {
      Cookies.remove("user");
      setUser(null);
      navigate("/login");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <LayoutUser>
      <header className="flex justify-end p-4 bg-white shadow-md">
        <div className="relative">
          <button
            className="flex items-center bg-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaUser className="mr-2" /> {user?.name || "Usuario"} <FaCaretDown className="ml-2" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
              <p className="flex items-center gap-2 text-gray-700"><FaEnvelope /> {user?.email || "Correo no disponible"}</p>
              
              <button
                onClick={handleLogout}
                className="mt-4 bg-green-700 text-white px-4 py-2 w-full rounded-lg shadow hover:bg-green-600"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </header>
      <main>
        <div className="flex-1 min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
          <h2 className="text-3xl font-semibold text-gray-900">Bienvenido, {user?.name || "Usuario"}</h2>
        </div>
      </main>
    </LayoutUser>
  );
}
