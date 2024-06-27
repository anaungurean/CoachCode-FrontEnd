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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchProblem(id);  
  }, [id]); 

  const fetchProblem = (id) => {
    const token = localStorage.getItem('authToken'); 
    if (!problem) {
    setIsLoading(true);
    } 
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
      setIsLoading(false);
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
    { name: 'Home', link: '/Home' },
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
         {isLoading && 
                <div className="text-center mt-4 mr-4 py-4 bg-white border border-twilight-100 rounded-2xl overflow-hidden text-twilight-500 font-semibold text-xl">
                    <div className="flex justify-center items-center flex-row">
                        <button type="button" className="text-twilight-100 px-4 py-2 rounded" disabled>
                            <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="twilight-100" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="twilight-500" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                        </button>
                         The problem details are generating...
                    </div>
                </div>
        }
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
