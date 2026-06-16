import styles from "../../styles/JobCard.module.css";

function JobCard({ job }) {
  return (
    <article className={styles.jobCard}>
      <div className={styles.jobHeader}>
        <div>
          <h2 className={styles.jobTitle}>
            {job.title}
          </h2>

          <p className={styles.company}>
            {job.company}
          </p>
        </div>

        <div className={styles.matchBadge}>
          {job.matchScore}% Match
        </div>
      </div>

      <p className={styles.jobDescription}>
        {job.description}
      </p>

      <div className={styles.metrics}>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>
            Resume Match
          </span>

          <span className={styles.metricValue}>
            {job.resumeMatch}%
          </span>
        </div>

        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>
            Vacancies
          </span>

          <span className={styles.metricValue}>
            {job.vacancies}
          </span>
        </div>
      </div>

      <h4 className={styles.sectionTitle}>
        Accessibility Features
      </h4>

      <div className={styles.tags}>
        {job.accessibility?.map(
          (feature, index) => (
            <span
              key={index}
              className={styles.tag}
            >
              {feature}
            </span>
          )
        )}
      </div>

      <div className={styles.footer}>
        <div>
          <strong>
            Location:
          </strong>{" "}
          {job.location}
        </div>

        <button
          className={styles.applyButton}
        >
          Apply Now
        </button>
      </div>
    </article>
  );
}

export default JobCard;