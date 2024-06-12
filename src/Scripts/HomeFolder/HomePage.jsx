import   { useState, useEffect } from 'react';
import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import { Sun } from 'lucide-react';
import Tip from './components/Tip';
import Problem from './components/Problem';
import ContributionGraph from './components/Contributions';
import Card from './components/Card';

function HomePage() {
  const firstName = localStorage.getItem('firstName');
  const breadcrumbItems = [
    { name: 'Home', link: '/' },
  ];

  const [greeting, setGreeting] = useState('Good day');
  const [quote, setQuote] = useState(''); // State to hold the quote of the day

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }

    // Example quotes array
    const quotes = [
      "Believe you can and you're halfway there.",
      "The only way to do great work is to love what you do.",
      "You are never too old to set another goal or to dream a new dream.",
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    ];

    // Select a random quote from the array
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="flex">
      <div className="w-1/6">
        <NavBar/>
      </div>
      <div className='w-5/6'>
        <Breadcrumb items={breadcrumbItems} />

                 

        <div className="mr-4 flex-grow h-auto">
          <div className="flex items-center bg-gradient-to-r from-twilight-100 to-purple-100 px-4 py-3 rounded-2xl cursor-pointer text-twilight-500 mt-4">
            <Sun size={20} className="text-twilight-500 mr-2" />
            <h3 className="text-lg font-semibold">{greeting}, {firstName}!</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Tip tip={quote} />
            <Problem />
          </div>
          <div className="mt-4">
            <ContributionGraph />
          </div>
            <div className="mt-4">
                <Card />
            </div>
        </div>
        
      </div>

      
    </div>
  );
}

export default HomePage;
