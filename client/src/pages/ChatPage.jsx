import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";
import ChatArea from "./ChatArea";
import { sendMessage } from "../services/chatService";

function ChatPage() {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("messages");

    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            id: 1,
            sender: "ai",
            text: "Hello! How can I help you?",
          },
        ];
  });

  const [isTyping, setIsTyping] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [chats, setChats] = useState([
    {
      id: 1,
      title: "New Chat",
    },
  ]);

  const [currentChat, setCurrentChat] = useState(1);

  useEffect(() => {
    localStorage.setItem(
      "messages",
      JSON.stringify(messages)
    );
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const clearChat = () => {
    const defaultMessage = [
      {
        id: 1,
        sender: "ai",
        text: "Hello! How can I help you?",
      },
    ];

    setMessages(defaultMessage);
    localStorage.removeItem("messages");
  };

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: `Chat ${chats.length + 1}`,
    };

    setChats((prev) => [...prev, newChat]);
    setCurrentChat(newChat.id);
  };

  const selectChat = (id) => {
    setCurrentChat(id);
  };

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
    <div
      className={`flex ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <Sidebar
        chats={chats}
        currentChat={currentChat}
        onNewChat={createNewChat}
        onSelectChat={selectChat}
      />

      <div className="flex-1 min-h-screen">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="max-w-4xl mx-auto p-4">
          <button
            onClick={clearChat}
            className="bg-red-500 text-white px-4 py-2 rounded mb-4"
          >
            🗑️ Clear Chat
          </button>
        </div>

        <ChatArea
          messages={messages}
          isTyping={isTyping}
        />

        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}

export default ChatPage;

   