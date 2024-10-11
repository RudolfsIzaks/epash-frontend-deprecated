import React from "react";

// Modal component to choose shapes
const ShapePickerModal = ({ onShapeAdd, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Pick a Shape</h2>
        <div className="flex space-x-4 mb-4">
          <button
            className="p-2 bg-gray-200 rounded-md"
            onClick={() => {
              onShapeAdd("rectangle");
              onClose();
            }}
          >
            Add Rectangle
          </button>
          <button
            className="p-2 bg-gray-200 rounded-md"
            onClick={() => {
              onShapeAdd("circle");
              onClose();
            }}
          >
            Add Circle
          </button>
          <button
            className="p-2 bg-gray-200 rounded-md"
            onClick={() => {
              onShapeAdd("star");
              onClose();
            }}
          >
            Add Star
          </button>
          <button
            className="p-2 bg-gray-200 rounded-md"
            onClick={() => {
              onShapeAdd("slanted-rectangle");
              onClose();
            }}
          >
            Add Slanted Rectangle
          </button>
          {/* You can add more buttons for other shapes */}
        </div>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShapePickerModal;
