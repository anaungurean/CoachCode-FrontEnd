import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import { ShieldQuestion } from 'lucide-react';
import { toast } from 'react-toastify';

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

function Popup({ togglePopup, question }) {
  const { question: questionText, options, correct_answer } = question;

  const handleAnswer = (answer) => {
  if (answer === correct_answer) {
    showSuccessToast('Correct answer!', 2000);
    togglePopup(true); 
  } else {
    showErrorToast('Incorrect answer', 2000);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50">
      <div className="relative p-4 max-w-2xl w-full ">
        <div className="relative bg-white rounded-lg shadow-md border-gray-300 ">
          <div className='flex justify-start items-center h-12 bg-twilight-300 rounded-t-lg'>
            <ShieldQuestion size={24} className="mr-2 ml-4 text-white" />
            <h2 className="text-2xl font-semibold text-white px-2">Question</h2>
            <button
              onClick={() => togglePopup(false)} // Close popup with false (no solution)
              type="button"
              className="absolute right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-twilight-400 rounded-lg text-sm w-6 h-6 inline-flex justify-center items-center"
              data-modal-hide="popup-modal"
            >
              <X size={24} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5 text-left ">
            <h3 className="mb-5 text-lg ">
              {questionText.split(' ').map(word => (
                word.startsWith('`') && word.endsWith('`') ? (
                  <span key={word} className="inline-flex items-center rounded-md px-2 py-1 text-sm font-medium bg-purple-100 text-twilight-500 ring-twilight-500/10 ring-1 ring-inset border-dotted hover:ring-2 shadow-sm">
                    {word.substring(1, word.length - 1)}
                  </span>
                ) : (
                  <span key={word}> {' ' + word} </span>
                )
              ))}
            </h3>
            <div className="flex flex-col gap-4">
              {Object.entries(options).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleAnswer(key)}
                  type="button"
                  className="text-white bg-twilight-300 hover:bg-twilight-400 focus:ring-4 focus:outline-none focus:ring-twilight-500 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  <span className="mr-2">{key + ')'}</span>
                  {value.split('`').map((part, index) => (
                    index % 2 === 0 ? (
                      <span key={index}>{part}</span>
                    ) : (
                      <strong key={index}>&nbsp;{part}&nbsp;</strong>
                    )
                  ))}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Popup.propTypes = {
  togglePopup: PropTypes.func.isRequired,
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.objectOf(PropTypes.string).isRequired,
    correct_answer: PropTypes.string.isRequired,
  }).isRequired,
  isAnswerCorrect: PropTypes.bool.isRequired, 
};

export default Popup;
