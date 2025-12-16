interface Props {
  frameColor: string;
  setFrameColor: (c: string) => void;
  orientation: string;
  setOrientation: (o: string) => void;
}

const LayoutControls = ({ frameColor, setFrameColor, orientation, setOrientation }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-10"> {/* bigger gap */}
  {/* Frame Colors */}
  <div className="flex gap-6">
    {["white", "black"].map((color) => (
      <button
        key={color}
        className={`w-12 h-12 rounded-full shadow-md border-2 transition-transform hover:scale-110 ${
          frameColor === color ? "ring-4 ring-pink-700 ring-offset-2" : ""
        }`}
        style={{ backgroundColor: color }}
        onClick={() => setFrameColor(color)}
      />
    ))}
  </div>

  {/* Orientation */}
  <div className="flex bg-white  rounded-xl shadow-lg "> {/* more padding */}
    <button
      className={`px-6 py-3 rounded-l-lg font-medium transition ${
        orientation === "vertical"
          ? "bg-pink-800 text-white shadow-md "
          : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={() => setOrientation("vertical")}
    >
      Vertical
    </button>
    <button
      className={`px-6 py-3 rounded-r-lg font-medium transition ${
        orientation === "horizontal"
          ? "bg-pink-800 text-white shadow-md "
          : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={() => setOrientation("horizontal")}
    >
      Horizontal
    </button>
  </div>
</div>
  );
};

export default LayoutControls;
