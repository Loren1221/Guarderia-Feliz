import { useEffect, useState } from "react";
import { supabase } from "../supabase/Client";
import Cookies from "js-cookie";

export const useReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(Cookies.get("user") || "{}");
    if (storedUser && storedUser.id) {
      setUserId(storedUser.id);
    }

    const fetchReservations = async () => {
      if (!userId) return;

      try {
        const { data: reservationsData, error } = await supabase
          .from("Reservations")
          .select(
            `
              id, 
              dtstart, 
              dtend,
              id_state, 
              id_enclosure,
              Enclosures (name),
              State (state_name)   
             `
          )

          .eq("id_users", userId);

        if (error) throw error;

        setReservations(reservationsData);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, [userId]);

  return reservations;
};
