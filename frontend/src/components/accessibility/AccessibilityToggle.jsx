function AccessibilityToggle({
  label,
  checked,
  onChange
}) {
  return (
    <label
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "12px",
        alignItems: "center"
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />

      {label}
    </label>
  );
}

export default AccessibilityToggle;