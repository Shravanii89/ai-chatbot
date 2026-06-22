function ChatInput() {
  return (
    <div className="fixed bottom-5 left-0 right-0 flex justify-center">
      <div className="w-full max-w-2xl px-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full border rounded-lg p-3 outline-none"
        />
      </div>
    </div>
  );
}

export default ChatInput;