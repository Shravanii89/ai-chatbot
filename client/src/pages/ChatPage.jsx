import Navbar from "../components/Navbar";
import ChatInput from "../components/ChatInput";
import ChatArea from "./ChatArea";

function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <ChatArea />

      <ChatInput />
    </div>
  );
}

export default ChatPage;

