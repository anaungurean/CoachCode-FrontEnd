import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import { useParams } from 'react-router-dom';
import EthanChat from './components/EthanChat';
import Popup from './components/PopUp';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

function VoiceChatBotPage() {

  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [enteredCode, setEnteredCode] = useState('');

  const botName =  useParams().botName;
  const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'ChatBot', link: null },
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
          botName === "ethan" && (
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
      </div>
    </div>
  );
}

export default VoiceChatBotPage;
