 import { useState, useEffect } from 'react';
import ProblemCard from '../../components/ProblemCard';  
import NavBar from '../../components/NavBar';

function ProblemsPage() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/problems')
      .then(response => response.json())
      .then(data => {
        setProblems(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (

     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <NavBar/>
      {/* Map over the problems array and render a ProblemCard for each problem */}
      {problems.map(problem => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  );
}

export default ProblemsPage;