
// import { Navigate } from 'react-router-dom';
// import { useUser } from '../hooks/useContext';

// const PrivateRoute = ({ element, role }) => {
//   const { user, loading } = useUser();

//   if (loading) {
//     return <div>Loading...</div>; // O tu componente de carga
//   }

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (role && user.role !== role) {
//     return <Navigate to="/" />; // O a una página de acceso denegado
//   }

//   return element;
// };

// export default PrivateRoute;


import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useContext';

const PrivateRoute = ({ element, role }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>; // O tu componente de carga
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

   if (role && user.role !== role) {
     return <Navigate to="/" />; // O a una página de acceso denegado
   }

  return element;
};

export default PrivateRoute;

