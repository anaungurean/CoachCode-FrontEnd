import NavBar from '../../components/SideNavBar';
import TopNavBar from '../../components/TopNavBar';
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import SubmissionDetails from './components/SubmissionsTable';

function SubmissionsPage() {

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = () => {
    const token = localStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id;

    fetch(`http://localhost:5000/submissions_user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setSubmissions(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    
  };
  

  return (
    <div className="flex">
      <div className="w-1/6"> 
        <NavBar/>
      </div>
      <div className='w-5/6'>
        <TopNavBar currentPage={'Submissions'}></TopNavBar>

        <div className="flex justify-center">
          <SubmissionDetails SubmissionsDetails={submissions} />
        </div>
      </div>
    </div>
  );
}


export default SubmissionsPage;
