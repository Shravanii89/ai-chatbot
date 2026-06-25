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
  const [search, setSearch] = useState("");

  const handleRename = (id) => {
    if (newTitle.trim()) {
      onRenameChat(id, newTitle);
    }

    setEditingId(null);
    setNewTitle("");
  };

  const filteredChats = chats.filter((chat) =>
    chat.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="w-72 bg-black text-white border-r border-slate-800 flex flex-col p-4">
      <h1 className="text-2xl font-bold text-amber-200 mb-4">
        ✨ Nova AI
      </h1>

      <button
        onClick={onNewChat}
        className="bg-amber-300 text-black font-semibold py-3 rounded-xl mb-4 hover:bg-amber-400 transition"
      >
        + New Chat
      </button>

      <input
        type="text"
        placeholder="Search chats..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-xl bg-slate-800 text-white mb-4 outline-none"
      />

      <div className="space-y-2 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center justify-between p-3 rounded-xl transition ${
              currentChat === chat.id
                ? "bg-amber-200 text-black"
                : "bg-slate-900 hover:bg-slate-800"
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
                className="text-black px-2 rounded w-full"
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
              className="ml-2"
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