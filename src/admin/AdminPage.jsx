import Layout from "../security/Layout";
import Dashboard from "./Dashboard";
import { useUser } from "../hooks/useContext";

export default function AdminPage() {
  const { user } = useUser();
  return (
    <Layout>
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Bienvenido {user ? user.name : "Cargando..."} al Panel de Administración
        </h2>
        <p className="mt-4 text-gray-600">
          Aquí puedes gestionar todos los aspectos del sistema.
          <Dashboard/>
        </p>
      </main>
    </Layout>
  );
}
AdminPage.jsx

