import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase/Client";
import { useState } from "react";
import bcrypt from "bcryptjs";

export const useRegister = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const registerUser = async (user) => {
    try {
      setError(null);
      const { data: existingUser, error: emailCheckError } = await supabase
        .from("Users")
        .select("id")
        .eq("email", user.email)
        .single();

      if (emailCheckError && emailCheckError.code !== "PGRST116") {
        throw emailCheckError;
      }

      if (existingUser) {
        setError("El correo electrónico ya está registrado.");
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(user.password, salt);

      const { error: insertError } = await supabase.from("Users").insert([
        {
          name: user.name,
          last_name: user.last_name,
          id_rol: user.id_rol,
          phone: user.phone,
          email: user.email,
          password: hashedPassword,
          cedula: user.cedula,
        },
      ]);

      if (insertError) throw insertError;
      alert("Usted se ha registrado");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    registerUser,
    error,
  };
};
