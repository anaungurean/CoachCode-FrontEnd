import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProblemPage = ({ problemId }) => {
  const [problem, setProblem] = useState(null);

  useEffect(() => {
   
    const url = `http://localhost:5000/problems/1`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Problem not found');
        }
        return response.json();
      })
      .then(data => setProblem(data))
      .catch(error => console.error('Error fetching problem:', error));
  }, [problemId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
      {problem ? (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">{problem.title}</h2>
          <p className="text-gray-700 mb-2">Description: {problem.description}</p>
          <p className="text-gray-700 mb-2">Difficulty: {problem.difficulty}</p>
          <p className="text-gray-700 mb-2">Companies: {problem.companies}</p>
          <p className="text-gray-700 mb-2">Related Topics: {problem.related_topics}</p>
          <p className="text-gray-700 mb-2">Asked by FAANG: {problem.asked_by_faang ? 'Yes' : 'No'}</p>
          <p className="text-gray-700 mb-2">Similar Questions: {problem.similar_questions}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
ProblemPage.propTypes = {
  problemId: PropTypes.number.isRequired,
};
export default ProblemPage;
