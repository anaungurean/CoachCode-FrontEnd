import  { useState } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import { Code } from 'lucide-react';
import { showErrorToast, showSuccessToast }  from './notifications';

function Popup({ togglePopup, setEnteredCode, setSelectedLanguage }) {
  const [language, setLanguage] = useState('');
  const [code, setCode] =  useState('');
 

  const handleCodeChange = (event) => {
    setCode(event.target.value);
    };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    };
 
  const handleSubmit = () => {
    if (language === '' || code === '') {
        showErrorToast('Please select a language and enter code');
      return;
    }
    setEnteredCode(code);
    setSelectedLanguage(language);
    showSuccessToast('Code submitted successfully');
    togglePopup(false);
    
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50">
        <div className="relative p-4 max-w-6xl w-full h-80p">
         <div className="relative bg-white rounded-lg shadow-md border-gray-300 h-full">
          <div className='flex justify-start items-center h-10p bg-twilight-300 rounded-t-lg'>
            <Code size={24} className="mr-2 ml-4 text-white" />
            <h2 className="text-2xl font-semibold text-white px-2">Code</h2>
            <button
              onClick={() => togglePopup(false)}
              type="button"
              className="absolute right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-twilight-400 rounded-lg text-sm w-6 h-6 inline-flex justify-center items-center"
              data-modal-hide="popup-modal"
            >
              <X size={24} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5 text-left h-90p">
            <div className="flex flex-col gap-4 h-full">
              <label htmlFor="language" className="font-semibold">Select Programming Language:</label>
              <select id="language" className="border border-gray-300 rounded-md p-2 bg-purple-50" onChange={handleLanguageChange}>
                <option value="">Select Language</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="ruby">Ruby</option>
                <option value="php">PHP</option>
              </select>

              <label htmlFor="code" className="font-semibold">Enter Code:</label>
               
              <textarea id="code" className="border border-gray-300 rounded-md p-2 h-80p bg-purple-50" rows="5" onChange={handleCodeChange}></textarea>
              <button className="bg-twilight-300 text-white py-2 px-4 rounded-md" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Popup.propTypes = {
  togglePopup: PropTypes.func.isRequired,
  setEnteredCode: PropTypes.func.isRequired,
  setSelectedLanguage: PropTypes.func.isRequired,
};

export default Popup;
