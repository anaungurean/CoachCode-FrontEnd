import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { X, ShieldAlert, Trash, Camera } from 'lucide-react';
import { toast } from 'react-toastify';
import DropdownAddCheckbox from './DropdownAddCheckbox';

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
  toast.success(msg || 'Post edited successfully!', {
    position: 'top-right',
    autoClose: timer || 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

function EditPostPopup({ togglePopup, post }) {
  const [editedPost, setEditedPost] = useState(post);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedImageName, setSelectedImageName] = useState('');
  const [, setSelectedImage] = useState(null);
  const [imageDeleted, setImageDeleted] = useState(false);

  useEffect(() => {
    setSelectedOptions([...editedPost.topic.split(',')] || []);
  }, [editedPost.topic]);

  const handleEditPost = () => {

    const token = localStorage.getItem('authToken');

    const formData = new FormData();
    formData.append('title', editedPost.title);
    formData.append('content', editedPost.content);
    formData.append('topic', editedPost.topic);

    if (editedPost.photo) {
      formData.append('photo', editedPost.photo);
    }

    fetch(`http://localhost:5000/questions/${post.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        showSuccessToast('Post edited successfully', 3000);
        setEditedPost({ title: '', content: '', topic: '' });
        setSelectedOptions([]);
        setSelectedImage(null);
        setSelectedImageName('');
        console.log('Success:', data);
        togglePopup(false);
      })
      .catch((error) => {
        showErrorToast('Something went wrong! Please try again.', 3000);
        console.error('Error:', error);
      });
  };

  const removeTag = (indexToRemove) => {
    const updatedTopics = editedPost.topic.split(',').filter((_, index) => index !== indexToRemove);
    setEditedPost({ ...editedPost, topic: updatedTopics.join(',') });
  };

  const options = [
    { label: 'Programming', value: 'Programming' },
    { label: 'Tools', value: 'Tools' },
    { label: 'Career', value: 'Career' },
    { label: 'Companies', value: 'Companies' },
    { label: 'Problems', value: 'Problems' },
    { label: 'Community', value: 'Community' },
    { label: 'Education', value: 'Education' },
    { label: 'Projects', value: 'Projects' }
  ];

  const handleDeleteImage = () => {
    console.log('Image deleted');
    setImageDeleted(true);
    editedPost.photo = '';
  };

  const handleNewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImageName(file.name);
      setSelectedImage(file);
    }
    editedPost.photo = file;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50">
      <div className="relative p-4 max-w-2xl w-full">
        <div className="relative bg-white rounded-lg shadow-md border-gray-300">
          <div className="flex justify-start items-center h-12 bg-twilight-300 rounded-t-lg">
            <ShieldAlert size={24} className="mr-2 ml-4 text-white" />
            <h2 className="text-2xl font-semibold text-white px-2">Edit Post </h2>
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
            <form>
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                Title:
              </label>
              <input
                type="text"
                id="title"
                className="border rounded-md w-full p-2 bg-purple-50"
                value={editedPost.title}
                onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
              />

              <label htmlFor="content" className="block text-gray-700 font-bold mb-2 mt-2">
                Content:
              </label>
              <input
                type="text"
                id="content"
                className="border rounded-md w-full p-2 bg-purple-50"
                value={editedPost.content}
                onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
              />

              <label htmlFor="topics" className="block text-gray-700 font-bold mb-2 mt-2">
                Tags:
                <div className="mt-2 flex flex-wrap gap-2">
                  {editedPost.topic && editedPost.topic.split(',').map((topic, index) => (
                    <span key={index} className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 mr-2 text-sm font-medium text-purple-700 ring-1 ring-inset border-dotted ring-purple-200 hover:ring-2 shadow-sm">
                      {topic}
                      <X className="h-4 w-4 ml-1 cursor-pointer" onClick={() => removeTag(index)} />
                    </span>
                  ))}
                </div>
              </label>

              <DropdownAddCheckbox
                title="Add Tags"
                options={options}
                selectedOptions={selectedOptions}
                setSelectedOptions={(selectedOptions) => {
                  setSelectedOptions(selectedOptions);
                  setEditedPost({ ...editedPost, topic: selectedOptions.join(',') });
                }}
              />

              <label htmlFor="image" className="block text-gray-700 font-bold mb-2 mt-2">
                Image:
                <div className="mt-2 flex items-center justify-between">
                  {post.photo && (
                    <button
                      type="button"
                      className="p-2 bg-purple-50 rounded-md ring-1 ring-gray-200 text-twilight-300 font-medium text-base focus:outline-none hover:bg-purple-100 hover:text-purple-800"
                      onClick={handleDeleteImage}
                    >
                      <div className="flex items-center">
                        <Trash size={20} className="mr-2" />
                        {imageDeleted ? 'Image Deleted' : 'Delete Image'}
                      </div>
                    </button>
                  )}

                  <label className="p-2 bg-purple-50 rounded-md ring-1 ring-gray-200 text-twilight-300 font-medium text-base focus:outline-none hover:bg-purple-100 hover:text-purple-800 cursor-pointer">
                    <div className="flex items-center">
                      <Camera size={20} className="mr-2" />
                      {selectedImageName || 'Upload Image'}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleNewImage}
                    />
                  </label>
                </div>
              </label>

              <div className="flex gap-4 justify-center text-center mt-4">
                <button
                  onClick={handleEditPost}
                  type="button"
                  className="text-white bg-twilight-300 hover:bg-twilight-400 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Edit Post
                </button>
                <button
                  onClick={() => togglePopup(false)}
                  type="button"
                  className="text-twilight-500 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

EditPostPopup.propTypes = {
  togglePopup: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

export default EditPostPopup;
