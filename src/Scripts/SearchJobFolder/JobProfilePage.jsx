import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TitleJob from './components/TitleJob';
import DescriptionJob from './components/DescriptionJob';
import CompanyDetails from './components/CompanyDetails';
import SkillsJob from './components/SkillsJob';
import LocationMap from './components/LocationMap';

function JobProfilePage() {

    const { job_id } = useParams();
    const [profile, setProfile] = useState(null);


    useEffect(() => {
        fetchProfile();
    }, [job_id]);

    const url = 'https://linkedin-api8.p.rapidapi.com/get-job-details?id=' + job_id;

    const fetchProfile = async () => {
        const options = {
            method: 'GET',
            headers: {
                "X-RapidAPI-Key": "9a1bd40802msh777c1751e2ffaf8p13386djsn864b3c521aa9",
                "X-RapidAPI-Host": "linkedin-api8.p.rapidapi.com"
            }
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setProfile(result.data);
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    const breadcrumbItems = [
        { name: 'Home', link: '/' },
        { name: 'Job Profile', link: null },
    ];



    return (
        <div className="flex">
            <div className="w-1/6">
                <NavBar />
            </div>
            <div className='w-5/6'>
                <Breadcrumb items={breadcrumbItems} />
                <div className="mt-4 mr-2">
                    
                   {profile && (
                          <>
                              <TitleJob job={profile} />
                              <DescriptionJob job={profile} />
                              {profile.skills && <SkillsJob job={profile} />}
                              <CompanyDetails job={profile} />
                              <LocationMap location={profile.company.headquarter.line1 + ', ' + profile.company.headquarter.line2 + ', ' + profile.company.headquarter.city + ', ' + profile.company.headquarter.country + ', ' + profile.company.headquarter.postalCode} />
                          </>
                      )}


                    <div className='flex justify-end mr-4 '>
                  <button 
                    className="mt-4 md:bg-gradient-to-r from-twilight-300 to-twilight-100 text-white font-bold py-2 px-4 rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out"
                    onClick={() => window.open(profile.applyMethod.companyApplyUrl, '_blank')}
                >
                    Be brave and apply now!
                </button>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default JobProfilePage;

