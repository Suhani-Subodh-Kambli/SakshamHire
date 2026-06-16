import styles from "./Input.module.css";

function Input({
  label,
  error,
  id,
  ...props
}) {
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id}>
          {label}
        </label>
      )}

      <input
        id={id}
        className={styles.input}
        {...props}
      />

      {error && (
        <p className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;