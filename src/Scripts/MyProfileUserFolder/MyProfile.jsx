import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import { useEffect, useState } from 'react';
import PhotoComponent from './components/PhotoComponent';
import SocialAccountsComponent from './components/SocialAccountsComponent';
import GeneralInformationComponent from './components/GeneralInformationComponent';
import PasswordInformation from './components/PasswordInformation';
import { BadgeX } from 'lucide-react';
import DeleteAccountPopup from './components/DeleteAccountPopup';
import CVComponent from './components/CVComponent';

function MyProfile() {
    const [profile, setProfile] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    localStorage.setItem('activeItem', '');

    useEffect(() => {
        fetchProfile();
    }, []);
    
    const fetchProfile = () => {
        const token = localStorage.getItem('authToken');
    
        fetch('http://localhost:5000/my_profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setProfile(data); 

        })
        .catch((error) => {
            console.error('Error:', error);
        }); 
    }

    const breadcrumbItems = [
        { name: 'Home', link: '/' },
        { name: 'My Profile', link: null },
    ];

    return (
        <div className="flex mr-4 mb-4">
            <div className="w-1/6"> 
                <NavBar />
            </div>

            <div className="w-5/6">
                <Breadcrumb items={breadcrumbItems} />

                <div className="flex">
                    <div className="w-2/6 mt-4 flex flex-col bg-white border shadow-sm rounded-2xl p-4">
                        <PhotoComponent photo_url={profile?.photo_url} first_name={profile?.first_name} last_name={profile?.last_name} status={profile?.status} />
                    </div>

                    {profile && (
                        <div className="w-4/6 mt-4 ml-4 flex flex-col bg-white border shadow-sm rounded-2xl p-4">
                            <SocialAccountsComponent user={profile} />
                        </div>
                    )}
                </div>

                {profile && (
                    <div className="w-full mt-4 bg-white border shadow-sm rounded-2xl p-4">
                        <GeneralInformationComponent user={profile} />
                    </div>
                )}

                {profile && (
                    <div className="w-full mt-4 bg-white border shadow-sm rounded-2xl p-4">
                        <PasswordInformation />
                    </div>
                )}

                {
                    profile && (
                        <div className="w-full mt-4 bg-white border shadow-sm rounded-2xl p-4">
                            <CVComponent user={profile} />
                        </div>
                    )
                }

                {profile && (
                    <div className="flex justify-end w-full mt-4">
                        <button
                            className="flex items-center justify-end gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-twilight-500 shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-purple-200"
                            onClick={() => setShowDeletePopup(true)}
                        >
                            <BadgeX size={18} className="text-twilight-500" />
                            Delete Account
                        </button>
                    </div>
                )}

                {showDeletePopup && (
                    <DeleteAccountPopup
                        togglePopup={setShowDeletePopup}
                    />
                )}
            </div>
        </div> 
    );
}

export default MyProfile;
