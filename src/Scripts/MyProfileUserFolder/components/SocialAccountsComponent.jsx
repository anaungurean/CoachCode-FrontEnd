import { useState } from 'react';
import PropTypes from 'prop-types';
import { Save } from 'lucide-react';
import { Edit } from 'lucide-react';
import { showSuccessToast } from './notifications';
import { ToastContainer } from 'react-toastify';
const SocialAccountsComponent = ({ user}) => {
    
    const [editProfile, setEditProfile] = useState(false);

    const [editedUrls, setEditedUrls] = useState({
        linkedin_url: user.linkedin_url,
        github_url: user.github_url,
        facebook_url: user.facebook_url
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUrls(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveProfile = () => {
            const token = localStorage.getItem('authToken');
            fetch('http://localhost:5000/update_social_accounts', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    linkedin_url: editedUrls.linkedin_url,
                    github_url: editedUrls.github_url,
                    facebook_url: editedUrls.facebook_url
                })
            })
            .then(response => response.json())
            .then(data => {
                showSuccessToast('Social accounts updated successfully!');
                console.log(data);
                setEditProfile(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        };

    return (
        <div className="p-4">
            <div className='text-center mb-4 flex justify-between items-center'>
            <div className='flex-grow'>
                <h1 className='text-2xl font-bold text-twilight-400'>Social Accounts </h1>
            </div>

            <div>
                <button onClick={() => setEditProfile(!editProfile)} className="flex items-center gap-x-1.5 rounded-full bg-purple-50 px-3 py-2 text-sm font-semibold text-twilight-500 shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-purple-200">
                    <Edit size={18} className="text-twilight-500" />
                </button>
            </div>

        
        </div>
            <div className="grid gap-4">
                <div className="flex items-center  border-twilight-300 rounded bg-purple-50">
                    <img src='/src/assets/linkedin.png' alt='LinkedIn' className='w-8 h-8 mr-3 ml-2' />
                    <div className="flex-1 ">
                        <h1 className='text-lg text-twilight-500 font-semibold'>LinkedIn</h1>
                        {editProfile ? (
                            <input
                                type="text"
                                name="linkedin_url"
                                value={editedUrls.linkedin_url}
                                onChange={handleChange}
                                className='block w-full  border-twilight-300 rounded bg-purple-50  px-2'
                            />
                        ) : (
                            <a href={editedUrls.linkedin_url} target='_blank' rel='noreferrer' className='text-base font-medium text-twilight-400 hover:underline'>{editedUrls.linkedin_url ?? 'Not provided'}</a>
                        )}
                    </div>
                </div>
                <div className="flex items-center border-twilight-300 rounded bg-purple-50">
                    <img src='/src/assets/github.png' alt='GitHub' className='w-8 h-8 mr-3 ml-2' />
                    <div className="flex-1">
                        <h1 className='text-lg text-twilight-500 font-semibold'>GitHub</h1>
                        {editProfile ? (
                            <input
                                type="text"
                                name="github_url"
                                value={editedUrls.github_url}
                                onChange={handleChange}
                                className='block w-full border-twilight-300 rounded bg-purple-50 px-2'
                            />
                        ) : (
                            <a href={editedUrls.github_url} target='_blank' rel='noreferrer' className='text-base font-medium text-twilight-400 hover:underline'>{editedUrls.github_url ?? 'Not provided'}</a>
                        )}
                    </div>
                </div>
                <div className="flex items-center border-twilight-300 rounded bg-purple-50">
                    <img src='/src/assets/facebook.png' alt='Facebook' className='w-8 h-8 mr-3 ml-2' />
                    <div className="flex-1">
                        <h1 className='text-lg text-twilight-500 font-semibold'>Facebook</h1>
                        {editProfile ? (
                            <input
                                type="text"
                                name="facebook_url"
                                value={editedUrls.facebook_url}
                                onChange={handleChange}
                                className='block w-full border-twilight-300 rounded bg-purple-50 px-2'
                            />
                        ) : (
                            <a href={editedUrls.facebook_url} target='_blank' rel='noreferrer' className='text-base font-medium text-twilight-400 hover:underline'>{editedUrls.facebook_url ?? 'Not provided'}</a>
                        )}
                    </div>
                </div>
            </div>
             {editProfile && (
                <div className='mt-4 flex items-center'>
                    <button onClick={handleSaveProfile} className="ml-auto flex items-center justify-center gap-x-1.5 rounded-md bg-purple-50 px-3 py-2 text-sm font-semibold text-twilight-500 shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-purple-200">
                        <Save size={18} className="text-twilight-500" />
                        Save changes
                    </button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

SocialAccountsComponent.propTypes = {
    user: PropTypes.object.isRequired
};

export default SocialAccountsComponent;
