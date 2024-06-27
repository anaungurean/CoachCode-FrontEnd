import { useState, useEffect } from 'react';
import { FaCode } from "react-icons/fa";
import LanguageDropdown from "./LanguageDropdown";
import CodeEditorWindow from "./CodeEditor";
import { Play } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCtrlEnterHandler from './useCtrlEnterHandler';
import TestResults from './TestResults';
import TestCase from './TestCase';
import { showErrorToast } from './notifications';
import { Info } from 'lucide-react';

function CodePart(problem) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState({ value: 'vs-light' });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [code, setCode] = useState("");
  const [memory, setMemory] = useState(0);
  const [time, setTime] = useState(0);
  const [passedTests, setPassedTests] = useState(0);
  const [failedTests, setFailedTests] = useState(0);
  const [compilationError, setCompilationError] = useState(null);
  const [executionError, setExecutionError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [solution, setSolution] = useState(null);
  const tests = problem.problem.tests || [];
  const input_variables = problem.problem.input_variables || [];
  const [isLoading, setIsLoading] = useState(false);
  
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
    for (let i = 0; i < problem.problem.base_code.length; i++) {
    if (language.value === problem.problem.base_code[i].language) {
      setCode(problem.problem.base_code[i].base_code);
      break;
    }
  }
  
  if (language.value === 'python' && problem.problem.solution.python) {
      setSolution(problem.problem.solution.python);
    }
    else if (language.value === 'java' && problem.problem.solution.java) {
      setSolution(problem.problem.solution.java);
    }
  
};


  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  useEffect(() => {
    setSelectedTheme(isDarkMode ? { value: 'vs-dark' } : { value: 'vs-light' });
  }, [isDarkMode]);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
  };

  const handleSubmit = async () => {
    setMemory(0);
    setTime(0);
    setPassedTests(0);
    setFailedTests(0);
    setSubmitted(false);
    setCompilationError(null);
    setExecutionError(null);

    if (!selectedLanguage) {
      showErrorToast('Please select a language.');
      return;
    }
        setIsLoading(true);

    const runCode = async (selectedLanguage, code, input, expectedOutput) => {
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
          stdin: btoa(input),
          expected_output: btoa(expectedOutput)
        })
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        await checkStatus(result.token);
        
      } catch (error) {
        console.error(error);
      }
    };
        
    for (let i = 0; i < tests.length; i++) {
 
      if (selectedLanguage.value === 'python') {
        await runCode(selectedLanguage, code, tests[i].input, tests[i].output_python);
      }
      else if (selectedLanguage.value === 'java') {
        await runCode(selectedLanguage, code, tests[i].input, tests[i].output_java);
      }

    }

     setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
    }, 1000);


  };

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
      const statusId = result.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 1000);
      } else if (statusId === 3) {
        setPassedTests(prevState => prevState + 1);
              console.log('result' + atob(result.stdout))

      } else if (statusId === 4) {
        setFailedTests(prevState => prevState + 1);

  
      } else if (statusId === 6) {
        setCompilationError(atob(result.compile_output));
  
      } else if (statusId === 7 || statusId === 8 || statusId === 9 || statusId === 10 || statusId === 11 || statusId === 12) {
        setExecutionError(atob(result.stderr));
       
      } else {
        console.error('An error occurred while checking the status of the submission.');
      }

      if (memory < result.memory) {
        setMemory(result.memory);
      }
      if (time < result.time) {
        setTime(result.time);
      }
    } catch (error) {
      console.error(error);
    }
  };



  
  return (
    <div>
      <ToastContainer />
      <div className="mt-4 mr-4 border pl-4 pt-4 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md ">
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
            Run the tests
            {isHovered && (
              <button className="  ">
                (Ctrl+Enter)
              </button>
            )}
          </button>
        </div>
        <hr className="border-twilight-200 mt-1 mr-8 ml-4" />
        <div className="h-auto mt-4 mr-8 ml-4 mb-4">
          <CodeEditorWindow
            code={code}
            onChange={handleCodeChange}
            language={selectedLanguage}
            theme={selectedTheme.value}
          />
        </div>
        <div className='mt-4 mr-8 ml-4 mb-2 flex items-center bg-twilight-100/10 rounded-md p-2'>
          <Info size={24} className="mr-2 ml-4 text-twilight-400" />
          <p className="text-twilight-400">Please complete the code based on the programming language. </p>
      </div>

      </div>
   {submitted &&  (
        <div>
          <TestResults
            memory={memory}
            time={time}
            passedTests={passedTests}
            failedTests={failedTests}
            compilationError={compilationError}
            executionError={executionError}
            language={selectedLanguage}
            submission = {code}
            problem_id = {problem.problem.id}
          />
      </div>
    )}
   {isLoading && 
                <div className="text-center mt-4 mr-4 py-4 bg-white border border-twilight-100 rounded-2xl overflow-hidden text-twilight-500 font-semibold text-xl">
                    <div className="flex justify-center items-center flex-row">
                        <button type="button" className="text-twilight-100 px-4 py-2 rounded" disabled>
                            <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="twilight-100" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="twilight-500" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                        </button>
                         The tests are running...
                    </div>
                </div>
        }
    <div> 
    <TestCase
        input_variables={input_variables}
        solution={solution}
        code = {code}
        languageId = {selectedLanguage}
    />
    </div>
 
  </div>
    
  );
}

export default CodePart;
