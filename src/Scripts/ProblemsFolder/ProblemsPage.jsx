import { useState, useEffect } from 'react';
import ProblemCard from './components/ProblemCard';  
import NavBar from '../../components/SideNavBar';
import Pagination from './components/Pagination';
import Breadcrumb from '../../components/TopNavBar';
import FilterComponent from './components/Filter';

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
    const token = localStorage.getItem('authToken');  
    fetch('http://localhost:5000/problems', {
      headers: {
        'Authorization': `Bearer ${token}`  
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Authentication error');  
        }
        return response.json();
      })
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

   const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'Coding Practice', link:null },
  ];

  return (
    <div className="flex">
      <div className="w-1/6"> 
        <NavBar/>
      </div>
      <div className='w-5/6'>
        <Breadcrumb items={breadcrumbItems} />
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
