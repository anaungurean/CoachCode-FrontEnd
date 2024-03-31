import { useState, useEffect } from 'react';
import ProblemCard from '../../components/ProblemCard';  
import NavBar from '../../components/NavBar';
import Pagination from '../../components/Pagination';

function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [problemsPerPage] = useState(9);

  useEffect(() => {
    fetchProblems();
  }, [currentPage]);

  const fetchProblems = () => {
    fetch('http://localhost:5000/problems')
      .then(response => response.json())
      .then(data => {
        setProblems(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(problems.length / problemsPerPage);

  return (
    <div className="flex">
      <div className="w-1/5"> 
        <NavBar/>
      </div>
      <div className="w-3/4 p-4"> 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {problems
            .slice((currentPage - 1) * problemsPerPage, currentPage * problemsPerPage)
            .map(problem => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
        </div>
        <div className="mt-4">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
}

export default ProblemsPage;
