import React, { useState } from "react";
import { supabase } from "../supabase/Client";

export default function useReports() {
  const [data, setData] = useState([]);

  const getDataReportUser = async () => {
    try {
      const res = await supabase.from("Users").select("*");
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
