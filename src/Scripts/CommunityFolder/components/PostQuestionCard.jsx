import { useState } from 'react';
import { Camera, Users, Send } from 'lucide-react';
import DropdownCheckbox from './DropdownCheckbox';
import { showErrorToast, showSuccessToast } from './notifications';

export default function PostQuestionCard() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageName, setSelectedImageName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

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

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setSelectedImageName(file.name);
        }
    };

const handleSubmit = async () => {
    const token = localStorage.getItem('authToken');

    if (!title) {
        showErrorToast('Please add a title to your thought', 3000);
        return;
    }

    if (!content) {
        showErrorToast('Please add some content to your thought', 3000);
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('topic', selectedOptions.join(','));

    if (selectedImage) {
        formData.append('photo', selectedImage);
    }

    fetch('http://localhost:5000/questions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        showSuccessToast('Post created successfully', 3000);
        setTitle('');
        setContent('');
        setSelectedOptions([]);
        setSelectedImage(null);
        setSelectedImageName('');
        console.log('Success:', data);
    })
    .catch((error) => {
        showErrorToast('Something went wrong! Please try again.', 3000);
        console.error('Error:', error);
    });
};


   

    return (
        <div className="mt-4 mr-3 border pl-4 pt-4 pb-4 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md">
            <div>
                <div className="flex items-center">
                    <Users size={28} className="text-twilight-300 mr-2" />
                    <div className="text-2xl font-bold text-twilight-300">Create Post</div>
                </div>

                {selectedOptions.length > 0 && (
                     selectedOptions.map(option => (
                        <span key={option} className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 mr-2 mt-2 text-sm font-medium text-purple-700  ring-1 ring-inset border-dotted ring-purple-200 hover:ring-2 shadow-sm">
                            {option}
                        </span>
                    ))
                )}

                <div className="mt-4 mr-4">
                    <div className="flex items-center justify-center">  
                        <input
                            className="w-full h-10 border border-twilight-100 rounded-md p-2 bg-purple-50 bg-opacity-80 shadow-md backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-twilight-300 focus:border-transparent transition-all ease-in-out hover:ring-2 hover:ring-twilight-300 hover:border-transparent text-twilight-300 font-semibold placeholder-twilight-300 placeholder-opacity-80"
                            placeholder="Add a title to your thought"
                             value={title}
                            onChange={event => setTitle(event.target.value)}
                        >
                        </input>
                    </div>
                </div>

                <div className="mt-4 mr-4">
                    <div className="flex items-center justify-center">  
                        <textarea
                            className="w-full h-24 border border-twilight-100 rounded-md p-2 bg-purple-50 bg-opacity-80 shadow-md backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-twilight-300 focus:border-transparent transition-all ease-in-out hover:ring-2 hover:ring-twilight-300 hover:border-transparent text-twilight-300 font-semibold placeholder-twilight-300 placeholder-opacity-80"
                            placeholder="What's on your mind ?"
                            value={content}
                            onChange={event => setContent(event.target.value)}
                            >
                        </textarea>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex justify-between">
                <div className="flex gap-2">
                    <button
                        className="flex items-center justify-center rounded-md bg-purple-50 px-4 py-2 text-sm font-semibold text-twilight-500 shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-purple-200"
                        onClick={() => document.getElementById('imageUpload').click()}>
                        <div className="flex items-start">
                            <Camera size={20} className="mr-2" />
                            {selectedImageName ? selectedImageName : 'Add Image'}
                        </div>
                    </button>
                    <input
                        type="file"
                        id="imageUpload"
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleImageUpload}
                    />

                    <div className="flex items-center justify-center ">
                         <DropdownCheckbox
                            title="Select Tags"
                            options={options}
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions}
                        />
                    </div>
                </div>
                <div className="flex justify-end mr-4">
                    <button className="bg-gradient-to-r from-twilight-300 to-twilight-100 text-white font-bold py-2 px-4 rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out"
                                              onClick={handleSubmit}
                            >
                        <div className="flex items-start">
                            <Send size={20} className="mr-2" />
                            Post
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
