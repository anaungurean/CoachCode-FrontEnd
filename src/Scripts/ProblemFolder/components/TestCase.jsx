import 'react-circular-progressbar/dist/styles.css'; // Make sure to import the styles
import { ShieldQuestion } from 'lucide-react';
import  { useState } from 'react';
import { Play } from 'lucide-react';
import useCtrlShiftHandler from './useCtrlShiftHandler';
import { Info } from 'lucide-react';
import PropTypes from 'prop-types';
import { IoAlertCircleOutline } from "react-icons/io5";
import { Bug } from 'lucide-react';
import { toast } from 'react-toastify';

function TestCase({input_variables, solution, code, languageId}) {
  const [isHovered, setIsHovered] = useState(false);
  const [errorCode, setErrorCode] = useState(null);
  const [, setErrorSolution] = useState(null);
  const [stdoutCode, setStdoutCode] = useState(null);
  const [stdoutSolution, setStdoutSolution] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log('Solution: ')
  console.log(solution)

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
  };


  const runCode = async (idLanguage, codeToTest, input, type) => {
      setErrorCode(null);
      setErrorSolution(null);
      setStdoutCode(null);
      setStdoutSolution(null);
      setSubmitted(false);
      const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*';
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': ' 90b30b5ac0msh0106a7cb5e9a100p1f3f01jsn7c9472be0b73',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        body: JSON.stringify({
          language_id: idLanguage,
          source_code: btoa(codeToTest),
          stdin: btoa(input),
        })
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (type === 1) {
          checkStatusCode(result.token);
        }
        else if (type === 2) {
          checkStatusSolution(result.token);
          setSubmitted(true);
        }
        
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

const handleSubmit = () => {
      if (!languageId) {
        showErrorToast('Please select a language!');
        return;
      }
      setIsLoading(true);       
      const inputFields = document.querySelectorAll('input[type="text"]');
      let values = '';
      inputFields.forEach((input, index) => {
        if (index !== 0) {
          values += '\n';
        }
        values += input.value;
      });

      runCode(languageId.id, code, values, 1);
      runCode(languageId.id, solution, values, 2);

    };


const checkStatusSolution  = async (token ) => {
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': ' 90b30b5ac0msh0106a7cb5e9a100p1f3f01jsn7c9472be0b73',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const statusId = result.status?.id;
    
      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatusSolution(token);
        }, 1000);
      }
      else if (statusId === 3  || statusId === 4 || statusId === 5){
          setStdoutSolution(atob(result.stdout));
  
      }
      else if (statusId === 6) {
          setErrorSolution(atob(result.compile_output));
      }
      else if (statusId === 7 || statusId === 8 || statusId === 9 || statusId === 10 || statusId === 11 || statusId === 12) 
        {
          setErrorSolution(atob(result.stderr))
        }
        setIsLoading(false);
      }
    catch (error) {
      console.error(error);
    }     
};

const checkStatusCode = async (token ) => {
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': ' 90b30b5ac0msh0106a7cb5e9a100p1f3f01jsn7c9472be0b73',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const statusId = result.status?.id;
  
      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatusCode(token);
        }, 1000);
      }
      else if (statusId === 3  || statusId === 4 || statusId === 5){
          setStdoutCode(atob(result.stdout));
  
      }
      else if (statusId === 6) {
          setErrorCode(atob(result.compile_output));
      }
      else if (statusId === 7 || statusId === 8 || statusId === 9 || statusId === 10 || statusId === 11 || statusId === 12) 
        {
          setErrorCode(atob(result.stderr))
        }
      
      }
    catch (error) {
      console.error(error);
    }     
};

 


 const handleSubmitWithCtrlShift = () => {
    handleSubmit();
    setIsLoading(true);
  };
  useCtrlShiftHandler(handleSubmitWithCtrlShift);
 


  return (
    <div className="mt-4 mr-4 border pl-4 pt-4 pb-8 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md">
      <div className="flex items-center ml-4">
        <ShieldQuestion size={28} className="mr-2 text-twilight-400" />
        <h2 className="text-2xl font-bold text-twilight-400 px-2">Test case</h2>
         <div className="flex-grow justify-between" />
           <button
            onClick={handleSubmit}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
            className="flex items-center mr-8  justify-center gap-x-1.5 rounded-md bg-purple-50 px-3 py-2 text-sm font-semibold text-twilight-500 shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-purple-200"
            disabled={isLoading}
          >
              {isLoading ? (  
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-purple-500"></div>
                  <span className="ml-2">Loading</span>
                </div>
        ) : (
          <>
            <Play size={18} />
              Run the case
              {isHovered && (
                <span className="ml-2">(Ctrl+Shift)</span>
              )}
          </>
        )}
          </button>
      </div>
      <hr className="border-twilight-200 mt-1 mr-8 ml-4" />
      <div className="mt-4 mr-8 ml-4 mb-4">
        <h1 className="text-black-900 text-lg">Here you can test your code based on a test case: </h1>
      </div>
      <div className="mt-4 mr- ml-4 mb-4">
        <ul className="list-disc ml-4">
          {input_variables.map((input_variable, index) => (
            <li key={index}>
              <div className="flex items-center mt-2">
                <p className="text-twilight-400 text-lg font-semibold">Enter the input for </p>
                <span className={`inline-flex items-center rounded-md px-2 py-1 ml-2 text-sm font-medium bg-purple-100 text-twilight-400 ring-twilight-500/10 ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}>{input_variable.name}</span>
                <p className="text-twilight-400 text-lg font-semibold ml-2">: </p>
                <input
                  type="text"
                  className="border border-twilight-100 rounded-md p-1 bg-purple-100/10 focus:outline-none focus:border-twilight-400 ml-4"
                  placeholder={` ${input_variable.value}`}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-4 mr-8 ml-4 mb-2 flex items-center bg-twilight-100/10 rounded-md p-2'>
        <Info size={24} className="mr-2 ml-4 text-twilight-400" />
        <p className="text-twilight-400">Please enter the inputs like in the example. Use spaces as delimiters.</p>
      </div>
     
     <div className="mt-4 mr-8 ml-4 mb-4">
      
      {submitted? (
        stdoutCode && stdoutCode === stdoutSolution ? (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
            <p className="font-bold text-xl">Test Passed</p>
            <p>Your code passed this test case successfully!</p>
            <ul className="list-disc ml-4">
              <li>
                <p className="text-green-800 text-lg font-semibold">Expected output: {stdoutSolution}</p>
              </li>
              <li>
                <p className="text-green-800 text-lg font-semibold">Your output: {stdoutCode} </p>
              </li>
            </ul>
            <div className='mt-4 mr-8 ml-4 mb-2 flex items-center bg-green-600/10 rounded-md p-2'>
              <div className='flex items-center'>
              <IoAlertCircleOutline size={24} className="mr-2 ml-4 text-green-800" />
              </div>
              <p className="text-green-800">Run all the tests to determine if the code can pass all of them successfully.</p>
            </div>
          </div>
        ) : errorCode ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold text-xl">Test Failed</p>
            <div>
              <p>Your code has an error:</p>
              <div className='mt-2 mr-8 ml-4 mb-2 flex items-center bg-red-600/10 rounded-md p-2'>
                <div className='flex items-center'>
                <Bug size={24} className="mr-2 ml-4 text-red-800" />
                </div>
                <p className='ml-4 text-lg font-semibold'>{errorCode}</p>
              </div>
            </div>
          </div>
        ) : stdoutCode && stdoutCode !== stdoutSolution ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold text-xl">Test Failed</p>
            <p>Your code failed the test case.</p>
            <ul className="list-disc ml-4">
              <li>
                <p className="text-red-800 text-lg font-semibold">Expected output: {stdoutSolution}</p>
              </li>
              <li>
                <p className="text-red-800 text-lg font-semibold">Your output: {stdoutCode} </p>
              </li>
            </ul>
            <div className='mt-4 mr-8 ml-4 mb-2 flex items-center bg-red-600/10 rounded-md p-2'>
              <div className='flex items-center'>
              <Bug size={24} className="mr-2 ml-4 text-red-800" />
              </div>
              <p className="text-red-800">Review your code and try again. </p>
            </div>
          </div>
        ) : null
      ) : null}
    </div>
</div>
);
}

TestCase.propTypes = {
  input_variables: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired,
  solution: PropTypes.string,
  code: PropTypes.string,
  languageId: PropTypes.string,
};
export default TestCase;