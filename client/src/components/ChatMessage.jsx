import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ChatMessage({ message, sender }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
  };

  return (
    <div
      className={`max-w-xl p-3 rounded-lg mb-3 ${
        sender === "user"
          ? "bg-blue-500 text-white ml-auto"
          : "bg-gray-200 text-black"
      }`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {message}
      </ReactMarkdown>

      {sender === "ai" && (
        <button
          onClick={copyToClipboard}
          className="mt-2 text-sm bg-gray-300 px-2 py-1 rounded"
        >
          📋 Copy
        </button>
      )}
    </div>
  );
}

export default ChatMessage;
