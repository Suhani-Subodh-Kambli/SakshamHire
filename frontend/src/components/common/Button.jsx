import styles from "./Button.module.css";

function Button({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  onClick,
  fullWidth = false,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${
        fullWidth ? styles.fullWidth : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Button;