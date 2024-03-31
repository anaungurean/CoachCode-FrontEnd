import PropTypes from 'prop-types';
import styles from './ProblemCard.module.css';
import { BadgeX, Check } from 'lucide-react';

function ProblemCard({ problem }) {
  // Function to format topics and companies string
  const formatString = (str) => {
    const maxItems = 4;
    const items = str.split(',').map(item => item.trim()).slice(0, maxItems);
    let formattedStr = items.join(', ');
    if (items.length < str.split(',').length) {
      formattedStr += ', etc.';
    }
    return formattedStr;
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.icon}>
          {problem.solved ? <Check size={20} /> : <BadgeX size={20} />}
        </div>
        <h3>{problem.title}</h3>
      </div>
      <div className={styles.separator}></div>
      <p className={styles.info}><span className={styles.boldLabel}>Related Topics:</span> {formatString(problem.related_topics)}</p>
      <p className={styles.info}><span className={styles.boldLabel}>Difficulty:</span> <span className={styles[problem.difficulty.toLowerCase()]}>{problem.difficulty}</span></p>
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
    solved: PropTypes.bool.isRequired
  }).isRequired
};

export default ProblemCard;