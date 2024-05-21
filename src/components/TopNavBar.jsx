/* eslint-disable react/prop-types */
import { Home, ChevronRight } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex px-5 py-4 mt-4 mr-2 text-twilight-400 border border-gray-200 rounded-xl bg-white" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {item.link ? (
              <a href={item.link} className="inline-flex items-center font-medium text-twilight-300 hover:text-twilight-500">
                {index === 0 && (
                  <Home className="w-4 h-4 me-2.5" />
                )}
                {item.name}
              </a>
            ) : (
              <span className="inline-flex items-center  font-medium text-twilight-300 ">
                {item.name}
              </span>
            )}
            {index < items.length - 1 && (
              <ChevronRight className="rtl:rotate-180 block w-4 h-4 mx-1 text-twilight-300" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
