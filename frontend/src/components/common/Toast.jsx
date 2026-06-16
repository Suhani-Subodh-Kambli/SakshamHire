function Toast({
  message
}) {
  if (!message)
    return null;

  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        top: 20,
        background:
          "#0057d9",
        color: "#fff",
        padding: "12px",
        borderRadius: "8px"
      }}
    >
      {message}
    </div>
  );
}

export default Toast;