import ChatMessage from "../components/ChatMessage";

function ChatArea({ messages, isTyping }) {
  return (
    <div className="max-w-4xl mx-auto p-4 pb-32">
      {messages.map((msg) => (
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

