import { useState } from "react";

function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50">
      <div className="w-full max-w-4xl px-4">
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 p-3">
          <input
            type="text"
            value={input}
            placeholder="Ask Nova AI anything..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            className="flex-1 bg-transparent outline-none px-3"
          />

          <button
            onClick={handleSend}
            className="bg-amber-300 hover:bg-amber-400 text-black font-semibold px-5 py-3 rounded-2xl transition"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;