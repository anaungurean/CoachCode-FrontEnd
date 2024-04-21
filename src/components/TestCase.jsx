import 'react-circular-progressbar/dist/styles.css'; // Make sure to import the styles
import { ShieldQuestion } from 'lucide-react';
import  { useState } from 'react';
import { Play } from 'lucide-react';
import useCtrlShiftHandler from './useCtrlShiftHandler';
import { Info } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';


function TestCase({input_variables, solution, code, language}) {
  const [isHovered, setIsHovered] = useState(false);
  const [resultCode, setResultCode] = useState('');
  const [resultSolution, setResultSolution] = useState('');
  

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
  };


  const runCode = async (idLanguage, codeToTest, input, type) => {
      const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*';
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '90b30b5ac0msh0106a7cb5e9a100p1f3f01jsn7c9472be0b73',
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
        checkStatus(result.token, type);
      } catch (error) {
        console.error(error);
      }
    };


    const handleSubmit = () => {
      const inputFields = document.querySelectorAll('input[type="text"]');
      let values = '';
      inputFields.forEach((input, index) => {
        if (index !== 0) {
          values += '\n';
        }
        values += input.value;
      });

      runCode('71', code, values, 1);
      runCode('71', solution, values, 2);
      console.log("resultCode:")
      console.log(resultCode)
      console.log("resultSolution:")
      console.log(resultSolution)
  
    };


const checkStatus = async (token, type ) => {
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '90b30b5ac0msh0106a7cb5e9a100p1f3f01jsn7c9472be0b73',
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
      }
      // console.log(atob(result.stdout));
      // console.log(result)
      // PUNEM CONDITII DE STATUS
      if (type === 1) {
        useEffect(() => {
        console.log("resultCode:", resultCode);
      }, [resultCode]);

    }
    if (type === 2) {
      useEffect(() => {
        console.log("resultSolution:", resultSolution);
      }, [resultSolution]);
    }
  } catch (error) {
    console.error(error);
  }
  };




 const handleSubmitWithCtrlShift = () => {
    handleSubmit();
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
          >
            <Play size={18} />
            Run the case
            {isHovered && (
              <button className="  ">
                (Ctrl+Shift)
              </button>
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
      
      {resultCode && resultSolution ? (
        resultCode.stdout === resultSolution.stdout ? (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
            <p className="font-bold">Test Passed</p>
            <p>Your code passed the test case successfully!</p>
            <ul className="list-disc ml-4">
              <li>
                <p className="text-twilight-400 text-lg font-semibold">Expected output: {resultCode.stdout ? atob(resultCode.stdout) : 'a'}</p>
              </li>
              <li>
                <p className="text-twilight-400 text-lg font-semibold">Your output: {resultSolution.stdout ? atob(resultSolution.stdout) : 'a'}</p>
              </li>
            </ul>
            <div className='mt-4 mr-8 ml-4 mb-2 flex items-center bg-twilight-100/10 rounded-md p-2'>
              <Info size={24} className="mr-2 ml-4 text-twilight-400" />
              <p className="text-twilight-400">Run all the tests to determine if the code has passed all of them successfully.</p>
            </div>
          </div>
        ) : resultCode.stderr ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Test Failed</p>
            <div>
              <p>Your code has an error.</p>
              <p>{resultCode.stderr}</p>
            </div>
          </div>
        ) : (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p>Your code failed the test case.</p>
            <ul className="list-disc ml-4">
              <li>
                <p className="text-twilight-400 text-lg font-semibold">Expected output: {resultCode.stdout ? atob(resultCode.stdout) : 'a'}</p>
              </li>
              <li>
                <p className="text-twilight-400 text-lg font-semibold">Your output: {resultSolution.stdout ? atob(resultSolution.stdout) : 'a'}</p>
              </li>
            </ul>
          </div>
        )
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
  language: PropTypes.string
};
export default TestCase;