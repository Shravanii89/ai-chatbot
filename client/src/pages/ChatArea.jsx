import ChatMessage from "../components/ChatMessage";

function ChatArea() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <ChatMessage
        sender="user"
        message="Hello AI"
      />

      <ChatMessage
        sender="ai"
        message="Hello! How can I help you?"
      />
    </div>
  );
}

export default ChatArea;

