import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/SideNavBar';
import TopNavBar from '../components/TopNavBar';
import ProblemDetailedInfo from '../components/ProblemDetailedInfo';
import CodePart from '../components/CodePart';

function ProblemPage() {
  const { id } = useParams();  
  const [problem, setProblem] = useState(null);  

  useEffect(() => {
    fetchProblem(id);  
  }, [id]); 

    const fetchProblem = (id) => {
    fetch(`http://localhost:5000/problems/${id}`, {
        method: 'GET',  
        headers: {
        'Content-Type': 'application/json'
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
          <CodePart tests={problem.tests} />
        )}
      </div>
    </div>
  );
}

export default ProblemPage;
