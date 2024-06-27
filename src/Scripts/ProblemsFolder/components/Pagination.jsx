import PropTypes from 'prop-types'; // Import PropTypes
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const generatePageNumbers = () => {
    const visiblePages = 10;  
    const pages = [];
    let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
    let endPage = Math.min(startPage + visiblePages - 1, totalPages);

    if (endPage - startPage < visiblePages - 1) {
      startPage = Math.max(endPage - visiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      pages.unshift('...');
    }
    if (endPage < totalPages) {
      pages.push('...');
    }

    return pages;
  };

  return (
<div className="flex flex-col items-center sm:flex-row justify-between border border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-xl">
   <div className="mb-2 sm:mb-0">
    <p className="text-sm text-gray-700">
      Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
      <span className="font-medium">
        {Math.min(currentPage * 10, totalPages === currentPage ? totalPages * 10 : currentPage * 10)}
      </span>{' '}
      of <span className="font-medium">{totalPages * 10}</span> results
    </p>
  </div>

   <div className="flex mt-2 sm:mt-0">
    <nav className="inline-flex rounded-md shadow-sm">
       <button
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
        className={`${
          currentPage === 1 ? 'pointer-events-none opacity-50' : ''
        } relative inline-flex items-center px-2 py-2 text-gray-400 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
      >
        <span className="sr-only">Previous</span>
        <ArrowLeftFromLine className="h-5 w-5" aria-hidden="true" />
      </button>

       <div className="sm:hidden ml-2">
        <select
          value={currentPage}
          onChange={(e) => handlePageClick(parseInt(e.target.value))}
          className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          {generatePageNumbers().map((page, index) => (
            <option key={index} value={page}>
              Page {page}
            </option>
          ))}
        </select>
      </div>

       <div className="hidden sm:flex">
        {generatePageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => (typeof page === 'number' ? handlePageClick(page) : null)}
            className={`${
              currentPage === page ? 'z-10 bg-twilight-200 text-white ' : 'text-gray-700 hover:bg-gray-50'
            } relative inline-flex items-center px-4 py-2 text-sm font-semibold border-t border-b border-gray-300`}
          >
            {page}
          </button>
        ))}
      </div>

       <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className={`${
          currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
        } relative inline-flex items-center px-2 py-2 text-gray-400 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
      >
        <span className="sr-only">Next</span>
        <ArrowRightFromLine className="h-5 w-5" aria-hidden="true" />
      </button>
    </nav>
  </div>
</div>




  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

