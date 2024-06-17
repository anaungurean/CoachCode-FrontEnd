import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import ProblemDetailedInfo from './components/ProblemDetailedInfo';
import CodePart from './components/CodePart';
import Solution from './components/Solution';
import Popup from './components/PopUp'; 

function ProblemPage() {
  const { id } = useParams();  
  const [problem, setProblem] = useState(null);  
  const [isPopupOpen, setIsPopupOpen] = useState(false);  
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);  
  useEffect(() => {
    fetchProblem(id);  
  }, [id]); 

  const fetchProblem = (id) => {
    const token = localStorage.getItem('authToken');  
    fetch(`http://localhost:5000/problems/${id}`, {
      method: 'GET',  
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Problem not found'); 
      }
      return response.json();  
    })
    .then(data => {
      setProblem(data); 
      console.log(typeof data.solution);
      console.log(data.solution);

    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  };

  const togglePopup = (isAnswerCorrect) => {
    setIsPopupOpen(!isPopupOpen);  
    setIsAnswerCorrect(isAnswerCorrect);  
    
  };
 
  const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'Coding Practice', link:'/problems' },
    { name: problem ? problem.title : '', link: null }
    ];

  return (
    <div className="flex">
      <div className="w-1/6"> 
        <NavBar/>
      </div>
      <div className='w-5/6'>
        <Breadcrumb items={breadcrumbItems} />
        {problem && (
          <ProblemDetailedInfo problem={problem} />
        )}
        {problem && (
          <CodePart problem={problem} />
        )}
        {problem && (
          <Solution togglePopup={togglePopup} isAnswerCorrect={isAnswerCorrect} problem={problem} />
        )}
        {isPopupOpen && (
          <Popup question={problem.question} togglePopup={togglePopup} />
        )}

      </div>
      </div>
  );
  
}

export default ProblemPage;
