import { useState } from 'react';
import { Home, HeartHandshake, BrainCircuit, Bot, Landmark, Settings, Users } from "lucide-react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { Link } from 'react-router-dom';

export default function NavBar() {
   const [activeItem, setActiveItem] = useState(localStorage.getItem("activeItem") || "Home");

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    localStorage.setItem("activeItem", itemName);
  }


  return (
    <div className="flex">
      <Sidebar>
        <Link to="/" onClick={() => handleItemClick("Home")}>
          <SidebarItem icon={<Home size={20} />} text="Home" activeItem={activeItem}  />
        </Link>
        <Link to="/problems" onClick={() => handleItemClick("Coding Practice")}>
          <SidebarItem icon={<BrainCircuit size={20} />} text="Coding Practice" activeItem={activeItem}  />
        </Link>
        <SidebarItem icon={<Bot size={20} />} text="Voice Chatbot" activeItem={activeItem} active={activeItem} />
        <SidebarItem icon={<Landmark size={20} />} text="Salary Test" activeItem={activeItem}  />
        <Link to="/search-job" onClick={() => handleItemClick("Search jobs")}>
          <SidebarItem icon={<HeartHandshake size={20} />} text="Search jobs" activeItem={activeItem} />
        </Link>
         <Link to="/community" onClick={() => handleItemClick("Community")}>
          <SidebarItem icon={<Users size={20} />} text="Community" activeItem={activeItem} />
        </Link>
        <hr className="my-3" />
        <SidebarItem icon={<Settings size={20} />} text="Settings" activeItem={activeItem}  />
      </Sidebar>
    </div>
  );
}
