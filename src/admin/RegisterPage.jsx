// import { useState } from "react";
// import { useRegister } from "../hooks/useRegister";
// import { useRoles } from "../hooks/useRoles";
// import Layout from "../security/Layout";

// const RegisterPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [last_name, setLastname] = useState("");
//   const [phone, setPhone] = useState("");
//   const [cedula, setCedula] = useState("");
//   const [id_rol, setRole] = useState("");
//   const { registerUser, error } = useRegister();
//   const { roles, loading, error: rolesError } = useRoles();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     await registerUser({
//       name,
//       last_name,
//       id_rol,
//       phone,
//       email,
//       password,
//       cedula,
//     });
//   };

//   return (
//     <Layout>
//       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//           <form onSubmit={handleRegister}>
//             <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
//               <div>
//                 <label className="block text-sm font-semibold leading-6 text-gray-900">
//                   Nombre
//                 </label>
//                 <div className="mt-2.5">
//                   <input
//                     type="text"
//                     value={name}
//                     required
//                     onChange={(e) => setName(e.target.value)}
//                     autoComplete="given-name"
//                     className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold leading-6 text-gray-900">
//                   Apellido
//                 </label>
//                 <div className="mt-2.5">
//                   <input
//                     type="text"
//                     value={last_name}
//                     required
//                     onChange={(e) => setLastname(e.target.value)}
//                     autoComplete="family-name"
//                     className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//               <div className="sm:col-span-2">
//                 <div className="py-3">
//                   <label className="block text-sm font-semibold leading-6 text-gray-900">
//                     Correo
//                   </label>
//                   <div className="mt-2.5">
//                     <input
//                       type="email"
//                       value={email}
//                       required
//                       autoComplete="email"
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                     {error && error.includes("correo electrónico") && (
//                       <p className="mt-1 text-sm text-red-600">{error}</p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="py-3">
//                   <label className="block text-sm font-semibold leading-6 text-gray-900">
//                     Contraseña
//                   </label>
//                   <div className="mt-2.5">
//                     <input
//                       type="password"
//                       value={password}
//                       required
//                       autoComplete="current-password"
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                   </div>
//                 </div>
//                 <div className="py-3">
//                   <label className="block text-sm font-semibold leading-6 text-gray-900">
//                     Telefono
//                   </label>
//                   <div className="mt-2.5">
//                     <input
//                       type="text"
//                       value={phone}
//                       required
//                       onChange={(e) => setPhone(e.target.value)}
//                       autoComplete="family-name"
//                       className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                   </div>
//                 </div>
//                 <div className="py-3">
//                   <label className="block text-sm font-semibold leading-6 text-gray-900">
//                     Cedula
//                   </label>
//                   <div className="mt-2.5">
//                     <input
//                       type="text"
//                       value={cedula}
//                       placeholder="000-0000000-0"
//                       required
//                       onChange={(e) => setCedula(e.target.value)}
//                       autoComplete="family-name"
//                       className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                   </div>
//                 </div>
//                 <div className="py-3">
//                   <label className="block text-sm font-semibold leading-6 text-gray-900">
//                     Rol
//                   </label>
//                   <div className="mt-2.5">
//                     <select
//                       value={id_rol}
//                       required
//                       onChange={(e) => setRole(e.target.value)}
//                       className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
//                     >
//                       <option>Seleccione un Rol</option>
//                       {loading ? (
//                         <option>Loading...</option>
//                       ) : rolesError ? (
//                         <option>Error loading roles</option>
//                       ) : (
//                         roles.map((role) => (
//                           <option key={role.id} value={role.id}>
//                             {role.rol_name}
//                           </option>
//                         ))
//                       )}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Resgistrar
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default RegisterPage;
import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { useRoles } from "../hooks/useRoles";
import Layout from "../security/Layout";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [last_name, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [cedula, setCedula] = useState("");
  const [id_rol, setRole] = useState("");
  const { registerUser, error } = useRegister();
  const { roles, loading, error: rolesError } = useRoles();

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerUser({
      name,
      last_name,
      id_rol,
      phone,
      email,
      password,
      cedula,
    });
  };

  return (
    <Layout>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12">
        <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Registro</h2>
          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-semibold text-gray-900">Nombre</label>
                <input
                  type="text"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="given-name"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              {/* Apellido */}
              <div>
                <label className="block text-sm font-semibold text-gray-900">Apellido</label>
                <input
                  type="text"
                  value={last_name}
                  required
                  onChange={(e) => setLastname(e.target.value)}
                  autoComplete="family-name"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              {/* Correo */}
              <div>
                <label className="block text-sm font-semibold text-gray-900">Correo</label>
                <input
                  type="email"
                  value={email}
                  required
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
                {error && error.includes("correo electrónico") && (
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-sm font-semibold text-gray-900">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  required
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-semibold text-gray-900">Teléfono</label>
                <input
                  type="text"
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              {/* Cédula */}
              <div>
                <label className="block text-sm font-semibold text-gray-900">Cédula</label>
                <input
                  type="text"
                  value={cedula}
                  placeholder="000-0000000-0"
                  required
                  onChange={(e) => setCedula(e.target.value)}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              {/* Rol */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-900">Rol</label>
                <select
                  value={id_rol}
                  required
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                >
                  <option>Seleccione un Rol</option>
                  {loading ? (
                    <option>Cargando...</option>
                  ) : rolesError ? (
                    <option>Error al cargar los roles</option>
                  ) : (
                    roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.rol_name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Botón de registro */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-all"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
