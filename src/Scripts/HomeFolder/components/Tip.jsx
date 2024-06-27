import PropTypes from 'prop-types';
import { Quote } from 'lucide-react';

const Tip = ({ tip }) => {
  return (
    <div className="bg-white bg-opacity-80 shadow-md rounded-lg pt-4 pl-4 pr-4 flex flex-col hover:-translate-y-1 transform transition duration-300 ease-in-out">
      <div className="flex items-start">
        <div className="bg-purple-100 rounded-md p-2 flex w-full">
          <div className="flex items-center">
            <Quote size={20} className="text-twilight-400 mr-2" />
            <h4 className="text-xl font-semibold text-twilight-400">Quote of the day</h4>
          </div>
        </div>
      </div>
      <blockquote className="mt-2 text-lg mb-2 text-gray-700 mr-8 italic border-l-4 border-twilight-100 pl-4">
        {tip}
      </blockquote>
    </div>
  );
}

Tip.propTypes = {
  tip: PropTypes.string.isRequired,
};

export default Tip;
