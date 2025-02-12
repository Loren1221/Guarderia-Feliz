import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { supabase } from "../supabase/Client";
import { useUser } from "./useContext";

const useAuthCheck = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = JSON.parse(Cookies.get("user") || "{}");
      if (storedUser && storedUser.id) {
        setUser(storedUser);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        const userInfo = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata.name,
          role: session.user.user_metadata.role,
        };
        setUser(userInfo);
        Cookies.set("user", JSON.stringify(userInfo), { expires: 7 });
      } else {
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate, setUser]);

  return { user };
};

export default useAuthCheck;
