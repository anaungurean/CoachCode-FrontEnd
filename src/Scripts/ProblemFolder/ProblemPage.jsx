import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/SideNavBar';
import TopNavBar from '../../components/TopNavBar';
import ProblemDetailedInfo from './components/ProblemDetailedInfo';
import CodePart from './components/CodePart';
import Solution from './components/Solution';
import Popup from './components/PopUp'; 

function ProblemPage() {
  const { id } = useParams();  
  const [problem, setProblem] = useState(null);  
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for managing popup visibility
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false); // State for tracking answer correctness

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
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  };

  const togglePopup = (isAnswerCorrect) => {
    setIsPopupOpen(!isPopupOpen);  
    setIsAnswerCorrect(isAnswerCorrect);  
    
  };
 

  return (
    <div className="flex">
      <div className="w-1/6"> 
        <NavBar/>
      </div>
      <div className='w-5/6'>
        <TopNavBar currentPage={'Problems'}></TopNavBar>
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
