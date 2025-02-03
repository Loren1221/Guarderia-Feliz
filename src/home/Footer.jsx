
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (


   
    
    <footer className="bg-gray-100 text-gray-600 body-font  ">
      <div className="container mx-auto px-5 py-16 flex flex-wrap md:flex-nowrap justify-between items-start">
        

        </div >
      {/* Redes Sociales */}
      <div className="bg-black ">
        <div className="container mx-auto py-5 px-5 flex flex-wrap flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-9">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 text-xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 text-xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 text-xl"
            >
              <FaYoutube />
            </a>
          </div>
          <p className="text-sm text-gray-100 mt-4 sm:mt-0">
            ©2025 Guardería Feliz - Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
    
  );
}
