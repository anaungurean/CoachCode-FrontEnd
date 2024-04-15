import PropTypes from 'prop-types';
import { BadgeX, Check } from 'lucide-react';
import styles from './ProblemCard.module.css';

function extractExamplesAndConstraints(description) {
  const examples = [];
  let constraints = '';

  const lines = description.split('\n');
  let currentExample = null;
  let isConstraintsSection = false;

  for (const line of lines) {
    if (line.startsWith('Example')) {
      if (currentExample) {
        examples.push(currentExample);
      }
      currentExample = { input: [], output: [] };
      isConstraintsSection = false;
    } else if (line.startsWith('Constraints')) {
      isConstraintsSection = true;
    } else if (isConstraintsSection) {
      constraints += line.trim() + '\n';
    } else if (line.startsWith('Input:')) {
      currentExample.input.push(line.replace('Input: ', ''));
    } else if (line.startsWith('Output:')) {
      currentExample.output.push(line.replace('Output: ', ''));
    }
  }

  if (currentExample) {
    examples.push(currentExample);
  }

  return { examples, constraints: constraints.trim() };
}

function ProblemDetailedInfo({ problem }) {
  const relatedTopicsArray = problem.related_topics.split(',');
  const nonEmptyRelatedTopics = relatedTopicsArray.filter(topic => topic.trim() !== '');
  const firstTwoRelatedTopics = nonEmptyRelatedTopics.slice(0, 3);

  const companiesArray = problem.companies.split(',');
  const nonEmptyCompanies = companiesArray.filter(company => company.trim() !== '');
  const firstTwoCompanies = nonEmptyCompanies.slice(0, 3);


  let difficultyColorClass = '';
  if (problem.difficulty === 'Easy') {
    difficultyColorClass = 'bg-green-50 text-green-700 ring-green-600/20';
  } else if (problem.difficulty === 'Medium') {
    difficultyColorClass = 'bg-yellow-50 text-yellow-800 ring-yellow-600/20';
  } else if (problem.difficulty === 'Hard') {
    difficultyColorClass = 'bg-red-50 text-red-700 ring-red-600/10';
  }

  let topicColorClass = 'bg-violet-50 text-violet-700 ring-violet-600/20';
  let companyColorClass = 'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-600/30';

  const { examples, constraints } = extractExamplesAndConstraints(problem.description);

  return (
    <div className="card">
      <div className="mt-10 mr-4 border pl-4 pt-4 pb-80 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md ">
        <div className='flex items-center'>
          <div className={styles.icon}>
            {problem.solved ? <Check size={20} /> : <BadgeX size={20} />}
          </div>
          <div className="text-2xl font-bold text-twilight-400">{problem.id}. {problem.title}</div>
        </div>
        <div className="mt-2">
          <span className={`inline-flex items-center rounded-md px-2 py-1 ml-2 mt-2 text-sm font-medium ${difficultyColorClass} ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}>{problem.difficulty}</span>

          {firstTwoRelatedTopics.length > 0 && (
            // Mapping over the first two related topics
            firstTwoRelatedTopics.map((topic, index) => (
                <p key={index} className={`inline-flex items-center rounded-md px-2 py-1 ml-2 mt-2 text-sm font-medium ${topicColorClass} ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}>
                {topic.trim()}
              </p>
            ))
          )}

          {firstTwoCompanies.length > 0 && (
            // Mapping over the first two companies
            firstTwoCompanies.map((company, index) => (
                <p key={index} className={`inline-flex items-center rounded-md px-2 py-1 ml-2 mt-2 text-sm font-medium ${companyColorClass} ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}>
                {company.trim()}
              </p>
            ))
          )}

          {/* Display Examples */}
          {examples.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">Examples</h3>
              {examples.map((example, index) => (
                <div key={index} className="mt-2">
                  <p><strong>Input:</strong> {example.input.join(', ')}</p>
                  <p><strong>Output:</strong> {example.output.join(', ')}</p>
                </div>
              ))}
            </div>
          )}
          
          {/* Display Constraints */}
          {constraints && (
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">Constraints</h3>
              <p className="mt-2 text-gray-600">{constraints}</p>
            </div>
          )}
          
          <div className="mt-4">
            <h3 className="text-lg font-bold text-gray-800">Description</h3>
            <p className="mt-2 text-gray-600">{problem.description}</p>
           </div>
        </div>
      </div>
    </div>
  );
}

ProblemDetailedInfo.propTypes = {
  problem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    related_topics: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    companies: PropTypes.string.isRequired,
    similar_questions: PropTypes.string.isRequired,
    asked_by_faang: PropTypes.bool.isRequired,
    solved: PropTypes.bool
  }).isRequired
};

export default ProblemDetailedInfo;
