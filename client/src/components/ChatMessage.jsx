import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";

function ChatMessage({ message, sender }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className={`flex mb-6 ${
        sender === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-3xl p-5 rounded-3xl shadow-lg ${
          sender === "user"
            ? "bg-gradient-to-r from-amber-300 to-amber-200 text-black"
            : "bg-slate-800 text-white border border-slate-700"
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({
              inline,
              className,
              children,
              ...props
            }) {
              const match =
                /language-(\w+)/.exec(className || "");

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
                <code {...props}>{children}</code>
              );
            },
          }}
        >
          {message}
        </ReactMarkdown>

        {sender === "ai" && (
          <button
            onClick={copyToClipboard}
            className="mt-4 bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg text-sm transition"
          >
            📋 Copy
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default ChatMessage;