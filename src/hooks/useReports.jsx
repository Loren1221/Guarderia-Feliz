import React, { useState } from "react";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
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
