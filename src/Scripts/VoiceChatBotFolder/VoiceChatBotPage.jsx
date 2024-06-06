 import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import Chat from './components/Chat';
 
function VoiceChatBotPage() {
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
           <Chat />
         </div>
    </div>
  );
}

export default VoiceChatBotPage;
