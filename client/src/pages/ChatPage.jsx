import { useState } from "react";
import Navbar from "../components/Navbar";
import ChatInput from "../components/ChatInput";
import ChatArea from "./ChatArea";

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! How can I help you?",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text) => {
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: "I received your message: " + text,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <ChatArea
        messages={messages}
        isTyping={isTyping}
      />

      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default ChatPage;

