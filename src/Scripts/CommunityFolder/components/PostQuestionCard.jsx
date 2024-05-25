import { useState } from 'react';
import { Camera, Users, Send } from 'lucide-react';
import DropdownCheckbox from './DropdownCheckbox';

export default function PostQuestionCard() {
    const [selectedImageName, setSelectedImageName] = useState('');
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
            setSelectedImageName(file.name);
        }
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
                            placeholder="Add a title to your thought">
                        </input>
                    </div>
                </div>

                <div className="mt-4 mr-4">
                    <div className="flex items-center justify-center">  
                        <textarea
                            className="w-full h-24 border border-twilight-100 rounded-md p-2 bg-purple-50 bg-opacity-80 shadow-md backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-twilight-300 focus:border-transparent transition-all ease-in-out hover:ring-2 hover:ring-twilight-300 hover:border-transparent text-twilight-300 font-semibold placeholder-twilight-300 placeholder-opacity-80"
                            placeholder="What's on your mind ?">
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
                    <button className="bg-gradient-to-r from-twilight-300 to-twilight-100 text-white font-bold py-2 px-4 rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out">
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
