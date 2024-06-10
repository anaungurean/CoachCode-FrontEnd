import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import { useParams } from 'react-router-dom';
import EthanChat from './components/EthanChat';
import AvaChat from './components/AvaChat';
import Popup from './components/PopUp';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';


function VoiceChatBotPage() {

  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
 

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

  const botName = capitalizeFirstLetter(useParams().botName);

  const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'Voice Assistants', link: '/bots' },
    { name: `${botName}`, link: null },
  ];

  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };


  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <NavBar />
      </div>
      <div className="flex flex-col w-5/6 h-full ">
         <Breadcrumb items={breadcrumbItems} /> 
         {
          botName === "Ethan" && (
            <>
              <ToastContainer />
              <EthanChat 
                openPopup={openPopup} 
                selectedLanguage={selectedLanguage} 
                enteredCode={enteredCode}
                setSelectedLanguage={setSelectedLanguage}
                setEnteredCode={setEnteredCode}    
                
             />
              {showPopup && <Popup 
                togglePopup={setShowPopup} 
                setEnteredCode={setEnteredCode} 
                setSelectedLanguage={setSelectedLanguage} 
            />}
            </>
          )
         }
         {
          botName === "Ava" && (
            <AvaChat> </AvaChat>
          )

         }
      </div>
    </div>
  );
}

export default VoiceChatBotPage;
