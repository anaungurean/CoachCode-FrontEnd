import PropTypes from 'prop-types';
import { useState } from 'react';
import { Save } from 'lucide-react';
import { Edit } from 'lucide-react';
import { showErrorToast, showSuccessToast } from './notifications';


const GeneralInformationComponent = ({ user }) => {

    const [editProfile, setEditProfile] = useState(false);

    const [editedProfile, setEditedProfile] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        status: user.status || '',
        goal: user.goal || ''
    });
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    
    const handleSaveProfile = () => {
        const token = localStorage.getItem('authToken');
        fetch('http://localhost:5000/update_general_information', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(editedProfile)
        })
        .then(response => {
            console.log (editedProfile)
            console.log(response);
            if (response.status === 400) {
                alert('This username is already taken. Please choose another one.');
                showErrorToast('This username is already taken. Please choose another one.');
            }
            else {
                showSuccessToast('Profile updated successfully!');
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
        <div className='text-center mb-4 flex justify-between items-center'>
            <div className='flex-grow'>
                <h1 className='text-2xl font-bold text-twilight-400'>General Information</h1>
            </div>

            <div>
                <button onClick={() => setEditProfile(!editProfile)} className="flex items-center gap-x-1.5 rounded-full bg-purple-50 px-3 py-2 text-sm font-semibold text-twilight-500 shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-purple-200">
                    <Edit size={18} className="text-twilight-500" />
                </button>
            </div>
        </div>
    
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                    <label htmlFor='firstName' className='mb-2 text-twilight-500 font-medium text-lg'>First Name:</label>
                    <input
                        type='text'
                        id='firstName'
                        name='first_name'
                        value={editedProfile.first_name}
                        onChange={handleChange}
                        className='p-2 border border-twilight-300 rounded bg-purple-50'
                        disabled={!editProfile}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='lastName' className='mb-2 font-medium text-lg'>Last Name:</label>
                    <input
                        type='text'
                        id='lastName'
                        name='last_name'
                        value={editedProfile.last_name}
                        onChange={handleChange}
                        className='p-2 border border-twilight-300 rounded bg-purple-50'
                        disabled={!editProfile}
                    />
                </div>
                 <div className='flex flex-col'>
                    <label htmlFor='username' className='mb-2 font-medium text-lg'>Username:</label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={editedProfile.username}
                        onChange={handleChange}
                        className='p-2 border border-twilight-300 rounded bg-purple-50'
                        disabled={!editProfile}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='email' className='mb-2 font-medium text-lg'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={editedProfile.email}
                        onChange={handleChange}
                        className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50'
                        disabled= {true}
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='status' className='mb-2 font-medium text-lg'>Status:</label>
                    <select
                        id='status'
                        name='status'
                        value={editedProfile.status}
                        onChange={handleChange}
                        className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50'
                       disabled={!editProfile}
                    >
                        <option value="-"></option>
                        <option value="Student">Student</option>
                        <option value="Intern">Intern</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Mid-level Developer">Mid-level Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Freelancer">Freelancer</option>
                        <option value="Researcher">Researcher</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Manager">Manager</option>
                        <option value="Employed">Employed</option>
                        <option value="Self-employed">Self-employed</option>
                        <option value="Unemployed">Unemployed</option>
                        <option value="Retired">Retired</option>
                        <option value="Looking for Job">Looking for Job</option>
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='goal' className='mb-2 font-medium text-lg'>Goal:</label>
                    <select
                        id='goal'
                        name='goal'
                        value={editedProfile.goal}
                        onChange={handleChange}
                        className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50'
                        disabled={!editProfile}
                    >
                        <option value="-"></option>
                        <option value="Learn new programming languages">Learn new programming languages</option>
                        <option value="Practice data structures and algorithms">Practice data structures and algorithms</option>
                        <option value="Build coding projects">Build coding projects</option>
                        <option value="Solve coding challenges">Solve coding challenges</option>
                        <option value="Review technical interview concepts">Review technical interview concepts</option>
                        <option value="Mock interviews">Mock interviews</option>
                        <option value="Improve problem-solving skills">Improve problem-solving skills</option>
                        <option value="Enhance coding efficiency">Enhance coding efficiency</option>
                        <option value="Understand software development best practices">Understand software development best practices</option>
                        <option value="Learn about industry trends">Learn about industry trends</option>
                        <option value="Prepare for technical interviews">Prepare for technical interviews</option>
                        <option value="Receive feedback on code">Receive feedback on code</option>
                    </select>
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

        </div>
    );
};

GeneralInformationComponent.propTypes = {
    user: PropTypes.object.isRequired
};

export default GeneralInformationComponent;
