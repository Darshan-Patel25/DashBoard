import React from "react";

function PageUnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-5">
      <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
        <div className="text-6xl text-blue-500 mb-4">🔧</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Social Media Analytics Dashboard
        </h1>
        <p className="text-gray-600 mb-4">
          We are working hard to bring you an advanced analytics experience. Stay tuned for updates!
        </p>
        <div className="text-blue-600 font-semibold">
          Coming Soon...
        </div>
      </div>
    </div>
  );
}

export default PageUnderConstruction;
