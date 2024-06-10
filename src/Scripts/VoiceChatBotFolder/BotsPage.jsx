import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import { Bot } from 'lucide-react';

function BotsPage() {
  const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'Voice Assistants', link: null },
  ];

const bots = [
  {
    name: "Ethan",
    subtitle: "Code Review Expert",
    description: "Got a bug? Ethan provides personalized feedback and actionable suggestions to improve code quality, assisting users in writing cleaner, more efficient code and leveling up their coding skills.",
  },
    {
    name: "Mia",
    subtitle: "HR Interview Specialist",
    description: "Be ready for the next HR interview? Introducing Mia, the HR Interview Specialist. Mia conducts structured interviews, assesses candidate qualifications, and evaluates cultural fit, making the hiring process",
  },
  {
    name: "Lucas",
    subtitle: "Technical Interviewer",
    description: "Don't feel prepared for the next interview? Lucas offers realistic interview simulations, problem-solving practice, and valuable feedback to boost users' confidence and performance in technical interviews, ensuring they stand out to potential employers.",
  },
   {
    name: "Ava",
    subtitle: "Job Search Advisor",
    description: "Need a friend to ask for advice? Ava, the Job Search Advisor, is here to help. Whether it's crafting the perfect CV, acing interviews, or navigating job offers, Ava provides friendly, expert advice and practical tips to boost your job search success.",
  },
];


  const handleClick = (botName) => {
  
    if (botName === "Ethan") {
      window.location.href = '/voice-chat-bot/ethan';
    } else if (botName === "Mia") {
      window.location.href = '/voice-chat-bot/mia';
    } else if (botName === "Lucas") {
      window.location.href = '/voice-chat-bot/lucas';
    } else if (botName === "Ava") {
      window.location.href = '/voice-chat-bot/ava';
    }

    localStorage.setItem('botName', botName);
  };


  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <NavBar />
      </div>
      <div className="w-5/6 flex flex-col">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mr-4 flex-grow">
          <div className="flex items-center bg-gradient-to-r from-twilight-100 to-purple-100 px-4 py-3 rounded-2xl cursor-pointer text-twilight-500 mt-4">
            <Bot size={20} className="text-twilight-500 mr-2" />
            <h3 className="text-lg font-semibold">Select the assistant based on your needs</h3>
          </div>
          <div className="grid gap-8 grid-cols-2 grid-rows-2 h-85p mt-4">
            {bots.map((bot, index) => (
              <div key={index} className="bg-white bg-opacity-80 shadow-md rounded-lg pt-8 pl-8 flex flex-col  hover:-translate-y-1 transform transition duration-300 ease-in-out">
                <div className="flex items-start  ">
                <div className="bg-purple-100 rounded-md p-2 flex w-full mr-8">
                  <Bot size={50} className="text-twilight-400 mr-4 " />
                  <div  >
                    <h4 className="text-xl font-bold text-twilight-400">{bot.name}</h4>
                    <p className="text-lg text-twilight-400 font-semibold">{bot.subtitle}</p>
                  </div>
                </div>
                </div>
                <p className="mt-2 text-gray-700 mr-8">{bot.description}</p>
                <div className="flex justify-end mt-4 mr-8 ">
                  <button className="bg-purple-100 text-twilight-500 font-semibold ring-1 ring-twilight-100 py-2 px-2 rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out hover:bg-twilight-100"
                        onClick={() => handleClick(bot.name)}
                        >  
                      
                      Talk with {bot.name}
                   </button>
                </div>
              </div>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BotsPage;
