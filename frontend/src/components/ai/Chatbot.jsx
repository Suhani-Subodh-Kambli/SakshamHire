import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Bot, User, Minimize2 } from "lucide-react";
import { getChatResponse } from "../../api/aiService";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I am your SakshamHire assistant. How can I help you today? I can assist with job searches, career guidance, and finding government schemes.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = messages.concat(userMessage);
      const data = await getChatResponse(chatHistory);
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting to the service." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="ai-chatbot-container" style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 1000, fontFamily: "Inter, sans-serif" }}>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            boxShadow: "0 4px 20px rgba(79, 70, 229, 0.4)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <MessageSquare size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chatbot window"
          style={{
            width: "380px",
            height: "550px",
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: "1px solid #e2e8f0",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "20px",
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Bot size={24} />
              <div>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>Saksham AI</h3>
                <span style={{ fontSize: "12px", opacity: 0.8 }}>Online Assistant</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: "transparent", border: "none", color: "white", cursor: "pointer" }}
            >
              <Minimize2 size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              backgroundColor: "#f8fafc",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <div
                  style={{
                    backgroundColor: m.role === "user" ? "#4f46e5" : "white",
                    color: m.role === "user" ? "white" : "#1e293b",
                    padding: "12px 16px",
                    borderRadius: m.role === "user" ? "18px 18px 2px 18px" : "18px 18px 18px 2px",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    boxShadow: m.role === "user" ? "none" : "0 2px 5px rgba(0,0,0,0.05)",
                  }}
                >
                  {m.content}
                </div>
                <span style={{ fontSize: "10px", color: "#94a3b8", alignSelf: m.role === "user" ? "flex-end" : "flex-start" }}>
                  {m.role === "user" ? "You" : "Assistant"}
                </span>
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: "flex-start", backgroundColor: "white", padding: "12px 16px", borderRadius: "18px 18px 18px 2px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
                <div className="typing-indicator" style={{ display: "flex", gap: "4px" }}>
                  <span style={{ width: "6px", height: "6px", backgroundColor: "#94a3b8", borderRadius: "50%" }}></span>
                  <span style={{ width: "6px", height: "6px", backgroundColor: "#94a3b8", borderRadius: "50%" }}></span>
                  <span style={{ width: "6px", height: "6px", backgroundColor: "#94a3b8", borderRadius: "50%" }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div style={{ padding: "20px", borderTop: "1px solid #e2e8f0", display: "flex", gap: "10px" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "10px 15px",
                borderRadius: "25px",
                border: "1px solid #cbd5e1",
                outline: "none",
                fontSize: "14px",
              }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#4f46e5",
                color: "white",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: isLoading || !input.trim() ? 0.6 : 1,
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
