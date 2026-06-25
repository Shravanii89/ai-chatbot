function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-amber-200/10 px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-amber-200">
          ✨ Nova AI
        </h1>

        <p className="text-xs text-gray-400">
          Your Intelligent Assistant
        </p>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-amber-200 text-black px-4 py-2 rounded-xl font-medium hover:scale-105 transition"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </nav>
  );
}

export default Navbar;