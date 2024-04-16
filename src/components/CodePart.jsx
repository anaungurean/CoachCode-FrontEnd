import { FaCode } from "react-icons/fa";
import Example from "./LanguageDropdown";

function CodePart({ problem }) {
  return (
       <div className="card">
      <div className="mt-4 mr-4 border pl-4 pt-4 pb-10 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md ">
        <div className="flex items-center">       
          <FaCode size={28} className="text-twilight-400 " />
          <h2 className="text-2xl font-bold text-twilight-400 px-2">Code</h2>
        </div>
        <hr className="border-twilight-200 mt-1 mr-8" />  
        <div className="mt-4 mr-4">
          <Example problem={problem} />
        </div>
        </div>
    </div>
  );
}

export default CodePart;