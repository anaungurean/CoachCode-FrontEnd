import  { useState, useEffect } from 'react';
import ProblemCard from '../components/ProblemCard';  
import ProblemPage from './ProblemPage';   
import NavBar from '../components/SideNavBar';
import Pagination from '../components/Pagination';
import TopNavBar from '../components/TopNavBar'
import FilterComponent from '../components/Filter';

function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProblem, setSelectedProblem] = useState(null);  
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

  // Function to handle problem card click
  const handleProblemCardClick = (problem) => {
    setSelectedProblem(problem);
  };

  return (
    <div className="flex">
      <div className="w-1/6"> 
        <NavBar/>
      </div>
      <div className='w-5/6'>
        <TopNavBar currentPage={'Problems'}></TopNavBar>
        <FilterComponent></FilterComponent>

      <div className="p-4"> 
        {selectedProblem ? (  // Render ProblemPage if a problem is selected
          <ProblemPage problem={selectedProblem} />
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {problems
                .slice((currentPage - 1) * problemsPerPage, currentPage * problemsPerPage)
                .map(problem => (
                  <ProblemCard key={problem.id} problem={problem} onClick={() => handleProblemCardClick(problem)} /> // Pass onClick handler to ProblemCard
                ))}
            </div>
            <div className="mt-4">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default ProblemsPage;
