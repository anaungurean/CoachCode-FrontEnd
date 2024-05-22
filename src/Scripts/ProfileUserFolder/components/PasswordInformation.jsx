import { useState } from 'react';
import { Save, Edit } from 'lucide-react';
import { showErrorToast, showSuccessToast } from './notifications';

const PasswordInformation = () => {
    const [editProfile, setEditProfile] = useState(false);
    const [editedPassword, setEditedPassword] = useState({
        current_password: '',
        new_password: '',
        confirm_password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedPassword(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSaveProfile = () => {

        const token = localStorage.getItem('authToken');
        if (editedPassword.new_password !== editedPassword.confirm_password) {
            showErrorToast('Passwords do not match');
            console.log('Passwords do not match');
            return;
        }


        fetch('http://localhost:5000/update_password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(editedPassword)
        })
            .then(response => {
                if (response.status === 400) {
                    showErrorToast('Current password is incorrect');
                }
                else {
                    showSuccessToast('Password updated successfully!');
                    setEditProfile(false);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
 
    }

    return (
        <div className="p-4">
            <div className='text-center flex justify-between items-center'>
                <div className='flex-grow'>
                    <h1 className='text-2xl font-bold text-twilight-400'>Password Information</h1>
                </div>
                <div className='mr-4'>
                    <button onClick={() => setEditProfile(!editProfile)} className="flex items-center gap-x-1.5 rounded-full bg-purple-50 px-3 py-2 text-sm font-semibold text-twilight-500 shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-purple-200">
                        <Edit size={18} className="text-twilight-500" />
                    </button>
                </div>
            </div>

            {editProfile &&
                <div className='flex flex-col gap-y-4'>
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor='current_password' className='text-base font-medium text-twilight-500'>Current Password</label>
                        <input type='password' id='current_password' name='current_password' value={editedPassword.current_password} onChange={handleChange} className='border border-twilight-300 rounded-md px-3 py-2 text-sm text-twilight-500 bg-purple-50' />
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor='new_password' className='text-base font-medium text-twilight-500'>New Password</label>
                        <input type='password' id='new_password' name='new_password' value={editedPassword.new_password} onChange={handleChange} className='border border-twilight-300 rounded-md px-3 py-2 text-sm text-twilight-500 bg-purple-50' />
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor='confirm_password' className='text-base font-medium text-twilight-500'>Confirm Password</label>
                        <input type='password' id='confirm_password' name='confirm_password' value={editedPassword.confirm_password} onChange={handleChange} className='border border-twilight-300 rounded-md px-3 py-2 text-sm text-twilight-500 bg-purple-50' />
                    </div>
                    <div className='mt-4 flex items-center'>
                        <button onClick={handleSaveProfile} className="ml-auto flex items-center justify-center gap-x-1.5 rounded-md bg-purple-50 px-3 py-2 text-sm font-semibold text-twilight-500 shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-purple-200">
                            <Save size={18} className="text-twilight-500" />
                            Change password
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}


export default PasswordInformation;
