import { Home, HeartHandshake,BrainCircuit , Bot, Landmark, Settings } from "lucide-react";
import Sidebar, { SidebarItem } from "./Sidebar";

export default function NavBar(){
return (
    <>
      <div className="flex">
        <Sidebar>
          <SidebarItem icon={<Home size={20} />} text="Home" alert />
          <SidebarItem icon={<BrainCircuit size={20} />} text="Coding Practice" active />
          <SidebarItem icon={<Bot size={20} />} text="Voice Chatbot" alert />
          <SidebarItem icon={<Landmark  size={20} />} text="Salary Test" />
          <SidebarItem icon={<HeartHandshake   size={20} />} text="Job Listings" />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
        </Sidebar>
      </div>
    </>
)
}
