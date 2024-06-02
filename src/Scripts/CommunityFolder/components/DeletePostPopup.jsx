import PropTypes from 'prop-types';
import { X, ShieldAlert } from 'lucide-react';
import { toast } from 'react-toastify';

const showErrorToast = (msg, timer) => {
  toast.error(msg || 'Something went wrong! Please try again.', {
    position: 'top-right',
    autoClose: timer || 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const showSuccessToast = (msg, timer) => {
  toast.success(msg || 'Post deleted successfully!', {
    position: 'top-right',
    autoClose: timer || 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

function DeletePostPopup({ togglePopup, postId }) {

  const handleDelete = () => {
    
     const token = localStorage.getItem('authToken');
    console.log (postId)
    return fetch('http://localhost:5000/questions/' + postId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
     
      if (response.status === 400) {
        showErrorToast('Something went wrong! Please try again.');
      }
      else {
        showSuccessToast('Post deleted successfully!');
        togglePopup(false);
        setTimeout(() => {
        window.location.reload();}, 5000);
        
      }
      return response.json();
    })
    .then(data => {
      console.log(data); 
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
  };


  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50">
      <div className="relative p-4 max-w-2xl w-full">
        <div className="relative bg-white rounded-lg shadow-md border-gray-300">
          <div className="flex justify-start items-center h-12 bg-twilight-300 rounded-t-lg">
            <ShieldAlert size={24} className="mr-2 ml-4 text-white" />
            <h2 className="text-2xl font-semibold text-white px-2">Confirm Deletion</h2>
            <button
              onClick={() => togglePopup(false)}
              type="button"
              className="absolute right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-twilight-400 rounded-lg text-sm w-6 h-6 inline-flex justify-center items-center"
            >
              <X size={24} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5 text-left">
            <h3 className="mb-5 text-lg text-center">
              Are you sure you want to delete this post? This action cannot be undone.
            </h3>
            <div className="flex gap-4 justify-center text-center ">
              <button
                onClick={handleDelete}
                type="button"
                className="text-white  bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-500 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, delete this post
              </button>
              <button
                onClick={() => togglePopup(false)}
                type="button"
                className="text-twilight-500 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DeletePostPopup.propTypes = {
  togglePopup: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

export default DeletePostPopup;
