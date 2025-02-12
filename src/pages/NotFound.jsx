import NotFoundIMG from "../images/NotFound.png";
import { NavLink } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="rid min-h-full place-items-center bg-white px-6 py-10 sm:py-32 lg:px-8">
      <div className="flex justify-center">
        <img
          src={NotFoundIMG}
          alt="NotFound"
          className="w-auto h-80"
        />
      </div>
      <div className="text-center">
        <h1 className="mt-4 text-xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          No se encontró la pagina
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Por favor regrese a la pagina de inicio.
        </p>
        <NavLink to="/">
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-green-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-green-700"
            >
              Volver al Inicio
            </a>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
