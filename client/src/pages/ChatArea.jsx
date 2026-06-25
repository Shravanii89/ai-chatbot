import { useEffect } from "react";
import ChatMessage from "../components/ChatMessage";

function ChatArea({ messages, isTyping }) {
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const showWelcomeScreen =
    messages.length === 1 &&
    messages[0].sender === "ai";

  return (
    <div className="max-w-4xl mx-auto p-4 pb-32">
      {showWelcomeScreen && (
        <div className="flex flex-col items-center justify-center text-center py-16">
          <h1 className="text-5xl font-bold mb-4">
            ✨ Nova AI
          </h1>

          <p className="text-gray-500 text-lg mb-10">
            How can I help you today?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow hover:scale-105 transition cursor-pointer">
              <h3 className="font-semibold text-lg">
                💻 Generate Code
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Create code snippets and projects.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow hover:scale-105 transition cursor-pointer">
              <h3 className="font-semibold text-lg">
                📝 Write Content
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Blogs, emails, essays and more.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow hover:scale-105 transition cursor-pointer">
              <h3 className="font-semibold text-lg">
                📚 Learn Something
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Get concepts explained simply.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow hover:scale-105 transition cursor-pointer">
              <h3 className="font-semibold text-lg">
                🚀 Solve Problems
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Debug, analyze and find solutions.
              </p>
            </div>
          </div>
        </div>
      )}

      {!showWelcomeScreen &&
        messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            sender={msg.sender}
            message={msg.text}
          />
        ))}

      {isTyping && (
        <div className="bg-gray-200 p-3 rounded-lg w-fit">
          AI is typing...
        </div>
      )}
    </div>
  );
}

export default ChatArea;

