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
    <div className="flex">
      <div className="w-1/5"> {/* Partea stângă, ocupă 1/4 din spațiu */}
        <NavBar/>
      </div>
      <div className="w-3/4 p-4"> {/* Partea dreaptă, ocupă 3/4 din spațiu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Map over the problems array and render a ProblemCard for each problem */}
          {problems.map(problem => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProblemsPage;
