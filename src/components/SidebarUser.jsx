

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LogoHo from "../images/Logo.png"; 

const SidebarUser = () => {
  const [sidebarToggled, setSidebarToggled] = useState(false);
  const [sidebarResized, setSidebarResized] = useState(false);
  const navigate = useNavigate();
  const [selectedTab, setSelectedTabs] = useState({});

  const handleTabSelect = (tab) => {
    setSelectedTabs((prevTabs) => ({
      ...prevTabs,
      [tab]: !prevTabs[tab],
    }));
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "¿Estás seguro de que deseas cerrar sesión?"
    );
    if (confirmLogout) {
      Cookies.remove("token");
      navigate("/login");
      alert("😢 Has cerrado sesión.");
    } else {
      alert("😊 Has cancelado la acción de cerrar sesión.");
    }
  };

  const toggleSidebar = () => {
    setSidebarToggled((sidebarToggled) => !sidebarToggled);
  };

  const resizeSidebar = () => {
    setSidebarResized((sidebarResized) => !sidebarResized);
  };

  return (
    <>
      <aside
        className={`
          fixed inset-0 z-50 w-8/12 max-w-[14rem] md:w-48 transition-all rounded-br-xl bg-white shadow-lg shadow-gray-800/60 flex flex-col justify-between px-4 lg:transition-[width] ease-linear
          ${sidebarToggled ? "" : "-translate-x-full lg:-translate-x-0"}
          ${sidebarResized ? "lg:w-20" : ""} h-screen
        `}
      >
        <div className="min-h-max py-3">
          {/* Logo del menú */}
          <div className="flex justify-center items-center mb-4">
            <img
              src={LogoHo}
              alt="Logo"
              className={`w-12 h-12 ${sidebarResized ? "lg:w-8 lg:h-8" : ""}`}
            />
          </div>

          <div className="min-h-max py-2 hidden lg:flex justify-end bg-transparent">
            <button
              onClick={() => {
                resizeSidebar();
              }}
              className={`
                  outline-none bg-gray-100  rounded-md text-slate-950 border border-gray-200 ease-linear transition-transform  w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center
                  ${sidebarResized ? "rotate-180" : ""}
              `}
            >
              <span className="sr-only"></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <nav className="h-full pt-10">
          <ul className="text-gray-700 space-y-2">
            <NavLink to="/usuario">
              <li onClick={() => handleTabSelect("inicio")}>
                <a
                  className={`
                    flex items-center gap-x-4 px-3 py-2.5 rounded-md hover:bg-gray-400 hover:text-white ${selectedTab.inicio ? "text-green-500 bg-gray-200" : ""}
                  `}
                >
                  <span className="min-w-max inline-flex">
                    <div className="flex justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                      </svg>
                      <span className={`${sidebarResized ? "lg:invisible" : ""}`}>
                        <a href="" className="pl-3">Inicio</a>
                      </span>
                    </div>
                  </span>
                </a>
              </li>
            </NavLink>

            <NavLink to="/perfil">
              <li onClick={() => handleTabSelect("Perfil")}>
                <a
                  className={`
                    flex items-center gap-x-4 px-3 py-2.5 rounded-md hover:bg-gray-400 hover:text-white ${selectedTab.usuarios ? "text-green-500 bg-gray-200" : ""}
                  `}
                >
                  <span className="min-w-max inline-flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                    </svg>
                    <span className={`${sidebarResized ? "lg:invisible" : ""}`}>
                      <a href="" className="pl-3">Perfil</a>
                    </span>
                  </span>
                </a>
              </li>
            </NavLink>
            <NavLink to="/eventosU">
              <li onClick={() => handleTabSelect("Reservar")}>
                <a
                  className={`
                    flex items-center gap-x-4 px-3 py-2.5 rounded-md hover:bg-gray-400 hover:text-white ${selectedTab.instalaciones ? "text-green-500 bg-gray-200" : ""}
                  `}
                >
                  <span className="min-w-max inline-flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={`${sidebarResized ? "lg:invisible" : ""}`}>
                      <a href="" className="pl-3">Calendario</a>
                    </span>
                  </span>
                </a>
              </li>
            </NavLink>
            <NavLink to="/mireservaciones">
              <li onClick={() => handleTabSelect("Mis Reservas")}>
                <a
                  className={`
                    flex items-center gap-x-4 px-3 py-2.5 rounded-md hover:bg-gray-400 hover:text-white ${selectedTab.reservas ? "text-green-500 bg-gray-200" : ""}
                  `}
                />
              </li>
            </NavLink>
          </ul>
        </nav>

        <div className="flex flex-col gap-y-2 text-gray-700 rounded-md hover:bg-slate-600 hover:text-green-500 mb-3">
          <button
            className="outline-none flex items-center px-4 py-2.5 gap-x-3"
            onClick={handleLogout}
          >
            
            
          </button>
        </div>
      </aside>

      <main>
        <div className="flex lg:hidden fixed right-2 top-2 p-4">
          <button
            onClick={() => {
              toggleSidebar();
            }}
            className="p-3 rounded-full bg-green-600 dark:bg-green-800 outline-none w-12 aspect-square flex flex-col relative justify-center items-center"
          >
            <span className="sr-only">toggle sidebar</span>
            <span
              className={`
                          w-6 h-0.5 rounded-full bg-gray-300 transition-transform duration-300 ease-linear
                          ${sidebarToggled ? "rotate-[40deg] translate-y-1.5" : ""}
                      `}
            />
            <span
              className={`
                          w-6 origin-center mt-1 h-0.5 rounded-full bg-gray-300 transition-all duration-300 ease-linear
                          ${sidebarToggled ? "opacity-0 scale-x-0" : ""}
                      `}
            />
            <span
              className={`
                          w-6 mt-1 h-0.5 rounded-full bg-gray-300 transition-all duration-300 ease-linear
                          ${sidebarToggled ? "-rotate-[40deg] -translate-y-1.5" : ""}
                      `}
            />
          </button>
        </div>
      </main>
    </>
  );
};

export default SidebarUser;