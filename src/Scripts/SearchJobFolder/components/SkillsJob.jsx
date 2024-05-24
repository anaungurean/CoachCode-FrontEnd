
import{ useState } from 'react';
import PropTypes from 'prop-types';
import {BookCheck,  ChevronDown, ChevronUp } from 'lucide-react';

function SkillsJob({ job }) {
  const [isExpanded, setIsExpanded] = useState(true);
             console.log(job);


  return (
    <div className="mt-4 mr-4 border pl-4 pt-4 pb-4 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center ml-4">
          <BookCheck size={24} className="text-twilight-300 mr-2" />
          <h1 className="text-xl font-bold text-twilight-300">Required skills </h1>
        </div>
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-twilight-500 hover:text-twilight-700 mr-4">
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>
      {isExpanded && (
        <div className="mt-4">
          <div className="mt-2 ml-4 mr-4 text-black-900 text-base">
            {
                job.skills ? (
                    job.skills.map((skill, index) => (
                        <span
                            key={index}
                            className={`inline-flex items-center rounded-md px-2 py-1 ml-2 mt-2 text-sm font-medium bg-purple-50 text-purple-800 ring-purple-600/20 ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}
                        >
                            {skill}
                        </span>
                    ))
                ) : (
                    <span className="text-base font-medium text-twilight-400">No skills mentioned </span>
                )

            }
           
          </div>
        </div>
      )}
    </div>
  );
}

SkillsJob.propTypes = {
    job: PropTypes.object.isRequired,
};

export default SkillsJob;
