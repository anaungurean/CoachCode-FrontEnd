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

    // Obiectul JSON pe care l-ai primit
// const profile = {
//   "success": true,
//   "message": "",
//   "data": {
//     "id": "3927696719",
//     "state": "LISTED",
//     "title": "Full Stack Developer Intern",
//     "description": "Ready to expand your development skills?\n\nWhat You Do\n\nWe are looking for a software developer intern who's eager to learn and put their knowledge into practice. So, what does that mean for you? Well, it means that you want to learn more about all phases of the application development lifecycle, including the development and maintenance of the application; developing implementation plans and estimates; and writing, maintaining, and performing unit tests.\n\nYou enjoy working in teams using agile practices and principles and feel comfortable providing updates at team meetings and daily sessions; working with a team to develop the best technical solutions; and being proactive in asking questions, learning more, accepting new challenges and taking risks.\n\nWhat You Bring To The Team\n\nA student or recent graduate from a technical university or similar (Computer Science, Automatic Control and Computer Engineering, Economics)Basic knowledge of OOP, ASP.NET, C#, HTML, CSS, JavaScript (Angular is a plus), SQL, ORMsGood communication skills in English (verbal, written, and presentation)A desire to improve interpersonal, public speaking and technical skills\n\nWhat We Offer\n\nAttractive paid internshipWork experience in a multinational environmentYour own mentor who will offer coaching and support in your day to day workThe opportunity of gaining work experience while finishing your degree\n\nSurround yourself with opportunities at Centric\n\nThe internship program at Centric is designed for students who want to practice the theoretical knowledge they have acquired at university, in a company setting. We want to support young IT professionals in developing their skills under the guidance of experienced IT professionals. During the program, they get a dedicated mentor to guide their steps, courses specific to the area of expertise they want to become proficient in, and constant feedback and support from their teammates.",
//     "url": "https://www.linkedin.com/jobs/view/3927696719/",
//     "applyMethod": {
//       "companyApplyUrl": "https://careers.centric.eu/ro/open-positions/full-stack-developer-intern-op-2024457120/?utm_medium=jobboard&utm_source=linkedin",
//       "easyApplyUrl": ""
//     },
//     "company": {
//       "id": 2648581,
//       "name": "Centric IT Solutions Romania",
//       "universalName": "centricitsolutionsromania",
//       "description": "Who we are\nAs experts in creating our own products and delivering outsourced projects, we know a thing or two about creating software products. We’ve been doing this since 2010, when Centric opened its Romanian office in Iasi. We started with a small team of five very dedicated developers who focused on our first project for the Dutch Public Sector. Now, we create products for various industries and fields, including the ones listed below.\n\nThe Dutch public sector - building apps for parking your car, paying your taxes, managing private documents, organizing events & more.\n\nSupply chain - working as a full-service retail provider.\n\nInfrastructure - providing integrated solutions that developers rely on to build, test and deploy applications and users rely on to perform everyday tasks.\n\nXR - designing and developing cutting-edge XR apps.\n\nBut we don’t shy from outsourced projects either and have teams working on a teaching tool and a learning platform used in schools, core solutions for Dutch private and investment banking, and a mobile app used in restaurants.\n\nCustomers trust us every day\nCentric is a Dutch IT company, which is now active in 10 countries across Europe. We work with more than 4,300 customers from numerous organizations, whether they use one Centric application or outsource entire business processes to us.\n\nIt's all about people\nPeople are the heart of our organization. They make Centric a success. That is why we invest in our employees and do everything we can to offer a working environment where everyone comes into their own and can continue to develop.\n\nInvest in what you believe in\nWe were founded in 1992 by our owner Gerard Sanderink, a down-to-earth entrepreneur who likes to make substantial contributions to society through his companies.",
//       "logo": "https://media.licdn.com/dms/image/C4E0BAQE_M9yFhcr-bw/company-logo_200_200/0/1630608142062/centric_it_solutions_romania_logo?e=1724889600&v=beta&t=LWhJBuO30XoQ8mxihRFR_CknLvdu9ofW9Jsk2mQlZrk",
//       "url": "https://www.linkedin.com/company/centricitsolutionsromania",
//       "followerCount": 10622,
//       "staffCount": 290,
//       "staffCountRange": {
//         "start": 5001,
//         "end": 10000
//       },
//       "specialities": [
//         "Software Development",
//         "ASP.NET",
//         "Java",
//         "Oracle",
//         "HTML5",
//         "CSS3",
//         "SharePoint",
//         "SQL Server",
//         ".NET",
//         "Software Testing",
//         "UI/UX Design",
//         "Cybersecurity",
//         "JavaScript",
//         "Software Engineering",
//         "Quality Assurance",
//         "XR",
//         "Frontend Development"
//       ],
//       "industries": [
//         "IT Services and IT Consulting"
//       ],
//       "headquarter": {
//         "geographicArea": "Iasi",
//         "country": "RO",
//         "city": "Iasi",
//         "postalCode": "700032",
//         "line2": "United Business Center 4, etaj 5",
//         "line1": "Str. Palas nr. 3C"
//       }
//     },
//     "contentLanguage": {
//       "code": "EN",
//       "name": "English"
//     },
//     "location": "Iaşi, Iaşi, Romania",
//     "type": "Internship",
//     "applies": 304,
//     "views": 958,
//     "expireAt": 1718465017000,
//     "formattedJobFunctions": [
//       "Engineering",
//       "Information Technology"
//     ],
//     "jobFunctions": [
//       "ENG",
//       "IT"
//     ],
//     "industries": [
//       96
//     ],
//     "formattedIndustries": [
//       "IT Services and IT Consulting"
//     ],
//     "formattedExperienceLevel": "Internship",
//     "listedAt": 1715873017000,
//     "listedAtDate": "2024-05-16 15:23:37 +0000 UTC",
//     "originalListedAt": 1715872240000,
//     "originalListedDate": "2024-05-16 15",
//     "skills": [
//       "OOP",
//       "ASP.NET",
//       "C#",
//       "HTML",
//       "CSS",
//       "JavaScript",
//     ]
//     }
//     }
     

    useEffect(() => {
        fetchProfile();
    }, [job_id]);

    const url = 'https://linkedin-api8.p.rapidapi.com/get-job-details?id=' + job_id;

    const fetchProfile = async () => {
        const options = {
            method: 'GET',
            headers: {
                "X-RapidAPI-Key": "90b30b5ac0msh0106a7cb5e9a100p1f3f01jsn7c9472be0b73",
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

