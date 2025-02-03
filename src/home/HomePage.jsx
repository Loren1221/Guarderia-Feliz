


import LogoHo from "../images/LogoHome.png"; // Si estás utilizando una imagen
import { NavLink } from "react-router-dom";
import Footer from "../home/Footer";
import { motion } from "framer-motion";
import { FaUser, FaHeart, FaStar, FaPhone } from "react-icons/fa"; // Íconos actualizados

export default function HomePage() {
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Header */}
      <header className="fixed top-0 w-full text-white body-font z-50 bg-gradient-to-r from-gray-100 to-gray-300 shadow-md p-2">
  <div className="container mx-auto flex flex-wrap p-4 flex-row items-center justify-between">
    <NavLink to="/" className="flex title-font font-medium items-center text-gray-800">
      <span className="ml-2 text-2xl font-extrabold font-cursive">Guardería Feliz</span>
    </NavLink>
    <div className="flex space-x-4">
      <NavLink to="/login">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-green-500 text-white border-0 py-2 px-4 focus:outline-none hover:bg-green-700 transition-all rounded-full text-md shadow-md absolute top-4 right-8"
        >
          <FaUser className="inline-block mr-2" /> Iniciar Sesión
        </motion.button>
      </NavLink>
    </div>
  </div>
</header>


      {/* Hero Section */}
      <section className="text-gray-700 body-font bg-white flex-grow flex items-center">
        <div className="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center">
          <motion.div
            className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="title-font sm:text-6xl text-5xl mb-6 font-bold text-gray-800 font-cursive animate-bounce">
              ¡Guardería Feliz🐟🐬🐢🦜🦢🐤🐧!
            </h1>
            <p class="mb-8 leading-relaxed text-xl text-gray-900 font-semibold">
  En un mundo mágico donde los pequeños juegan, aprenden y crecen felices, 
  cada día está lleno de aventuras y descubrimientos. Los campos brillan con 
  flores coloridas y el aire está lleno del canto de los pájaros. Los niños 
  corren libres, explorando bosques encantados y ríos cristalinos, donde los 
  peces dorados saltan alegremente.
</p>

          </motion.div>
          <motion.div
            className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <img className="object-cover object-center rounded-xl shadow-md border-4 border-teal-200" alt="Guardería Feliz" src={LogoHo} />
          </motion.div>
        </div>
      </section>

      {/* Filosofía Section */}
      <section className="bg-gray-50 py-16">
        <motion.div className="container mx-auto text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h2 className="text-5xl font-extrabold text-gray-800 mb-10 font-cursive">Nuestra Filosofía</h2>
          <div className="flex flex-wrap -mx-4">
            {[{ title: "Misión", text: "Cuidar y educar con amor para que los niños crezcan felices y seguros.", color: "pink-200", icon: <FaHeart className="text-red-600 text-3xl" /> },
              { title: "Visión", text: "Ser la mejor guardería donde cada niño crezca feliz y con valores.", color: "blue-200", icon: <FaStar className="text-yellow-200 text-3xl" /> },
              { title: "Valores", text: "Amor, respeto, diversión, aprendizaje y seguridad.", color: "green-200", icon: <FaHeart className="text-green-600 text-3xl" /> }
            ].map((card, index) => (
              <motion.div key={index} className="lg:w-1/3 md:w-1/2 w-full px-4 mb-10" whileHover={{ scale: 1.05 }}>
                <div className={`bg-white shadow-md rounded-xl p-8 border-4 border-${card.color} hover:bg-${card.color} hover:text-white transition-all flex flex-col items-center`}>
                  {card.icon}
                  <h3 className="font-bold text-2xl text-gray-800 mb-4">{card.title}</h3>
                  <p className="text-gray-800 leading-relaxed font-semibold text-center">{card.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="bg-white py-8 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <p className="text-gray-900 text-xl font-bold animate-pulse">
            ¿No tienes cuenta? Contáctanos y únete a la diversión. <FaPhone className="inline-block ml-2 text-teal-500" />
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
