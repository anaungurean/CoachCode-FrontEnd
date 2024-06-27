import  { useState, useEffect } from 'react';

const Card = () => {
     const [problems, setProblems] = useState(1800);
    const [assistants, setAssistants] = useState(3);
    const [jobs, setJobs] = useState(2000);
    const [colleagues, setColleagues] = useState(1900);

    useEffect(() => {
        const duration = 1000; 
        
        const increment = (startValue, finalValue, setter) => {
            let currentValue = startValue;
            const steps = finalValue - startValue;
            const stepTime = Math.max(1, Math.floor(duration / steps));

            const timer = setInterval(() => {
                currentValue += 1;
                setter(currentValue);
                if (currentValue >= finalValue) {
                    clearInterval(timer);
                }
            }, stepTime);
        };

        increment(1800, 2030, setProblems);
        increment(3, 5, setAssistants);
        increment(2000, 2050, setJobs);
        increment(1900, 2060, setColleagues);
    }, []);

    return (
        <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-4 flex items-center justify-center hover:-translate-y-1 transform transition duration-300 ease-in-out">
            <div className='grid grid-cols-4 gap-4 w-full text-center'>
                <div className='col-span-1 flex flex-col items-center justify-center '>
                    <p className='text-lg font-semibold text-twilight-400'>{problems}</p>
                    <p className='text-lg font-semibold text-twilight-400'>Problems to Practice</p>
                </div>
                <div className='col-span-1 flex flex-col items-center justify-center border-l-4 border-twilight-100'>
                    <p className='text-lg font-semibold text-twilight-400'>{assistants}</p>
                    <p className='text-lg font-semibold text-twilight-400'>Voice Assistants</p>
                </div>
                <div className='col-span-1 flex flex-col items-center justify-center border-l-4 border-twilight-100'>
                    <p className='text-lg font-semibold text-twilight-400'>{jobs}</p>
                    <p className='text-lg font-semibold text-twilight-400'>Job Opportunities</p>
                </div>
                <div className='col-span-1 flex flex-col items-center justify-center border-l-4 border-twilight-100'>
                    <p className='text-lg font-semibold text-twilight-400'>{colleagues}</p>
                    <p className="text-lg font-semibold text-twilight-400">Colleagues to Chat With</p>
                </div>
            </div>
        </div>
    );
}

export default Card;

