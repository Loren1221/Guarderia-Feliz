
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const SidebarAdmin = () => {
  const navigate = useNavigate();
  const [sidebarToggled, setSidebarToggled] = useState(false);
  const [sidebarResized, setSidebarResized] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [selectedTab, setSelectedTabs] = useState({
    inicio: false,
    usuarios: false,
    instalaciones: false,
    reservas: false,
    reportesInstalaciones: false,
    reportesUsuarios: false,
    reportesReservas: false,
  });
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
      // Eliminar el token de las cookies
      Cookies.remove("token"); // Asegúrate de que 'token' sea el nombre de la cookie que usas para guardar el token

      // Redirigir al usuario a la página de inicio de sesión
      navigate("/login"); // Reemplaza '/login' con la ruta a tu página de inicio de sesión
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
          fixed h-[100dvh] overflow-hidden lg:static w-11/12 max-w-[18rem] md:w-72 transition-all rounded-br-xl bg-white shadow-md shadow-gray-800/60 flex flex-col justify-between px-4 lg:transition-[width] ease-linear
          ${sidebarToggled ? "" : "-translate-x-full lg:-translate-x-0"}
          ${sidebarResized ? "lg:w-20" : ""}
      `}
      >
        <div className="min-h-max py-3">
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

          
          <NavLink to="/admin">
  <li onClick={() => handleTabSelect("inicio")}>
    <a
      className={`flex items-center gap-x-4 px-3 py-2.5 rounded-md hover:bg-gray-400 hover:text-white ${
        selectedTab.inicio ? "text-green-500 bg-gray-200" : ""
      }`}
    >
      <span className="min-w-max inline-flex">
        <div className="flex justify-center">
          {/* Ícono representando Inicio */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span
            className={`inline-flex ease-linear transition-colors duration-300 ${
              sidebarResized ? "lg:invisible" : ""
            }`}
          >
            <a href="" className="pl-3">Inicio</a>
          </span>
        </div>
      </span>
    </a>
  </li>
</NavLink>
            
<NavLink to="/registrarusuario">
  <li onClick={() => handleTabSelect("usuarios")}>
    <a
      className={`flex items-center gap-x-4 px-3 py-2.5 rounded-md hover:bg-gray-400 hover:text-white ${
        selectedTab.usuarios ? "text-green-500 bg-gray-200" : ""
      }`}
    >
      <span className="min-w-max inline-flex">
        {/* Ícono representando Usuarios */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M16 11c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm-8 0c2.2 0 4-1.8 4-4S10.2 3 8 3 4 4.8 4 7s1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v3h16v-3c0-2.7-5.3-4-8-4zm8 0c-.3 0-.7 0-1 .1 1.2.8 2 1.8 2 3v3h6v-3c0-2.7-5.3-4-8-4z" />
        </svg>
        <span
          className={`inline-flex ease-linear transition-colors duration-300 ${
            sidebarResized ? "lg:invisible" : ""
          }`}
        >
          <a href="" className="pl-3">Usuarios</a>
        </span>
      </span>
    </a>
  </li>
</NavLink>



<NavLink to="/empleado">
  <li onClick={() => handleTabSelect("empleados")}>
    <a
      className={`flex items-center gap-x-4 px-3 py-2.5 rounded-md hover:bg-gray-400 hover:text-white ${
        selectedTab.empleados ? "text-green-500 bg-gray-200" : ""
      }`}
    >
      <span className="min-w-max inline-flex">
        {/* Ícono representando Empleados */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
          >
          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-2.7 0-8 1.3-8 4v3h16v-3c0-2.7-5.3-4-8-4z" />
        </svg>
        <span
          className={`inline-flex ease-linear transition-colors duration-300 ${
            sidebarResized ? "lg:invisible" : ""
          }`}
        >
          <a href="" className="pl-3">Empleados</a>
        </span>
      </span>
    </a>
  </li>
</NavLink>


<NavLink to="/estu">
  <li onClick={() => handleTabSelect("estudiantes")}>
    <a
      className={`flex items-center gap-x-4 px-3 py-2.5 rounded-md hover:bg-gray-400 hover:text-white ${
        selectedTab.estudiantes ? "text-green-500 bg-gray-200" : ""
      }`}
    >
      <span className="min-w-max inline-flex">
        {/* Ícono representando Estudiantes */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M12 2L1.5 7l1.11 1.64 9.39-4.78 9.39 4.78L22.5 7 12 2zm0 4.7L3.74 9 12 13.3 20.26 9 12 6.7zm-8.5 9.2h17v2H3.5v-2z" />
        </svg>
        <span
          className={`inline-flex ease-linear transition-colors duration-300 ${
            sidebarResized ? "lg:invisible" : ""
          }`}
        >
          <a href="" className="pl-3">Estudiantes</a>
        </span>
      </span>
    </a>
  </li>
</NavLink>







<NavLink to="/lista">
  <li onClick={() => handleTabSelect("paseDeLista")}>
    <a
      className={`flex items-center gap-x-4 px-3 py-2.5 rounded-md hover:bg-gray-400 hover:text-white ${
        selectedTab.paseDeLista ? "text-green-500 bg-gray-200" : ""
      }`}
    >
      <span className="min-w-max inline-flex">
        {/* Ícono representando Pase de Lista */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M21 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9 14H6v-2h3v2zm5 0h-4v-2h4v2zm6 0h-3v-2h3v2z" />
        </svg>
        <span
          className={`inline-flex ease-linear transition-colors duration-300 ${
            sidebarResized ? "lg:invisible" : ""
          }`}
        >
          <a href="" className="pl-3">Pase de Lista</a>
        </span>
      </span>
    </a>
  </li>
</NavLink>

<NavLink to="/pago">
  <li onClick={() => handleTabSelect("factura")}>
    <a
      className={`flex items-center gap-x-4 px-3 py-2.5 rounded-md hover:bg-gray-400 hover:text-white ${
        selectedTab.factura ? "text-green-500 bg-gray-200" : ""
      }`}
    >
      <span className="min-w-max inline-flex">
        {/* Ícono representando Factura */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm4 12v-2h4v2H10zM6 6v2h12V6H6z" />
        </svg>
        <span
          className={`inline-flex ease-linear transition-colors duration-300 ${
            sidebarResized ? "lg:invisible" : ""
          }`}
        >
          <a href="" className="pl-3">Factura</a>
        </span>
      </span>
    </a>
  </li>
</NavLink>

<NavLink to="/event">
  <li onClick={() => handleTabSelect("eventos")}>
    <a
      className={`flex items-center gap-x-4 px-3 py-2.5 rounded-md hover:bg-gray-400 hover:text-white ${
        selectedTab.eventos ? "text-green-500 bg-gray-200" : ""
      }`}
    >
      <span className="min-w-max inline-flex">
        {/* Ícono representando Eventos */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M12 1.5a9.5 9.5 0 1 0 9.5 9.5A9.5 9.5 0 0 0 12 1.5zM11 6h2v6h-2zm1 12.5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z" />
        </svg>
        <span
          className={`inline-flex ease-linear transition-colors duration-300 ${
            sidebarResized ? "lg:invisible" : ""
          }`}
        >
          <a href="" className="pl-3">Eventos</a>
        </span>
      </span>
    </a>
  </li>
</NavLink>


            
              <a
                className={`
       flex items-center gap-x-4 px-3 py-2.5 rounded-md hover:bg-gray-400 hover:text-white 
    `}
                onClick={toggleDropdown}
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
                      d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span
                    className={`
          inline-flex items-center ease-linear transition-colors duration-300
          ${sidebarResized ? "lg:invisible" : ""}
        `}
                  >
                    <a className="px-3">Reportes</a>
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="currentColor"
  className={`w-5 h-5 transition-transform duration-300 transform ${
    isDropdownOpen ? "rotate-180" : ""
  } ml-auto`}
>
  <path
    fillRule="evenodd"
    d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
    clipRule="evenodd"
  />
</svg>
</span>
</span>
</a>
{isDropdownOpen && (
  <ul className="text-gray-700 space-y-2">
    <NavLink to="/reportes">
      <li onClick={() => handleTabSelect("reportesUsuarios")}>
        <a
          className={`
            flex items-center gap-x-4 px-3 py-2.5 rounded-md hover:bg-gray-400 hover:text-white ${
              selectedTab.reportesUsuarios ? "text-green-500 bg-gray-200" : ""
            }  
          `}
        >
          <span className="min-w-max inline-flex">
            {/* Ícono para Reportes de Usuarios */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M9.75 3a6.75 6.75 0 1 1 0 13.5h-3v3a.75.75 0 0 1-1.28.53L1.5 15.28a.75.75 0 0 1 0-1.06l3.97-3.97A.75.75 0 0 1 6.75 10.5h3a6.75 6.75 0 0 0 0-13.5Z" />
            </svg>
            <span
              className={`
                inline-flex ease-linear transition-colors duration-300
                ${sidebarResized ? "lg:invisible" : ""}
              `}
            >
              <a href="#" className="pl-3">
                R_Usuarios
              </a>
            </span>
          </span>
        </a>
      </li>
    </NavLink>
    <NavLink to="/reportEst">
      <li onClick={() => handleTabSelect("reportesEstudiantes")}>
        <a
          className={`
            flex items-center gap-x-4 px-3 py-2.5 rounded-md hover:bg-gray-400 hover:text-white ${
              selectedTab.reportesEstudiantes ? "text-green-500 bg-gray-200" : ""
            }  
          `}
        >
          <span className="min-w-max inline-flex">
            {/* Ícono para Reportes de Estudiantes */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm0 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm-.75 4.5a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-1.5 0V9zm-.375 6a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75z" />
            </svg>
            <span
              className={`
                inline-flex ease-linear transition-colors duration-300
                ${sidebarResized ? "lg:invisible" : ""}
              `}
            >
              <a href="#" className="pl-3">
                R_Estudiantes
              </a>
            </span>
          </span>
        </a>
      </li>
    </NavLink>
    <NavLink to="/reportesEmpleados">
      <li onClick={() => handleTabSelect("reportesEmpleados")}>
        <a
          className={`
            flex items-center gap-x-4 px-3 py-2.5 rounded-md hover:bg-gray-400 hover:text-white ${
              selectedTab.reportesEmpleados ? "text-green-500 bg-gray-200" : ""
            }  
          `}
        >
          <span className="min-w-max inline-flex">
            {/* Ícono para Reportes de Empleados */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M16.5 3a6.75 6.75 0 1 1-6.75 6.75A6.75 6.75 0 0 1 16.5 3zm0 9a2.25 2.25 0 1 0-2.25-2.25A2.25 2.25 0 0 0 16.5 12zm-4.5 3c-2.5 0-6 1.5-6 4.5a.75.75 0 0 0 .75.75h10.5a.75.75 0 0 0 .75-.75c0-3-3.5-4.5-6-4.5z" />
            </svg>
            <span
              className={`
                inline-flex ease-linear transition-colors duration-300
                ${sidebarResized ? "lg:invisible" : ""}
              `}
            >
              <a href="#" className="pl-3">
                R_Empleados
              </a>
            </span>
          </span>
        </a>
      </li>
    </NavLink>
  </ul>
)}

                  
                </ul>
              
        </nav>
        <div className="flex flex-col gap-y-2 text-gray-700 rounded-md hover:bg-slate-600 hover:text-green-500 mb-3">
          <button
            className="outline-none flex items-center px-4 py-2.5 gap-x-3"
            onClick={handleLogout}
          >
            <span className="min-w-max inline-flex pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              <span
                className={`
                                      inline-flex ease-linear transition-colors duration-300
                                      ${sidebarResized ? "lg:invisible" : ""}`}
              >
                <a href="" className="ml-3">
                  Cerrar sesión
                </a>
              </span>
            </span>
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
                          ${
                            sidebarToggled
                              ? "rotate-[40deg] translate-y-1.5"
                              : ""
                          }
                      `}
            />
            <span
              className={`
                          w-6 origin-center  mt-1 h-0.5 rounded-full bg-gray-300 transition-all duration-300 ease-linear
                          ${sidebarToggled ? "opacity-0 scale-x-0" : ""}
                      `}
            />

            <span
              className={`
                          w-6 mt-1 h-0.5 rounded-full bg-gray-300 transition-all duration-300 ease-linear
                          ${
                            sidebarToggled
                              ? "-rotate-[40deg] -translate-y-1.5"
                              : ""
                          }
                      `}
            />
          </button>
        </div>
      </main>
    </>
  );
};
export default SidebarAdmin;