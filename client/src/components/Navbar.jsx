function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="bg-slate-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        AI Chatbot
      </h1>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-gray-700 px-3 py-1 rounded"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}

export default Navbar;