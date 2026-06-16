import {
  useState
} from "react";

export default function
useToast() {
  const [message,
    setMessage] =
    useState("");

  const showToast =
    (text) => {
      setMessage(text);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    };

  return {
    message,
    showToast
  };
}