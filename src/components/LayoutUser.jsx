// eslint-disable-next-line no-unused-vars
import React from "react";
import SidebarUser from "./SidebarUser";

export const LayoutUser = ({ children }) => {
  return (
    <div className="flex h-screen bord">
      <SidebarUser /> {/* tu menú */}
      <main className="flex-1 overflow-auto p-4">{children}</main>
    </div>
  );
};
