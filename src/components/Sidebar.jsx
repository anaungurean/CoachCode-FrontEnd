/* eslint-disable react/prop-types */
import { ChevronFirst, ChevronLast } from "lucide-react"
import logo from "../assets/Logo.png"
import { createContext, useContext, useState } from "react"
import { Moon, Sun } from "lucide-react"

const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const [isDarkMode, setIsDarkMode] = useState('false')

    const toggleTheme = () => {
        setIsDarkMode((curr) => (curr === 'true' ? 'false' : 'true'));
       
    };
    const [expanded, setExpanded] = useState(true);
    return (
        <>
            <aside className="fixed top-3 bottom-3 left-2">
                <nav className={`h-full flex flex-col bg-white border-r shadow-sm ${expanded ? 'w-52' : 'w-16'} rounded-2xl transition-all`}>
                    <div className="p-4 pb-2 flex justify-between items-center rounded-2xl">
                        <img src={logo} className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} alt="Logo" />
                        <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>

                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>

                   <div className="flex  p-2 border-t ">
                        <button onClick={toggleTheme} className={`ml-2 flex items-row p-1.5 rounded-lg ${isDarkMode === 'true' ? 'bg-purple-100' : 'bg-purple-200'}  ` }  >
                            {isDarkMode === "true" ? <Sun /> : <Moon />}
                            <p  className="ml-1"> 
                                {isDarkMode === "true" ? "Light" : "Dark"} Mode
                            </p>
                        </button>

                 </div>

                </nav>
            </aside>
        </>
    );
}


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
