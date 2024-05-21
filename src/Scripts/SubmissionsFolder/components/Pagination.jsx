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
    const visiblePages = 5;  
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
    <div className="flex items-center justify-between border border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-xl">
      <div>
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{(currentPage - 1) * 5 + 1}</span> to{' '}
          <span className="font-medium">
            {Math.min(currentPage * 5, totalPages === currentPage ? totalPages * 5 : currentPage * 5)}
          </span>{' '}
          of <span className="font-medium">{totalPages * 5}</span> results
        </p>
      </div>
      <div>
        <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
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
          {generatePageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => (typeof page === 'number' ? handlePageClick(page) : null)}
              className={`${
                currentPage === page ? 'z-10 bg-twilight-200 text-white ' : ''
              } relative inline-flex items-center px-4 py-2 text-sm font-semibold`}
            >
              {page}
            </button>
          ))}
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

