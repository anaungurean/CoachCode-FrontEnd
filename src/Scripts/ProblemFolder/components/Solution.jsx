import { FileCheck } from 'lucide-react';
import { Lock } from 'lucide-react';
import PropTypes from 'prop-types';
import { FiUnlock } from "react-icons/fi";
import { useState } from 'react';

function Solution({ togglePopup, isAnswerCorrect, problem }) {
  const [showPopup, setShowPopup] = useState(false);
  const solution = problem.solution.python || 'No solution available for this problem.'
 
  const handleButtonClick = () => {
    setShowPopup(!showPopup);
    if (!showPopup && !isAnswerCorrect) {
      togglePopup();
    }
  };
 
  return (
    <div className="mt-4 mr-4 border pl-4 pt-4 pb-8 mb-4 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md">
      <div className="flex items-center ml-4">
        <FileCheck size={28} className="mr-2 text-twilight-400" />
        <h2 className="text-2xl font-bold text-twilight-400 px-2">Solution</h2>
        <div className="flex-grow justify-between" />
        
          <button 
            onClick={handleButtonClick} 
            className="flex items-center mr-8 justify-center gap-x-1.5 rounded-md bg-purple-50 px-3 py-2 text-sm font-semibold text-twilight-500 shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-purple-200"
          >
            {showPopup ?  <FiUnlock size={18} className="text-twilight-400" /> : <Lock size={18} className="text-twilight-400" />}
            {showPopup ? 'Hide solution' : 'Show solution'}
           </button>
      </div>
      <hr className="border-twilight-200 mt-1 mr-8 ml-4" />

      {showPopup && ( 
        <div className="p-4">
          <div>
            <h3 className="text-lg font-semibold text-twilight-500">Here is the solution in Python!</h3>
            <p className="text-twilight-400">We highly recommend you to understand the solution and try to solve the problem again.</p>
              <div className="mt-4">
                <pre className="bg-gray-100 p-4 rounded-lg mt-4">{solution}</pre>
            </div>
            
           </div>
        </div>
      )}
    </div>
  );
}

Solution.propTypes = {
  togglePopup: PropTypes.func.isRequired,
  isAnswerCorrect: PropTypes.bool.isRequired,
  problem: PropTypes.object.isRequired,
};

export default Solution;
