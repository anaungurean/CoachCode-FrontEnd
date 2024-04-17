import { useState, useEffect } from 'react';
import { FaCode } from "react-icons/fa";
import LanguageDropdown from "./LanguageDropdown";
import CodeEditorWindow from "./CodeEditor";
import {Play} from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCtrlEnterHandler from './useCtrlEnterHandler';


function CodePart() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [code, setCode] = useState("");  

  useEffect(() => {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  const handleSubmitWithCtrlEnter = () => {
    handleSubmit();
  };

  useCtrlEnterHandler(handleSubmitWithCtrlEnter);


  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    handleLanguageSelect(selectedLanguage);
  };

  useEffect(() => {
    setSelectedTheme(isDarkMode ? { value: 'vs-dark' } : { value: 'vs-light' }); // Actualizare temă în funcție de modul de culoare preferat
  }, [isDarkMode]);

  const checkStatus = async (token) => {
  const url = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4a56b76aaemsh6ecc8c35a877da9p17eb47jsnd5868075e36e',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result); // Afișează rezultatul statusului în consolă (poți face și altceva cu el)
    
    const statusId = result.status?.id;
    if (statusId === 1 || statusId === 2) {
      setTimeout(() => {
        checkStatus(token);
      }, 1000); // Așteaptă un interval și verifică din nou statusul
    }  
    console.log(atob(result.stderr));
    console.log(atob(result.stdout));
  } catch (error) {
    console.error(error);
  }
};

const showErrorToast = (msg, timer) => {
  toast.error(msg || `Something went wrong! Please try again.`, {
    position: "top-right",
    autoClose: timer ? timer : 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

   const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
  };

const handleSubmit = async () => {

    if (!selectedLanguage) {
        console.log(selectedLanguage);
        showErrorToast('Please select a language!');
         return;
    }
    console.log(selectedLanguage);
    console.log(code);
    const nums = [2, 7, 11, 15];
    const target = 9;
    const expectedOutput = [0, 1]; // Output-ul așteptat

    const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '4a56b76aaemsh6ecc8c35a877da9p17eb47jsnd5868075e36e',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        body: JSON.stringify({
            language_id: selectedLanguage.id,
            source_code: btoa(code),
            stdin: btoa(JSON.stringify({ nums, target })), // Datele de intrare sunt incluse în cerere
            expected_output: JSON.stringify(expectedOutput) // Output-ul așteptat este inclus în cerere
        })
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result); // Afișează rezultatul în consolă (poți face și altceva cu el)
        checkStatus(result.token); // Verifică statusul submisiei
  
    } catch (error) {
        console.error(error);
    }
};


  return (
    
    <div className="card">
      <ToastContainer />
      <div className="mt-4 mr-4 border pl-4 pt-4 pb-80 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md ">
        <div className="flex items-center ml-4">       
          <FaCode size={28} className="text-twilight-400" />
          <h2 className="text-2xl font-bold text-twilight-400 px-2">Code</h2>
          <div className="flex-grow justify-between" />
          <LanguageDropdown onLanguageSelect={handleLanguageSelect} />
            <button
            onClick={handleSubmit}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
            className="flex items-center mr-8  justify-center gap-x-1.5 rounded-md bg-purple-50 px-3 py-2 text-sm font-semibold text-twilight-500 shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-purple-200"
          >
            <Play size={18} />
            Run
             {isHovered && (
              <button className="  ">
                (Ctrl+Enter)
              </button>
            )}
           
          </button>
          
        </div>
        <hr className="border-twilight-200 mt-1 mr-8 ml-4" />  
        <div className="h-full mt-4 mr-8 ml-4">
          <CodeEditorWindow
            code={code}
            onChange={handleCodeChange}
            language={selectedLanguage}
            theme={selectedTheme ? selectedTheme.value : "vs-dark"}
          />
        </div>
      </div>
    </div>
  );
}

export default CodePart;
