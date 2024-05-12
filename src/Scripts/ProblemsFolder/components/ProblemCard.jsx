import PropTypes from 'prop-types';
import styles from '../../../Styles/ProblemCard.module.css';
import { BadgeX, Check } from 'lucide-react';



function ProblemCard({ problem }) {
  const formatString = (str) => {
    const maxItems = 4;
    const items = str.split(',').map(item => item.trim()).slice(0, maxItems);
    let formattedStr = items.join(', ');
    if (items.length < str.split(',').length) {
      formattedStr += ', etc.';
    }
    if (str === '') {
      formattedStr = '-';
    }
    return formattedStr;
  };

  const formatStringTitle = (str) => {
    if (str.length <= 30) return str;
    return str.slice(0, 30) + '...';
  };
  const handleClick = () => {
    window.location.href = '/problems/' + problem.id; // Redirect to the problem page
  };

    let difficultyColorClass = '';
  if (problem.difficulty === 'Easy') {
    difficultyColorClass = 'bg-green-50 text-green-700 ring-green-600/20';
  } else if (problem.difficulty === 'Medium') {
    difficultyColorClass = 'bg-yellow-50 text-yellow-800 ring-yellow-600/20';
  } else if (problem.difficulty === 'Hard') {
    difficultyColorClass = 'bg-red-50 text-red-700 ring-red-600/10';
  }


  return (
    <div className={styles.card} onClick={handleClick}> {/* Attach onClick event handler */}
      <div className={styles.cardHeader}>
        <div className={styles.icon}>
          {problem.solved ? <Check size={20} /> : <BadgeX size={20} />}
        </div>
        <h3>{formatStringTitle(problem.title)}</h3>
      </div>
      <div className={styles.separator}></div>
      <p className={styles.info}><span className={styles.boldLabel}>Related Topics:</span> {formatString(problem.related_topics)}</p>
      <p className={styles.info}><span className={styles.boldLabel}>Difficulty:</span> <span className={`inline-flex items-center rounded-md px-2 py-1 mt-2 text-sm font-medium ${difficultyColorClass} ring-1 ring-inset border-dotted hover:ring-2 shadow-sm`}>{problem.difficulty}</span></p>
      <p className={styles.info}><span className={styles.boldLabel}>Companies:</span> {formatString(problem.companies)}</p>
      <p className={styles.info}><span className={styles.boldLabel}>ID:</span> {problem.id}</p>
    </div>
  );
}

ProblemCard.propTypes = {
  problem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    related_topics: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    companies: PropTypes.string.isRequired,
    solved: PropTypes.bool
  }).isRequired
};

export default ProblemCard;