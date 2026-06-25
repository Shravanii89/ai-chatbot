import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";
import ChatArea from "./ChatArea";
import { sendMessage } from "../services/chatService";

function ChatPage() {
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("chats");

    return savedChats
      ? JSON.parse(savedChats)
      : [
          {
            id: 1,
            title: "Chat 1",
          },
        ];
  });

  const [currentChat, setCurrentChat] = useState(1);

  const [allChats, setAllChats] = useState(() => {
    const savedAllChats =
      localStorage.getItem("allChats");

    return savedAllChats
      ? JSON.parse(savedAllChats)
      : {
          1: [
            {
              id: 1,
              sender: "ai",
              text: "Hello! How can I help you?",
            },
          ],
        };
  });

  const messages = allChats[currentChat] || [];

  const [isTyping, setIsTyping] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem(
      "allChats",
      JSON.stringify(allChats)
    );
  }, [allChats]);

  useEffect(() => {
    localStorage.setItem(
      "chats",
      JSON.stringify(chats)
    );
  }, [chats]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const createNewChat = () => {
    const newId = Date.now();

    const newChat = {
      id: newId,
      title: `Chat ${chats.length + 1}`,
    };

    setChats((prev) => [...prev, newChat]);

    setAllChats((prev) => ({
      ...prev,
      [newId]: [
        {
          id: 1,
          sender: "ai",
          text: "Hello! How can I help you?",
        },
      ],
    }));

    setCurrentChat(newId);
  };

  const selectChat = (id) => {
    setCurrentChat(id);
  };

  const deleteChat = (id) => {
    if (chats.length === 1) {
      alert("At least one chat must remain.");
      return;
    }

    const updatedChats = chats.filter(
      (chat) => chat.id !== id
    );

    setChats(updatedChats);

    const updatedAllChats = { ...allChats };
    delete updatedAllChats[id];
    setAllChats(updatedAllChats);

    if (currentChat === id) {
      setCurrentChat(updatedChats[0].id);
    }
  };

  const clearChat = () => {
    setAllChats((prev) => ({
      ...prev,
      [currentChat]: [
        {
          id: 1,
          sender: "ai",
          text: "Hello! How can I help you?",
        },
      ],
    }));
  };

  const handleSend = async (text) => {
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
    };

    if (
      messages.length === 1 &&
      messages[0].sender === "ai"
    ) {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChat
            ? {
                ...chat,
                title: text.slice(0, 25),
              }
            : chat
        )
      );
    }

    setAllChats((prev) => ({
      ...prev,
      [currentChat]: [
        ...(prev[currentChat] || []),
        userMessage,
      ],
    }));

    setIsTyping(true);

    try {
      const data = await sendMessage(text);

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: data.reply,
      };

      setAllChats((prev) => ({
        ...prev,
        [currentChat]: [
          ...(prev[currentChat] || []),
          aiMessage,
        ],
      }));
    } catch (error) {
      console.error(error);

      const errorMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: "Something went wrong.",
      };

      setAllChats((prev) => ({
        ...prev,
        [currentChat]: [
          ...(prev[currentChat] || []),
          errorMessage,
        ],
      }));
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
        onDeleteChat={deleteChat}
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

   