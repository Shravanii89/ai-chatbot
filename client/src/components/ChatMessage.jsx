import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function ChatMessage({ message, sender }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
  };

  return (
    <div
      className={`flex mb-4 ${
        sender === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-2xl p-4 rounded-2xl shadow ${
          sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");

              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {message}
        </ReactMarkdown>

        {sender === "ai" && (
          <button
            onClick={copyToClipboard}
            className="mt-3 text-sm bg-gray-300 px-2 py-1 rounded"
          >
            📋 Copy
          </button>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;