function ChatMessage({ message, sender }) {
  return (
    <div
      className={`max-w-xl p-3 rounded-lg mb-3 ${
        sender === "user"
          ? "bg-blue-500 text-white ml-auto"
          : "bg-gray-200 text-black"
      }`}
    >
      {message}
    </div>
  );
}

export default ChatMessage;
