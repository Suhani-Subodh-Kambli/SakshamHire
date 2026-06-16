import styles from "./FormField.module.css";

function FormField({
  label,
  children,
  required = false
}) {
  return (
    <div className={styles.field}>
      <label>
        {label}
        {required && (
          <span className={styles.required}>
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

export default FormField;