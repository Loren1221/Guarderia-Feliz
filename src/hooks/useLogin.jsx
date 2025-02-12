

import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/Client";
import Cookies from "js-cookie";
import { useUser } from "./useContext";
import bcrypt from "bcryptjs";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const authLogin = async ({ email, password }) => {
    try {
      const { data: userData, error: userError } = await supabase
        .from("Users")
        .select("id, email, name, password, id_rol (rol_name)")
        .eq("email", email)
        .single();

      if (userError) throw userError;

      if (userData) {
        const isPasswordValid = await bcrypt.compare(
          password,
          userData.password
        );

        if (isPasswordValid) {
          const roleName = userData.id_rol
            ? userData.id_rol.rol_name.trim().toLowerCase()
            : "unknown";

          const userInfo = {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: roleName,
          };

          setUser(userInfo);
          Cookies.set("user", JSON.stringify(userInfo), { expires: 7 });

          switch (roleName) {
            case "administrador":
              navigate("/admin");
              break;
            case "estudiante":
              navigate("/usuario");
              break;
            case "docente":
              navigate("/usuario");
              break;
            case "invitado":
              navigate("/usuario");
              break;
            default:
              navigate("/");
              break;
          }
        } else {
          throw new Error("Invalid password");
        }
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Error al iniciar sesión. Verifique sus credenciales.");
    }
  };

  return {
    authLogin,
  };
};
