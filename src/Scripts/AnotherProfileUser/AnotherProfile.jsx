import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import { useEffect, useState } from 'react';
import PhotoComponent from './components/PhotoComponent';
import SocialAccountsComponent from './components/SocialAccountsComponent';
import GeneralInformationComponent from './components/GeneralInformationComponent';
import { useParams } from 'react-router-dom';
import CVComponent from './components/CVComponent';
 

function UserProfile() {
    const [profile, setProfile] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        fetchProfile();
    }, []);
    
    const fetchProfile = () => {
        const token = localStorage.getItem('authToken');
    
        fetch('http://localhost:5000/user/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setProfile(data); 
            console.log(data);

        })
        .catch((error) => {
            console.error('Error:', error);
        }); 
    }

    const breadcrumbItems = [
        { name: 'Home', link: '/' },
        { name: 'User Profile', link: null },
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
                        <PhotoComponent photo_url={profile?.photo_url} first_name={profile?.first_name} last_name={profile?.last_name} status={profile?.status}  userId= { userId}/>
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

                {
                    profile && (
                        <div className="">
                            <CVComponent user={profile} />
                        </div>
                    )
                }


                  
            </div>
        </div> 
    );
}

export default UserProfile;
