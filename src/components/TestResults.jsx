import { Bug } from 'lucide-react';
import { BadgeX, Check } from 'lucide-react';
import PropTypes from 'prop-types';
import 'react-circular-progressbar/dist/styles.css'; // Make sure to import the styles
import CircularProgressBar from './CircularProgressBar';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

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

const showSuccessToast = (msg, timer) => {
  toast.success(msg || `All tests passed successfully!`, {
    position: "top-right",
    autoClose: timer ? timer : 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

function TestResults({ memory, time, passedTests, failedTests, compilationError, executionError }) {
  const [errorShown, setErrorShown] = useState(false);
  const [successShown, setSuccessShown] = useState(false);

  useEffect(() => {
    if (compilationError) {
      if (!errorShown) {
        showErrorToast('There is a compilation error!');
        setErrorShown(true);
      }
    } else if (executionError) {
      if (!errorShown) {
        showErrorToast('There is an execution error!');
        setErrorShown(true);
      }
    } else if (failedTests > 0) {
      if (!errorShown) {
        showErrorToast('Some tests failed! Please check your code.');
        setErrorShown(true);
      }
    } else if (failedTests === 0) {
      if (!successShown) {
        showSuccessToast('All tests passed successfully!');
        setSuccessShown(true);
      }
    }
  }, [compilationError, executionError, failedTests, successShown, errorShown]);

  return (
    <div className="mt-4 mr-4 border pl-4 pt-4 pb-8 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md">
      <div className="flex items-center ml-4">
        {
          compilationError || executionError ? (
            <Bug size={28} className="text-twilight-400" />
          ) : failedTests > 0 ? (
            <BadgeX size={28} className="text-twilight-400" />
          ) : failedTests === 0 ? (
            <Check size={28} className="text-twilight-400" />
          ) : null
        }
        <h2 className="text-2xl font-bold text-twilight-400 px-2">Test results</h2>
      </div>
      <hr className="border-twilight-200 mt-1 mr-8 ml-4" />
       <div className="mt-4 mr-8 ml-4 mb-4">
            {
                compilationError ? (
                    
                        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                            <p className="font-bold">Compilation Error</p>
                            <p>{compilationError}</p>
                        </div>
                )
                : executionError ? (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                        <p className="font-bold">Execution Error</p>
                        <p>{executionError}</p>
                    </div>
                ): failedTests > 0 ? (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                        <p className="font-bold">Failed Tests</p>
                        <p>Your code passed only {passedTests}/{passedTests + failedTests} tests. Please review your code and try again.</p>
                         <div className="flex justify mt-3 justify-between mr-16 ml-16">
                        <CircularProgressBar value={passedTests / (passedTests + failedTests) * 100} maxValue={100} text={`${Math.round(passedTests / (passedTests + failedTests) * 100)}%`} color="#F59E0B" title='Score' />
                        <CircularProgressBar value={memory} maxValue={512} text={`${memory} MB`} color="#3B82F6" title="Memory" />
                        <CircularProgressBar value={time} maxValue={1000} text={`${time} ms`} color="#006699" title="Time" /> 
                        </div>
                     
                    </div>
                ) : failedTests === 0 ? (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
                        <p className="font-bold">All tests passed</p>
                        <p>Your code passed all {passedTests + failedTests} tests. Great job! 🎉</p>
                        <div className="flex justify mt-3 justify-between mr-16 ml-16">
                        <CircularProgressBar value={100} maxValue={100} text="100%" color="#10B981" title="Score" />
                        <CircularProgressBar value={memory} maxValue={512} text={`${memory} MB`} color="#7a6aa9" title="Memory" />
                        <CircularProgressBar value={time} maxValue={1000} text={`${time} ms`} color="#006699" title="Time" /> 
                        </div>
                        </div>
                ) : null

            }
    </div>
    </div>
  );
}

TestResults.propTypes = {
  memory: PropTypes.number,
  time: PropTypes.number,
  passedTests: PropTypes.number,
  failedTests: PropTypes.number,
  compilationError: PropTypes.string,
  executionError: PropTypes.string,
};

export default TestResults;
