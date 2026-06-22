import { useState } from "react";
import Navbar from "../components/Navbar";
import ChatInput from "../components/ChatInput";
import ChatArea from "./ChatArea";
import { sendMessage } from "../services/chatService";

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! How can I help you?",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (text) => {
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);

    try {
      const data = await sendMessage(text);

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);

      const errorMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: "Something went wrong.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsTyping(false);
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

   