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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = () => {

    if (originalProblems.length == 0) {
      setIsLoading(true)
    }
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
        setIsLoading(false);
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
    { name: 'Home', link: '/Home' },
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
        {isLoading && 
                <div className="text-center mt-4 mr-4 py-4 bg-white border border-twilight-100 rounded-2xl overflow-hidden text-twilight-500 font-semibold text-xl">
                    <div className="flex justify-center items-center flex-row">
                        <button type="button" className="text-twilight-100 px-4 py-2 rounded" disabled>
                            <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="twilight-100" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="twilight-500" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                        </button>
                         The problems are loading...
                    </div>
                </div>
        }
        <div className="p-4"> 
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProblems
                  .slice((currentPage - 1) * problemsPerPage, currentPage * problemsPerPage)
                  .map(problem => (
                    <ProblemCard key={problem.id} problem={problem} />
                  ))}
              </div>
              {originalProblems.length > 0 && !isLoading && (
              <div className="mt-4">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </div>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemsPage;
 