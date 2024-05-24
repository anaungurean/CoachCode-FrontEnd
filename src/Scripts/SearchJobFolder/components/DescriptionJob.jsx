import { useState } from 'react';
import PropTypes from 'prop-types';
import keywordExtractor from 'keyword-extractor';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

function DescriptionJob({ job }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const extractKeywords = (description) => {
    const options = {
      language: 'english',
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true,
      remove_stopwords: true,
    };

    return keywordExtractor.extract(description, options);
  };

  const keywords = extractKeywords(job.description);

  const formatDescription = (description, keywords) => {
    const paragraphs = description.split('\n');

    return paragraphs.map((paragraph, index) => {
      const words = paragraph.split(' ');
      return (
        <p key={index} className="mb-2">
          {words.map((word, index) => (
            <span key={index} className={keywords.includes(word.toLowerCase()) ? 'font-medium text-twilight-500' : ''}>
              {word + ' '}
            </span>
          ))}
        </p>
      );
    });
  };

  return (
    <div className="mt-2 mr-4 border pl-4 pt-4 pb-4 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center ml-4">
          <Info size={24} className="text-twilight-300 mr-2" />
          <h1 className="text-xl font-bold text-twilight-300">Job Description</h1>
        </div>
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-twilight-500 hover:text-twilight-700 mr-4">
          {isExpanded ? <ChevronUp size={24}  /> : <ChevronDown size={24} />}
        </button>
      </div>
      {isExpanded && (
        <div className="mt-2 ml-4 mr-4 text-black-900 text-base">
          {formatDescription(job.description, keywords)}
        </div>
      )}
    </div>
  );
}

DescriptionJob.propTypes = {
  job: PropTypes.object.isRequired,
};

export default DescriptionJob;
