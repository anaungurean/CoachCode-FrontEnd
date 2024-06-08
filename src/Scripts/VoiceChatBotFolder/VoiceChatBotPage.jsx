 import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import { useParams } from 'react-router-dom';
import EthanChat from './components/EthanChat';
 
function VoiceChatBotPage() {

  const botName =  useParams().botName;

  const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'ChatBot', link: null },
  ];



  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <NavBar />
      </div>
      <div className="flex flex-col w-5/6 h-full ">
         <Breadcrumb items={breadcrumbItems} /> 
           {
            botName === "ethan" && <EthanChat />
           }
           
         </div>
    </div>
  );
}

export default VoiceChatBotPage;
