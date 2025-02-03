
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";
import LoginPage from "./page/login/LoginPage";
import NotFound from "./page/NotFound";
import Navbar from "./security/Navbar";
import { UserProvider } from "./hooks/useContext";
import PrivateRoute from "./security/PrivateRoute";
import RegisterPage from "./admin/RegisterPage";
import AdminPage from "./admin/AdminPage";
import Dashboard from "./admin/Dashboard";
import RegistrarEstudiante from "./admin/RegistrarEstudiante";

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
          path="/registrarusuario"
          element={
            <PrivateRoute element={<RegisterPage />} role="administrador" />
          }
        />
      

<Route
          path="/estu"
          element={
            <PrivateRoute element={<RegistrarEstudiante />} role="administrador" />
          }
        />
        
       
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  );
}

export default App;


