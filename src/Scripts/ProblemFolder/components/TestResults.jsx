import { Bug } from 'lucide-react';
import { BadgeX, Check } from 'lucide-react';
import PropTypes from 'prop-types';
import 'react-circular-progressbar/dist/styles.css'; 
import { IoAlertCircleOutline } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { showErrorToast, showSuccessToast } from './notifications';

function TestResults({ memory, time, passedTests, failedTests, compilationError, executionError }) {
  
  const [loading, setLoading] = useState(true);
  const [notificationShown, setNotificationShown] = useState(false);

  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    startLoading();
  }, []);

  useEffect(() => {
    const showNotification = () => {
      if (!notificationShown) {
        if (compilationError)
          showErrorToast('Compilation error!');
        else if (executionError)
          showErrorToast('Execution error!');
        else if (failedTests > 0)
          showErrorToast('Failed tests!');
        else if (failedTests === 0)
          showSuccessToast('All tests passed successfully!');
        
        setNotificationShown(true);
      }
    };

    showNotification();
  }, [compilationError, executionError, failedTests, notificationShown]);

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
              <p className="font-bold text-xl">Compilation Error</p>
              <div className='mt-4 mr-8 ml-4 mb-2 flex items-center bg-orange-600/10 rounded-md p-2'>
                <div className='flex items-center'>
                  <IoAlertCircleOutline size={24} className="mr-2 ml-4 text-orange-800" />
                </div>
                <p className='ml-4 text-lg font-semibold'>{compilationError}</p>
              </div>
            </div>
          ) : executionError ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
              <p className="font-bold text-xl">Execution Error</p>
              <div className='mt-4 mr-8 ml-4 mb-2 flex items-center bg-red-600/10 rounded-md p-2'>
                <div className='flex items-center'>
                  <IoAlertCircleOutline size={24} className="mr-2 ml-4 text-red-800" />
                </div>
                <p className='ml-4 text-lg font-semibold'>{executionError}</p>
              </div>
            </div>
          ) : failedTests > 0 ? (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
              <p className="font-bold text-xl">Failed Tests</p>
              <p className='text-lg'>Your code passed only {passedTests}/{passedTests + failedTests} tests. Please review your code and try again.</p>
              <div className="flex w-full h-6 mt-4 overflow-hidden font-sans text-base font-medium rounded-full flex-start bg-blue-gray-50">
                <div className={`flex items-center justify-center w-full h-full overflow-hidden text-white break-all rounded-full ${loading ? 'bg-yellow-800 animate-pulse' : 'bg-yellow-900'}`}>
                  {loading ? 'Loading...' : `${(passedTests / (passedTests + failedTests)) * 100}% Completed`}
                </div>
              </div>
              <div className='flex items-center mt-4 bg-yellow-600/10 rounded-md p-2 w-full'>
                <ul className='list-disc ml-4'>
                  <li>
                    <div className='flex items-center'>
                      <p className='text-yellow-800 text-lg font-semibold'>Memory:</p>
                      <span className={`inline-flex items-center rounded-md px-2 py-1 ml-2 text-base font-medium bg-yellow-100 text-yellow-800 ring-yellow-500/10 ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}>{memory + " MB"}</span>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-center'>
                      <p className='text-yellow-800 text-lg font-semibold'>Time:</p>
                      <span className={`inline-flex items-center rounded-md px-2 py-1 ml-2 text-base font-medium bg-yellow-100 text-yellow-800 ring-yellow-500/10 ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}>{time + " ms"}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ) : failedTests === 0 ? (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
              <p className="font-bold text-xl">All tests passed</p>
              <p className='text-lg'>Your code passed all {passedTests + failedTests} tests. Great job! 🎉</p>
              <div className="flex w-full h-6 mt-4 overflow-hidden font-sans text-base font-medium rounded-full flex-start bg-blue-gray-50">
                <div className={`flex items-center justify-center w-full h-full overflow-hidden text-white break-all rounded-full ${loading ? 'bg-green-800 animate-pulse' : 'bg-green-900'}`}>
                  {loading ? 'Loading...' : '100% Completed'}
                </div>
              </div>
              <div className='flex items-center mt-4 bg-green-600/10 rounded-md p-2 w-full'>
                <ul className='list-disc ml-4'>
                  <li>
                    <div className='flex items-center'>
                      <p className='text-green-800 text-lg font-semibold'>Memory:</p>
                      <span className={`inline-flex items-center rounded-md px-2 py-1 ml-2 text-base font-medium bg-green-100 text-green-800 ring-green-500/10 ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}>{memory + " MB"}</span>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-center'>
                      <p className='text-green-800 text-lg font-semibold'>Time:</p>
                      <span className={`inline-flex items-center rounded-md px-2 py-1 ml-2 text-base font-medium bg-green-100 text-green-800 ring-green-500/10 ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}>{time + " ms"}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex justify mt-3 justify-end ml-1">
                <button className="flex items-center justify-center gap-x-1.5 rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-green-600 hover:bg-green-900">
                  Submit your solution
                </button>
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