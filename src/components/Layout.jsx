import SidebarAdmin from "./SidebarAdmin";
// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <SidebarAdmin /> {/* tu menú */}
      <main className="flex-1 overflow-auto p-4">{children}</main>
    </div>
  );
};

export default Layout;

