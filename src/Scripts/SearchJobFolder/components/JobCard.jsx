import PropTypes from 'prop-types';
import styles from '../../../Styles/ProblemCard.module.css';

function JobCard({ job }) {
 
  const handleClick = () => {
    window.location.href = job.job_url; // Redirect to the job page
  };

 

  return (
    <div className={styles.card} onClick={handleClick}>  
      <div className={styles.cardHeader}>
        <div className={styles.icon}>
            <img src={job.company.logo } alt={job.company.name} className={styles.companyLogo} />
        </div>
        <h3> {job.title} </h3>
      </div>
      <div className={styles.separator}></div>
      <p className={styles.info}><span className={styles.boldLabel}>Company: </span> {job.company.name}</p>
      <p className={styles.info}><span className={styles.boldLabel}>Location: </span> {job.location}</p>
      <p className={styles.info}><span className={styles.boldLabel}>Flexibility : </span> {job.type}</p>
      <p className={styles.info}><span className={styles.boldLabel}>Posted On: </span> {job.postDate}</p>
      { job.benefits &&
      <p className={styles.info}><span className={styles.boldLabel}>Benefits: </span> {job.benefits}</p>
      }
    </div>
  );
}

JobCard.propTypes = {
  job: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo : PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired, 
    postDate : PropTypes.string.isRequired,
    benefits: PropTypes.string.isRequired,
    company_logo: PropTypes.string.isRequired,
    company_url: PropTypes.string.isRequired,
    job_url: PropTypes.string.isRequired,  
  })
};

export default JobCard;