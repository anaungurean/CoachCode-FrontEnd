import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/SideNavBar';
import TopNavBar from '../components/TopNavBar';
import ProblemDetailedInfo from '../components/ProblemDetailedInfo';
import { Code } from 'lucide-react';
import CodePart from '../components/CodePart';

function ProblemPage() {
  const { id } = useParams(); // Extract id from the route params
  const [problem, setProblem] = useState(null); // State to hold the fetched problem

  useEffect(() => {
    fetchProblem(id); // Fetch problem with the id from the route params
  }, [id]); // Re-fetch problem whenever the id changes

    const fetchProblem = (id) => {
    fetch(`http://localhost:5000/problems/${id}`, {
        method: 'GET', // Use GET method to fetch the problem
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Problem not found'); // Throw an error if problem not found
        }
        return response.json(); // Parse response JSON
    })
    .then(data => {
        setProblem(data); // Update state with the fetched problem
        console.log(data);
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
          <CodePart problem={problem} />
        )}
      </div>
    </div>
  );
}

export default ProblemPage;
