import { useState, useEffect } from 'react';
import ProblemCard from '../components/ProblemCard';  
import NavBar from '../components/SideNavBar';
import Pagination from '../components/Pagination';
import TopNavBar from '../components/TopNavBar';
import FilterComponent from '../components/Filter';

function ProblemsPage() {
  const [originalProblems, setOriginalProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [problemsPerPage] = useState(9);
  const [totalPages, setTotalPages] = useState(1);  

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = () => {
    fetch('http://localhost:5000/problems')
      .then(response => response.json())
      .then(data => {
        setOriginalProblems(data);
        setFilteredProblems(data);  
        setTotalPages(Math.ceil(data.length / problemsPerPage));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilter = (filteredProblems) => {
    setFilteredProblems([...filteredProblems]);
    setCurrentPage(1);  
    setTotalPages(Math.ceil(filteredProblems.length / problemsPerPage));  
  };

  return (
    <div className="flex">
      <div className="w-1/6"> 
        <NavBar/>
      </div>
      <div className='w-5/6'>
        <TopNavBar currentPage={'Problems'}></TopNavBar>
        <FilterComponent onFilter={handleFilter} problems={originalProblems} />
        <div className="p-4"> 
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProblems
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
      </div>
    </div>
  );
}

export default ProblemsPage;
