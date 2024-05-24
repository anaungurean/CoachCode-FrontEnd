import PropTypes from 'prop-types';
import styles from '../../../Styles/ProblemCard.module.css';

function TitleJob({ job}){

    let stateColorClass = '';
    if (job.state === 'LISTED') {
        stateColorClass = 'bg-green-50 text-green-700 ring-green-600/20';
    } else if (job.state === 'Closed') {
        stateColorClass = 'bg-red-50 text-red-700 ring-red-600/10';
    }
    else {
        stateColorClass = 'bg-yellow-50 text-yellow-800 ring-yellow-600/20';
    }

    let capitalizedState = job.state.charAt(0).toUpperCase() + job.state.slice(1).toLowerCase();
    if (capitalizedState === 'Listed') {
        capitalizedState = 'Open';
    }
 

    return (
    <div className="card">
      <div className="mt-4 mr-4 border pl-4 pt-4 pb-4 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md ">
        <div className='flex items-center'>
          <div className={styles.icon}>
                        <img src={job.company.logo } alt={job.company.name} className={styles.companyLogo} />
          </div>
          <div className="text-2xl font-bold text-twilight-400"> {job.title}</div>
        </div>

        <div className="mt-2">
            <span className={`inline-flex items-center rounded-md px-2 py-1 ml-2 mt-2 text-sm font-medium ${stateColorClass} ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}>{capitalizedState } </span>
            <span className={`inline-flex items-center rounded-md px-2 py-1 ml-2 mt-2 text-sm font-medium bg-purple-50 text-rose-700 ring-rose-600/20  ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}>{job.company.name}</span>
            <span className={`inline-flex items-center rounded-md px-2 py-1 ml-2 mt-2 text-sm font-medium bg-indigo-50 text-indigo-700 ring-indigo-600/30  ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}>{job.location}</span>
            <span className={`inline-flex items-center rounded-md px-2 py-1 ml-2 mt-2 text-sm font-medium bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-600/30 ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}>{job.type}</span>
            { job.workPlace && <span className={`inline-flex items-center rounded-md px-2 py-1 ml-2 mt-2 text-sm font-medium bg-pink-50 text-pink-800 ring-pink-600/20 ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}> {job.workPlace}</span>}
            { job.formattedExperienceLevel && job.formattedExperienceLevel != job.type && <span className={`inline-flex items-center rounded-md px-2 py-1 ml-2 mt-2 text-sm font-medium bg-purple-50 text-purple-800 ring-purple-600/20 ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}> {job.formattedExperienceLevel}</span>}
        </div>
    </div>
    </div>
    )


}

TitleJob.propTypes = {
    job: PropTypes.object.isRequired,
};
export default TitleJob;