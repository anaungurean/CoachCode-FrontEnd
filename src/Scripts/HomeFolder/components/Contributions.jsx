import React from 'react';
import { BarChart } from 'lucide-react';

const generateDummyData = () => {
  const data = [];
  const today = new Date();
  const currentWeek = getWeekNumber(today);
  const currentDay = today.getDay();

  for (let i = 0; i < 52; i++) {  
    const week = [];
    for (let j = 0; j < 7; j++) {  
      if (i < currentWeek || (i === currentWeek && j <= currentDay)) {
        week.push(Math.floor(Math.random() * 5)); 
      } else {
        week.push(0);  
      }
    }
    data.push(week);
  }
  return data;
};

const getWeekNumber = (d) => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

const getMonthLabels = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const labels = [];
  for (let i = 0; i < 12; i++) {
    labels.push({
      month: months[i],
      week: Math.floor((i * 4.33))
    });
  }
  return labels;
};

const ContributionGraph = () => {
  const data = generateDummyData();
  const monthLabels = getMonthLabels();

  return (
  <div className="bg-white bg-opacity-80 shadow-md rounded-lg pt-4 pl-4 pr-4 flex flex-col hover:-translate-y-1 transform transition duration-300 ease-in-out">
    <div className="flex items-start">
      <div className="bg-purple-100 rounded-md p-2 flex w-full">
        <div className="flex items-center">
          <BarChart size={20} className="text-twilight-400 mr-2" />
          <h4 className="text-xl font-semibold text-twilight-400">Your Dashboard</h4>
        </div>
      </div>
    </div>

    <div className="flex justify-center mt-4 mb-8 overflow-x-auto">
      <div className="grid grid-flow-col grid-rows-8 gap-1">
        {/* Month labels row */}
        {monthLabels.map((label, index) => (
          <div key={index} className="flex justify-center items-center text-sm font-semibold text-gray-600" style={{ gridRow: '1', gridColumn: label.week + 1 }}>
            {label.month}
          </div>
        ))}
        {/* Contribution grid */}
        {data.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-4 h-4 rounded ${getColor(day)}`}
                title={`Contributions: ${day}`}
                style={{ gridRow: dayIndex + 2 }}
              ></div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
    
    <div className="flex justify-end mb-4">
      <button className="bg-purple-100 text-twilight-500 font-semibold ring-1 ring-twilight-100 py-2 px-4 rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out hover:bg-twilight-100" onClick={() => window.location.href = '/submissions'}>
        See your submissions
      </button>
    </div>
  </div>
);

};

const getColor = (value) => {
  switch (value) {
    case 0:
      return 'bg-gray-200';
    case 1:
      return 'bg-purple-200';
    case 2:
      return 'bg-purple-300';
    case 3:
      return 'bg-purple-400';
    case 4:
      return 'bg-purple-500';
    default:
      return 'bg-gray-200';
  }
};

export default ContributionGraph;
