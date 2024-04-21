import PropTypes from 'prop-types';
import { BadgeX, Check } from 'lucide-react';
import styles from './ProblemCard.module.css';
import AccordionProblemInfo from './AccordionProblemInfo';
 

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

  
  return (
    <div className="card">
      <div className="mt-4 mr-4 border pl-4 pt-4 pb-4 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md ">
        <div className='flex items-center'>
          <div className={styles.icon}>
            {problem.solved ? <Check size={20} /> : <BadgeX size={20} />}
          </div>
          <div className="text-2xl font-bold text-twilight-400">{problem.id}. {problem.title}</div>
        </div>
        <div className="mt-2">
          <span className={`inline-flex items-center rounded-md px-2 py-1 ml-2 mt-2 text-sm font-medium ${difficultyColorClass} ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}>{problem.difficulty}</span>

          {firstTwoRelatedTopics.length > 0 && (
            firstTwoRelatedTopics.map((topic, index) => (
                <p key={index} className={`inline-flex items-center rounded-md px-2 py-1 ml-2 mt-2 text-sm font-medium ${topicColorClass} ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}>
                {topic.trim()}
              </p>
            ))
          )}

          {firstTwoCompanies.length > 0 && (
            firstTwoCompanies.map((company, index) => (
                <p key={index} className={`inline-flex items-center rounded-md px-2 py-1 ml-2 mt-2 text-sm font-medium ${companyColorClass} ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}>
                {company.trim()}
              </p>
            ))
          )}
          {
            problem.asked_by_faang && <p className={`inline-flex items-center rounded-md px-2 py-1 ml-2 mt-2 text-sm font-medium bg-pink-50 text-pink-800 ring-pink-600/20 ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}>Asked by FAANG</p>
          }

          </div>
          </div>

            <div className="mt-2 mr-4 border pl-4 pt-4 pb-4 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md ">
          <h1 className="text-xl font-bold text-twilight-500">Description</h1>
          <div className="mt-2 ml-4 mr-4 text-black-900 text-base ">
            {problem.description.split('\n').map((line, index) => (
              <div key={index} className={(line.startsWith('Example') || line.startsWith('Constraints:')) ? 'font-bold pt-2 text-l ml-2 text-twilight-400' : ''}>
                {line.startsWith('`') && line.endsWith('`') ? (
                  <div className="ml-6 mb-1">
                    <ul className="list-disc list-inside">
                    <li className="text-base text-twilight-500 rounded-l  ">
                        <span className="bg-gray-100 hover:bg-gray-200">{line.substring(1, line.length - 1)}</span>
                  </li>
                    </ul>
                  </div>
                ) :
                line.startsWith('Follow up') ? (
                    <h1 className='mt-5'>
                   {line.split(' ').map((word, wordIndex) => {

                    if (word === 'Follow' || word === 'up:') {
                      return (
                        <span key={wordIndex} className="font-bold text-l text-twilight-400  ">
                          {word}{' '}
                        </span>
                      );
                    }
                    else if (word.includes('`')) {
                      return (
                        <span key={wordIndex} className='bg-gray-100 text-gray-900 px-1 rounded-md hover:bg-gray-200'>
                          {word.replaceAll(/[`,]/g,'')}{' '}
                        </span>
                      );
                    }
                    else {
                      return (
                        <span key={wordIndex} className="text-base ml-1 text-gray-900 ">
                          {word}{' '}
                        </span>
                      );
                    }
                    }
                    )}
                  </h1>
                    
                    
                ):
                (
                  <p>
                    {line.split(' ').map((word, wordIndex) => {
                      if (word === 'Input:' || word === 'Output:' || word === 'Explanation:') {
                        return (
                          <span key={wordIndex} className="font-semibold text-base text-twilight-300 ml-6">
                            {word}{' '}
                          </span>
                        );
                      } else if ((line.includes('Input:') && word !== 'Input:') || (line.includes('Output:') && word !== 'Output:') || (line.includes('Explanation:') && word !== 'Explanation:')){
                        return (
                          <span key={wordIndex} className="text-base ml-1 text-gray-900 ">
                            {word}{' '}
                          </span>
                        );
                      } else if (word.includes('`')) {
                        return (
                          <span key={wordIndex} className='bg-gray-100 text-gray-900 px-1 rounded-md hover:bg-gray-200'>
                            {word.replaceAll(/[`,]/g,'')}{' '}
                          </span>
                        );
                      } 
                      
                      else
                      {
                        return (
                          <span key={wordIndex} className=''>
                            {word}{' '}
                          </span>
                        );
                      }
                    })}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <AccordionProblemInfo related_topics={problem.related_topics} companies={problem.companies} similar_questions={problem.similar_questions} />

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
    solved: PropTypes.bool,
    tests: PropTypes.arrayOf(
      PropTypes.shape({
        input: PropTypes.string.isRequired,
        output: PropTypes.string.isRequired
      })
    ).isRequired,
    input_variables: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired,
    solution: PropTypes.string.isRequired
  }).isRequired
};

export default ProblemDetailedInfo;
