import styles from "../../styles/ProfileForm.module.css";

function ProfileProgress({ percentage = 0 }) {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressHeader}>
        <h3>Profile Completion</h3>
        <span>{percentage}%</span>
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{
            width: `${percentage}%`
          }}
        />
      </div>
    </div>
  );
}

export default ProfileProgress;