export default function DayBookHeader({ setShowModal }) {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow border-b">
      
      {/* Title */}
      <h1 className="font-semibold text-gray-700 text-xl">DAY BOOK</h1>

      {/* Left buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-900 text-white px-4 py-1 rounded text-sm"
        >
          + Add Payment
        </button>

        <button className="bg-blue-400 text-white px-4 py-1 rounded text-sm">
          + Add Receipt
        </button>
      </div>

      {/* Right buttons */}
      <div className="flex gap-3">
        <button className="bg-teal-500 text-white px-3 py-1 rounded text-sm">
          Go to V2
        </button>

        <button className="bg-yellow-400 px-3 py-1 rounded text-sm">
          Summary
        </button>
      </div>
    </div>
  );
}