import SidebarAdmin from "./SidebarAdmin";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <SidebarAdmin />
      <main className="flex-1 overflow-auto p-4">{children}</main>
    </div>
  );
};

export default Layout;

