import  { useState } from 'react';
import PropTypes from 'prop-types';
import { jwtDecode } from "jwt-decode";
import { Upload } from 'lucide-react';
import { Edit } from 'lucide-react';

const PhotoComponent = ({ first_name, last_name, status}) => {
    const token = localStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id;
    const [selectedFile, setSelectedFile] = useState(null);

    const [editProfile, setEditProfile] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
    if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        fetch(`http://localhost:5000/upload_photo`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                console.log('Photo uploaded successfully!');
                window.location.reload();
             } else {
                console.error('Error uploading photo:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error uploading photo:', error);
        });
    } else {
        console.error('No file selected for upload!');
    }
};


    return (
    <div >

          <div className='text-center mb-4 relative'>
            <div className='flex justify-center'>
                <img src={`http://localhost:5000/user_photo/${userId}`} className='rounded-xl border border-gray-300 shadow-md w-40 h-40' alt={`${first_name} ${last_name}`} />     
            </div>
            <div className='absolute top-0 right-0'>
                <button onClick={() => setEditProfile(!editProfile)} className="flex items-center gap-x-1.5 rounded-full bg-purple-50 px-3 py-2 text-sm font-semibold text-twilight-500 shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-purple-200">
                    <Edit size={18} className="text-twilight-500" />
                </button>
            </div>
        </div>

        <div className='text-center mt-4 border-twilight-300 rounded-md text-twilight-500 bg-purple-50'>
            <h1 className='text-2xl font-bold text-twilight-400'>{first_name} {last_name}</h1>
            <h2 className='text-xl font-semibold text-twilight-300'>{status}</h2>
        </div>


        {editProfile && (
         <div className='mt-4 flex items-center'>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-input" />
                <label htmlFor="file-input" className="flex items-center justify-center gap-x-1.5 rounded-md bg-purple-50 px-3 py-2 text-sm font-semibold text-twilight-500 shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-purple-200 cursor-pointer">
                    <div className="flex items-center justify-center">
                        {!selectedFile && <Upload size={18} className="text-twilight-500 mr-1" />}
                        {selectedFile ? selectedFile.name : 'Change picture'}
                    </div>
                </label>
                {selectedFile && (
                    <button onClick={handleUpload} className="ml-auto flex items-center justify-center gap-x-1.5 rounded-md bg-purple-50 px-3 py-2 text-sm font-semibold text-twilight-500 shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-purple-200">
                        <Upload size={18} className="text-twilight-500" />
                        Upload photo
                    </button>
                )}
             </div>
        )}

    </div>
);


};

PhotoComponent.propTypes = {
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    status: PropTypes.string,
};

export default PhotoComponent;
