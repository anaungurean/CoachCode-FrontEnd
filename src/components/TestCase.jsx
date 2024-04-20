import 'react-circular-progressbar/dist/styles.css'; // Make sure to import the styles
import { ShieldQuestion } from 'lucide-react';
  

function TestCase(input_variables) {
 
  return (
    <div className="mt-4 mr-4 border pl-4 pt-4 pb-8 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md">
      <div className="flex items-center ml-4">
        <ShieldQuestion size={28} className="mr-2 text-twilight-400" />
        <h2 className="text-2xl font-bold text-twilight-400 px-2">Test case</h2>
        </div>
         <hr className="border-twilight-200 mt-1 mr-8 ml-4" />
         <div className="mt-4 mr-8 ml-4 mb-4">
           <p className="text-black-900 text-base">Here you can test your code: </p>
         </div>
         <div className="mt-4 mr-8 ml-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>
            {input_variables.input_variables.map((input_variable, index) => (
                <div key={index} className="border border-gray-300 p-4 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md">
                    <h3 className="text-xl font-bold text-twilight-400">Test case {index + 1}</h3>
                    <div className="mt-2 ml-4 mr-4 text-black-900 text-base">
                        <p>Input: {input_variable.input}</p>
                        <p>Expected output: {input_variable.expected_output}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    
  );
}

 

export default TestCase;


// <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {input_variables.input_variables.map((input_variable, index) => (
//                 <div key={index} className="border border-gray-300 p-4 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md">
//                     <h3 className="text-xl font-bold text-twilight-400">Test case {index + 1}</h3>
//                     <div className="mt-2 ml-4 mr-4 text-black-900 text-base">
//                     <p>Input: {input_variable.input}</p>
//                     <p>Expected output: {input_variable.expected_output}</p>
//                     </div>
//                 </div>
//                 ))}
//             </div>