import React from "react";

// Modal component to choose shapes
const ShapePickerModal = ({ onShapeAdd, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-lg font-bold mb-4">Pick a Shape</h2>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <button
            className="p-2 bg-gray-200 rounded-md"
            onClick={() => {
              onShapeAdd("Rectangle");
              onClose();
            }}
          >
            Rectangle
          </button>
          <button
            className="p-2 bg-gray-200 rounded-md"
            onClick={() => {
              onShapeAdd("Circle");
              onClose();
            }}
          >
            Circle
          </button>
          <button
            className="p-2 bg-gray-200 rounded-md"
            onClick={() => {
              onShapeAdd("Star");
              onClose();
            }}
          >
            Star
          </button>
          <button
            className="p-2 bg-gray-200 rounded-md"
            onClick={() => {
              onShapeAdd("slanted-rectangle");
              onClose();
            }}
          >
            Slanted Rectangle
          </button>
          <button
            className="p-2 bg-gray-200 rounded-md"
            onClick={() => {
              onShapeAdd("Discount");
              onClose();
            }}
          >
            Star
          </button>
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
