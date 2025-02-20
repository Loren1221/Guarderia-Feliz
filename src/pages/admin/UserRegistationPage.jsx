
// import { useState } from "react";
// import { useRegister } from "../../hooks/useRegister";
// import { useRoles } from "../../hooks/useRoles";
// import Layout from "../../components/Layout";

// const UserRegistration = () => {
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

// export default UserRegistration;
import { useState } from "react";
import { useRegister } from "../../hooks/useRegister";
import { useRoles } from "../../hooks/useRoles";
import Layout from "../../components/Layout";

const UserRegistration = () => {
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
    await registerUser({ name, last_name, id_rol, phone, email, password, cedula });
  };

  return (
    <Layout>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Registro de Usuario</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Nombre" value={name} required onChange={(e) => setName(e.target.value)} className="input-field" />
              <input type="text" placeholder="Apellido" value={last_name} required onChange={(e) => setLastname(e.target.value)} className="input-field" />
            </div>
            <input type="email" placeholder="Correo" value={email} required onChange={(e) => setEmail(e.target.value)} className="input-field" />
            <input type="password" placeholder="Contraseña" value={password} required onChange={(e) => setPassword(e.target.value)} className="input-field" />
            <input type="text" placeholder="Teléfono" value={phone} required onChange={(e) => setPhone(e.target.value)} className="input-field" />
            <input type="text" placeholder="Cédula (000-0000000-0)" value={cedula} required onChange={(e) => setCedula(e.target.value)} className="input-field" />
            <select value={id_rol} required onChange={(e) => setRole(e.target.value)} className="input-field">
              <option>Seleccione un Rol</option>
              {loading ? <option>Cargando...</option> : rolesError ? <option>Error cargando roles</option> : roles.map((role) => (
                <option key={role.id} value={role.id}>{role.rol_name}</option>
              ))}
            </select>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500">Registrar</button>
          </form>
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default UserRegistration;

// Estilos generales para los inputs
document.head.insertAdjacentHTML("beforeend", `
  <style>
    .input-field {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      outline: none;
      transition: border-color 0.3s;
    }
    .input-field:focus {
      border-color: #4f46e5;
    }
  </style>
`);
