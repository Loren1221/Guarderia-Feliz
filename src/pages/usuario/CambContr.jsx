
import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { supabase } from "../../supabase/Client";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { LayoutUser } from "../../components/LayoutUser";

const CambContr = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    const storedUser = JSON.parse(Cookies.get("user"));
    if (!storedUser || !storedUser.id || !storedUser.email) {
      setErrorMessage("Usuario no autenticado o id/email no encontrado");
      return;
    }

    const userId = storedUser.id;

    try {
      const { data: userData, error: userError } = await supabase
        .from("Users")
        .select("password")
        .eq("id", userId)
        .single();

      if (userError) throw userError;

      if (userData) {
        const isCurrentPasswordValid = await bcrypt.compare(
          currentPassword,
          userData.password
        );

        if (!isCurrentPasswordValid) {
          setErrorMessage("La contraseña actual es incorrecta");
          return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);

        const { error: updateError } = await supabase
          .from("Users")
          .update({ password: hashedPassword })
          .eq("id", userId);

        if (updateError) throw updateError;

        setSuccessMessage("Contraseña cambiada con éxito");
        setErrorMessage("");
      } else {
        setErrorMessage("Usuario no encontrado");
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error.message);
      setErrorMessage("Error al cambiar la contraseña");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <LayoutUser>
      <div className="max-w-md mx-auto mt-16 p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
          Cambiar Contraseña
        </h2>

        {/* Mensajes de error y éxito */}
        {errorMessage && (
          <p className="text-red-600 text-center mb-4">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-600 text-center mb-4">{successMessage}</p>
        )}

        {/* Formulario de cambio de contraseña */}
        <div className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Contraseña Actual
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Nueva Contraseña
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Confirmar Nueva Contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleChangePassword}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Cambiar Contraseña
          </button>

          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto mt-4 sm:mt-0 px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Volver Atrás
          </button>
        </div>
      </div>
    </LayoutUser>
  );
};

export default CambContr;
