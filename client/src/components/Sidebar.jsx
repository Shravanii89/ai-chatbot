function Sidebar({
  chats,
  currentChat,
  onNewChat,
  onSelectChat,
  onDeleteChat,
}) {
  return (
    <div className="w-64 bg-slate-900 text-white h-screen p-4">
      <button
        onClick={onNewChat}
        className="w-full bg-blue-600 py-2 rounded mb-4"
      >
        + New Chat
      </button>

      <div className="space-y-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex justify-between items-center p-2 rounded ${
              currentChat === chat.id
                ? "bg-slate-700"
                : "bg-slate-800"
            }`}
          >
            <span
              onClick={() => onSelectChat(chat.id)}
              className="cursor-pointer truncate flex-1"
            >
              {chat.title}
            </span>

            <button
              onClick={() => onDeleteChat(chat.id)}
              className="ml-2 text-red-400 hover:text-red-600"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;