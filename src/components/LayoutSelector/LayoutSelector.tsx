import type { LayoutType } from "../../types";

interface Props {
  onLayoutSelect: (layout: LayoutType) => void;
}

const LayoutSelector = ({ onLayoutSelect }: Props) => {
  const layouts: { count: LayoutType; label: string; description: string }[] = [
    { count: 2, label: "Dynamic Duo", description: "Perfect for pairs" },
    { count: 3, label: "Classic Trio", description: "Perfect for close friends" },
    { count: 4, label: "Fantastic Four", description: "Squad vibes" },
    { count: 5, label: "Fab Five", description: "Group memories" },
  ];

  const renderPolaroidPreview = (count: LayoutType) => {
    return (
      <div className="absolute inset-0 rounded-2xl border-2 bg-gradient-to-br from-purple-600 to-rose-500 p-3 sm:p-4 z-10">
        <div
          className={`grid ${count <= 3 ? "grid-cols-2" : "grid-cols-3"} gap-2 h-full place-items-center`}
        >
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="w-10 h-14 sm:w-12 sm:h-16 bg-pink-300 shadow-sm"
              style={{
                transform: `rotate(${i % 2 === 0 ? 6 : -6}deg)`,
                marginTop: i % 3 === 0 ? "6px" : "0",
                marginBottom: i % 3 === 1 ? "6px" : "0",
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-300 via-pink-200 to-purple-300 px-3 sm:px-6 py-4 sm:py-4 md:py-4 lg:py-4">
      {/* Header */}
      <header className="text-center mb-4 sm:mb-4 mt-2 sm:mt-1">
        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight
                     bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                     bg-clip-text text-transparent drop-shadow-md animate-gradient"
        >
          Polaroid Booth
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-gray-700 font-medium mt-3 sm:mt-4 mx-auto leading-relaxed px-2">
          Choose your layout and capture{" "}
          <span className="text-pink-500 font-bold">vintage memories</span> instantly ✨
        </p>
      </header>

      {/* Layout Grid */}
      <main className="flex-1 flex items-center justify-center mb-4 sm:mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 w-full max-w-4xl mx-auto px-2 sm:px-2">
          {layouts.map(({ count, label, description }) => (
            <div
              key={count}
              onClick={() => onLayoutSelect(count)}
              className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105"
            >
              <div className="relative w-full h-40 sm:h-46 md:h-60 rounded-2xl shadow-polaroid border border-pink-950 overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 blur-lg z-0" />

                {/* Preview */}
                {renderPolaroidPreview(count)}

                {/* Overlay text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center rounded-2xl bg-white/70 backdrop-blur-md px-3 z-20">
                  <div className="text-3xl sm:text-4xl font-extrabold text-pink-700 drop-shadow-sm mb-2">
                    {count}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    {label}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 px-2">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mb-2 sm:mb-2 text-center text-pink-700 px-2">
        <div className="border-t border-dashed border-pink-900 mb-2 sm:mb-2 mx-auto" />
        <p className="text-xs sm:text-sm md:text-base">
          ✨ No signup required • 📥 Instant download • 🔒 Complete privacy
        </p>
      </footer>
    </div>
  );
};

export default LayoutSelector;
