import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import logo from "../../../assets/profile.png";

export default function Slide() {
    const [activeSlide, setActiveSlide] = useState(0);

     const slides = [
        {
            title: '🚀 Welcome to CoachCode',
            content: `Are you preparing for a technical interview? CoachCode is the perfect platform to help you succeed in your job search. With a wide range of features, CoachCode is designed to support you at every step of your journey to a successful IT career.`,
        },
        {
            title: '💼 Efficient Interview Preparation',
            content: `CoachCode offers a comprehensive set of tools to help you prepare for interviews. The platform provides mock interviews to help you build confidence and perform well in real interviews.`,
        },
        {
            title: '💻 Enhance Your Coding Skills',
            content: `CoachCode offers a wide range of coding problems to help you enhance your coding skills. The platform provides a variety of problems to solve, ranging from easy to hard, to help you improve your problem-solving abilities.`,
        },
        {
            title: '🔍 Find Jobs and Create CVs',
            content: `CoachCode also helps you in your job search journey by offering tools to search for relevant job opportunities in the IT industry. Additionally, you can create and customize your CV using templates provided within the application, ensuring a professional presentation of your skills and experience.`,
        }
    ];

    const totalSlides = slides.length;

    const goToPreviousSlide = () => {
        setActiveSlide((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
    };

    const goToNextSlide = () => {
        setActiveSlide((prevIndex) => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white px-6 py-10 rounded-3xl border-2 border-twilight-500 shadow-md shadow-twilight-100 md:max-w-2xl lg:max-w-3xl">
             <div className="flex items-center justify-start mb-4">
                <img src={logo} alt="Welcome to CoachCode" className="w-14 h-10" /> {/* Stilizează dimensiunea imaginii aici */}
                <h1 className='text-4xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r text-transparent from-twilight-500 to-twilight-100 bg-clip-text'>CoachCode</h1>
            </div>
    <div className="flex items-center justify-between mt-8">
    
    {totalSlides > 1 && (
        <button
            className={`flex items-center px-2 py-2 text-sm text-gray-600 bg-purple-100 rounded-full hover:bg-purple-200 ${activeSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={goToPreviousSlide}
            disabled={activeSlide === 0}
        >
            <ArrowLeft className="w-4 h-4" />
        </button>
    )}

    <div className="flex-1 mx-4">  
        <div className="">
            <h2 className="text-3xl md:text-3xl font-bold text-twilight-300">{slides[activeSlide].title}</h2>
            <p className="mt-4 text-lg text-gray-700">{slides[activeSlide].content}</p>
        </div>
    </div>

    {totalSlides > 1 && (
        <button
            className={`flex items-center px-2 py-2 text-sm text-twilight-500 bg-purple-100 rounded-full hover:bg-purple-200 ${activeSlide === totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={goToNextSlide}
            disabled={activeSlide === totalSlides - 1}
        >
            <ArrowRight className="w-4 h-4" />
        </button>
    )}
</div>



    <div className="flex justify-between mt-8">
        <a href="/login">
            <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out py-2 px-4 rounded-xl bg-gradient-to-r from-twilight-300 to-twilight-100 text-white text-base font-semibold">
                Log In
            </button>
        </a>
        <a href="/signup">
            <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out py-2 px-4 rounded-xl bg-gradient-to-r from-twilight-300 to-twilight-100 text-white text-base font-semibold">
                Create Account
            </button>
        </a>
    </div>


        </div>
    );
}
