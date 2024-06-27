import { Sun } from "lucide-react";
import logo from "../assets/Logo.png";
import { createContext, useContext, useEffect, useState } from "react";

const SidebarContext = createContext();

// eslint-disable-next-line react/prop-types
export default function Sidebar({ children }) {
   const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1300) {
        setExpanded(false); 
      }
      else if (window.innerHeight <= 700) {
        setExpanded(false); 
      }
      else {
        setExpanded(true);  
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  return (
    <aside className="fixed top-3 bottom-3 left-2">
      <nav
        className={`h-full flex flex-col bg-white border-r shadow-sm ${
          expanded ? "w-52" : "w-16"
        } rounded-2xl transition-all`}
      >
        <div className="p-4 pb-2 flex justify-between items-center rounded-2xl">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt="Logo"
          />

        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="flex p-2 border-t">
        {!expanded && (
            <button
            className={`ml-2 flex items-center p-1.5 rounded-lg bg-purple-100 text-twilight-600"
            hover:bg-purple-300 focus:outline-none focus:ring focus:ring-purple-300 transition-colors duration-300`}
            >
            <Sun size={20} className="text-twilight-600" />
            </button>
        )}
        {expanded && (
            <button
            className={`ml-2 flex items-center p-1.5 rounded-lg bg-purple-100 hover:bg-purple-300 focus:outline-none focus:ring focus:ring-purple-300 transition-colors duration-300`}
            >
            <Sun size={20} className="text-twilight-500" /> 
            <span className="ml-1">Light Mode</span>
            </button>
        )}
        </div>


      </nav>
    </aside>
  );
}


 
 
// eslint-disable-next-line react/prop-types
export function SidebarItem({ icon, text, activeItem }) {
  const { expanded } = useContext(SidebarContext);
  const isActive = activeItem === text;

  return (
    <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${isActive ? "bg-gradient-to-tr from-purple-100 to-purple-200 text-twilight-800" : "hover:bg-twilight-50 text-gray-600"}`}>
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>

      {!expanded && isActive && (
        <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-twilight-100 text-twilight-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
          {text}
        </div>
      )}
    </li>
  );
}
   

