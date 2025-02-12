

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import LogoNi from "../../images/Logo.png";
import { FaRegEye, FaRegEyeSlash, FaTimes } from 'react-icons/fa';  // Agregar iconos

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [loading, setLoading] = useState(false); // Estado de carga
  const { authLogin } = useLogin();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Activar carga

    if (!email || !password) {
      setError('Por favor, complete todos los campos.');
      setLoading(false); // Desactivar carga si hay error
      return;
    }

    try {
      // Aquí guardamos el token o alguna información del usuario en el localStorage después de un login exitoso
      const response = await authLogin({ email, password });

      // Suponiendo que la respuesta tenga un token
      if (response.token) {
        // Guardar el token en el localStorage (o en otro almacenamiento persistente)
        localStorage.setItem('authToken', response.token);
        
        // Simulamos el tiempo de carga antes de redirigir
        setTimeout(() => {
          setLoading(false);
          navigate('/dashboard'); // Redirigir al dashboard o la página que elijas
        }, 2000); // Duración de la animación de carga
      }
    } catch (error) {
      setError('Credenciales incorrectas. Inténtelo nuevamente.');
      setLoading(false); // Desactivar carga si falla la autenticación
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogout = () => {
    // Lógica para cerrar sesión: limpiar el localStorage o cualquier otro estado
    localStorage.removeItem('authToken');
    navigate('/'); // Redirigir a la página de inicio después de cerrar sesión
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-pink-50 to-purple-100 p-6 relative">
      {/* Icono de cerrar sesión en la parte superior derecha */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 text-xl text-gray-700 hover:text-gray-900 transition-colors"
      >
        <FaTimes />
      </button>

      {/* Logo e introducción */}
      <div className="text-center mb-10 animate-fade-in-up">
        <img
          alt="Guardería Feliz"
          src={LogoNi}
          className="h-28 w-auto mx-auto mb-6 drop-shadow-lg hover:scale-110 transition-transform duration-300"
        />
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 drop-shadow-md">
           Guardería Feliz
        </h1>
      </div>

      {/* Carga de progreso */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center z-10">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-purple-600 border-solid"></div>
        </div>
      )}

      {/* Formulario */}
      <div className={`w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-gray-200 hover:shadow-3xl transition-shadow duration-300 ${loading ? 'opacity-50' : ''}`}>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 focus:outline-none hover:shadow-md"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 focus:outline-none hover:shadow-md"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-center text-sm text-red-500 animate-shake">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-transform transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          ¿No tienes cuenta?{' '}
          <a
            href="/register"
            className="text-purple-500 font-medium hover:underline hover:text-purple-700 transition-colors"
          >
            Contactanos
          </a>
        </p>
      </div>
    </div>
  );
}

