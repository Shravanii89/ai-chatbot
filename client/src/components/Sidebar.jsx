import { useState } from "react";

function Sidebar({
  chats,
  currentChat,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onRenameChat,
}) {
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const handleRename = (id) => {
    if (newTitle.trim()) {
      onRenameChat(id, newTitle);
    }

    setEditingId(null);
    setNewTitle("");
  };

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
            className={`flex items-center justify-between p-2 rounded ${
              currentChat === chat.id
                ? "bg-slate-700"
                : "bg-slate-800"
            }`}
          >
            {editingId === chat.id ? (
              <input
                value={newTitle}
                onChange={(e) =>
                  setNewTitle(e.target.value)
                }
                onBlur={() => handleRename(chat.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRename(chat.id);
                  }
                }}
                autoFocus
                className="text-black px-1 rounded w-full"
              />
            ) : (
              <span
                onClick={() => onSelectChat(chat.id)}
                onDoubleClick={() => {
                  setEditingId(chat.id);
                  setNewTitle(chat.title);
                }}
                className="cursor-pointer truncate flex-1"
              >
                {chat.title}
              </span>
            )}

            <button
              onClick={() => onDeleteChat(chat.id)}
              className="ml-2 text-red-400"
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