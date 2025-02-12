

import { useUser } from "../hooks/useContext";
export default function Navbar() {
  const { user } = useUser();
  if (user)
    return (
  
      <div className="text-gray-600 body-font border-spacing-5 pb-4">
        <div className="container mx-auto flex flex-wrap p-1 pt-7 flex-col md:flex-row items-center">
          
          </div>
        </div>
    );
}
