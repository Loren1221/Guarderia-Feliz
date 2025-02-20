
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { UserProvider } from "./hooks/useContext";
import PrivateRoute from "./components/PrivateRoute";
import UsuarioP from "./pages/usuario/UsuarioP";
import AdminPage from "./pages/admin/AdminPage";
import Actividades from "./pages/actividades/Actividades";
import UserRegistration from "./pages/admin/UserRegistationPage";
import Dashboard from "./pages/admin/Dashboard";
import RegistrarEstudiante from "./pages/admin/RegistrarEstudiante";
import PasarLista from "./pages/admin/PasarLista";
import EventsUser from "./pages/usuario/EventsUser";
import RegistrarEmpleado from "./pages/admin/RegistrarEmpleado";
import AdminEvents from "./pages/admin/AdminEvents";
import ReportesEstu from "./reports/ReportesEstu.jsx";
import CambContr from "./pages/usuario/CambContr";
import Perfil from "./pages/usuario/Perfil";
import Cobros from "./pages/admin/Cobros";
import ReporteAsistencia from "./reports/ReporteAsistencia ";
import ReportesPagos from "./reports/ReportesPagos.jsx";
import PadreReports from "./reports/PadreReports.jsx";


function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute element={<AdminPage />} role="administrador" />
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute element={<Dashboard />} role="Administrador" />
          }
        />


        
        <Route
          path="/userregistation"
          element={
            <PrivateRoute element={<UserRegistration />} role="administrador" />
          }
        />

<Route
          path="/empleado"
          element={
            <PrivateRoute element={<RegistrarEmpleado />} role="administrador" />
          }
        />
        <Route
          path="/usuario"
          element={<PrivateRoute element={<UsuarioP />} />}
        />
        <Route
          path="/perfil"
          element={<PrivateRoute element={<Perfil />} />}
          role="estudiante"
        />
        <Route
          path="/cambiar-contrasena"
          element={<CambContr />}
          role="estudiante"
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute element={<Actividades />} role="estudiante" />
          }
        />

        

        <Route
          path="/reportes"
          element={
            <PrivateRoute element={<PadreReports />} role="administrador" />
          }
        />

<Route
          path="/estu"
          element={
            <PrivateRoute element={<RegistrarEstudiante />} role="administrador" />
          }
        />
        
<Route
          path="/lista"
          element={
            <PrivateRoute element={<PasarLista />} role="administrador" />
          }
        />

<Route
          path="/event"
          element={
            <PrivateRoute element={<AdminEvents />} role="administrador" />
          }
        />


<Route
          path="/rep_Asistencia"
          element={
            <PrivateRoute element={<ReporteAsistencia/>} role="administrador" />
          }
        />


        <Route
          path="/eventosU"    
          element={<PrivateRoute element={<EventsUser />} role="estudiante" />}
        />
      

<Route
          path="/pago"    
          element={<PrivateRoute element={<Cobros />} role="administrador" />}
        />

<Route
          path="/reportEst"    
          element={<PrivateRoute element={<ReportesEstu />} role="administrador" />}
        />
        

        
<Route
          path="/reporpago"    
          element={<PrivateRoute element={<ReportesPagos />} role="administrador" />}
        />



        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  );
}

export default App;


