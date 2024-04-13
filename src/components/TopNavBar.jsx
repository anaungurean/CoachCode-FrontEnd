import { createContext, useState } from "react";

const TopNavBarContext = createContext();

export default function Navbar({ currentPage, children }) {
    const [expanded, setExpanded] = useState(true);

    return (
        <TopNavBarContext.Provider value={{ expanded, setExpanded }}>
            <div className="mt-3 mr-3">
                <nav className={`flex items-center justify-between bg-white border-r shadow-sm px-4 py-5 rounded-2xl ${expanded ? 'h-16' : 'h-auto'}`}>
                    <div className={`flex items-center ${expanded ? "" : "hidden"}`}>
                        <span className="mr-2 text-gray-600">{currentPage}</span>
                        {children}
                    </div>
                </nav>
            </div>
        </TopNavBarContext.Provider>
    );
}
