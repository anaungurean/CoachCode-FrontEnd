import { Code } from 'lucide-react';
import { BadgeX } from 'lucide-react';
import { Link } from 'react-router-dom';

const Problem = () => {
  return (
    <Link to="/problems/1" className="flex justify-between ">
      <div className="bg-white bg-opacity-80 shadow-md rounded-lg pt-4 pl-4 pr-4 flex flex-col hover:-translate-y-1 transform transition duration-300 ease-in-out w-full">
        <div className="flex items-start">
          <div className="bg-purple-100 rounded-md p-2 flex w-full">
            <div className="flex items-center">
              <Code size={20} className="text-twilight-400 mr-2" />
              <h4 className="text-xl font-semibold text-twilight-400">Problem of the day</h4>
            </div>
          </div>
        </div>
        <div className="mt-2 text-lg mb-2 text-gray-700 mr-8 border-l-4 border-twilight-100 pl-4">
          <div className="flex items-center">
            <BadgeX size={20} className="text-twilight-400 mr-2" />
            <p>Two Sum</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Problem;
