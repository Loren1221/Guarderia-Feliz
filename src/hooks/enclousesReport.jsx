import React, { useState } from "react";
import { supabase } from "../supabase/Client";

export default function useEclouses() {
  const [data, setData] = useState([]);

  const getDataReportUser = async () => {
    try {
      const res = await supabase.from("Enclosures").select("*");
      setData(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return {
    getDataReportUser,
    data,
  };
}
