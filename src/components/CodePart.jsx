import { FaCode } from "react-icons/fa";
import LanguageDropdown from "./LanguageDropdown";
import CodeEditorWindow from "./CodeEditor";
import ThemeDropdown from "./ThemeDropdown";
import { useState } from 'react';

function CodePart({ problem }) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    // Do whatever you need with the selected language here
    console.log(language);
  };

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    // Do whatever you need with the selected theme here
    console.log(theme);
  }

  return (
    <div className="card">
      <div className="mt-4 mr-4 border pl-4 pt-4 pb-80 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md ">
       
        <div className="flex items-center ml-4">       
          <FaCode size={28} className="text-twilight-400" />
          <h2 className="text-2xl font-bold text-twilight-400 px-2">Code</h2>
          <div className="flex-grow justify-between" />
            <div className="flex items-center gap-8">
                <LanguageDropdown onLanguageSelect={handleLanguageSelect} />
                <ThemeDropdown onThemeSelect={handleThemeSelect} />
           </div>
        </div>
        <hr className="border-twilight-200 mt-1 mr-8 ml-4" />  
        

        <div className="h-full mt-10">
            <CodeEditorWindow
                code={`
              function fibonacci(num) {
                let a = 0, b = 1, temp;
                let result = [];
                for (let i = 0; i < num; i++) {
                  result.push(a);
                  temp = a;
                  a = b;
                  b = temp + b;
                }
                return result;
              }console.log(fibonacci(10)); // Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
            `}
            onChange={(language, theme) => {
                handleLanguageSelect({ value: language });
                handleThemeSelect({ value: theme });
            }}

                language={selectedLanguage ? selectedLanguage.value : "javascript"} // Use selected language here
                theme={selectedTheme ? (console.log("Tema selectată:", selectedTheme.value), selectedTheme.value) : "vs-dark"}

             />
        </div>
      </div>
        </div>

    
  );
}

export default CodePart;
