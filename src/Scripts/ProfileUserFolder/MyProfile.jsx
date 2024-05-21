import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import { useEffect, useState } from 'react';
import PhotoComponent from './components/PhotoComponent';

function MyProfile() {

    const [profile, setProfile] = useState(null);
    
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
        { name: 'My Profile', link:null },
    ];

    return (
        <div className="flex">
            <div className="w-1/6"> 
                <NavBar/>
            </div>
            <div className='w-5/6'>
                <Breadcrumb items={breadcrumbItems} />
            </div>

            <div className="flex flex-col items-center">
                <PhotoComponent photo_url={profile?.photo_url} username={profile?.username} />
            </div>

            


        </div> 
    );
}

export default MyProfile;
