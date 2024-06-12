import { useState } from 'react';
import { Home, HeartHandshake, BrainCircuit, Bot, BadgeHelp      , Users, FileText  } from "lucide-react";
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
        <Link to="/home" onClick={() => handleItemClick("Home")}>
          <SidebarItem icon={<Home size={24} />} text="Home" activeItem={activeItem}  />
        </Link>
        <Link to="/problems" onClick={() => handleItemClick("Coding Practice")}>
          <SidebarItem icon={<BrainCircuit size={24} />} text="Coding Practice" activeItem={activeItem}  />
        </Link>
        <Link to="/bots" onClick={() => handleItemClick("Voice Assistants")}>
        <SidebarItem icon={<Bot size={24} />} text="Voice Assistants" activeItem={activeItem} />
        </Link>
        <Link to="/search-job" onClick={() => handleItemClick("Search jobs")}>
          <SidebarItem icon={<HeartHandshake size={24} />} text="Search jobs" activeItem={activeItem} />
        </Link>
         <Link to="/community" onClick={() => handleItemClick("Community")}>
          <SidebarItem icon={<Users size={24} />} text="Community" activeItem={activeItem} />
        </Link>
        <Link to = "/create-cv" onClick = {() => handleItemClick("Create CV")} >
          <SidebarItem icon={<FileText size={24} />} text="Create CV" activeItem={activeItem} />
        </Link>
        <hr className="my-3" />
        <Link to="/help" onClick={() => handleItemClick("Help")}>
        <SidebarItem icon={<BadgeHelp size={24} />} text="Help" activeItem={activeItem}  />
        </Link>
        

      </Sidebar>
    </div>
  );
}
