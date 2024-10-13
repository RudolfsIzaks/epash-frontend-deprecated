import React from "react";
import {
  Square,
  Circle as LucideCircle,
  Star as LucideStar,
  Triangle as LucideTriangle,
  Star,
  Diamond,
  BadgePercent,
  RectangleHorizontal,
  Triangle,
  SquareDashedBottom,
  Shapes,
} from "lucide-react";

// Modal component to choose shapes
const ShapePickerModal = ({ onShapeAdd, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-lg font-bold mb-4">Pick a Shape</h2>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <button
            className="p-2 border border-stone-200 shadow rounded-md"
            onClick={() => {
              onShapeAdd("Rectangle");
              onClose();
            }}
          >
            <Square className="h-8 w-8" />
            Rectangle
          </button>
          <button
            className="p-2 border border-stone-200 shadow rounded-md"
            onClick={() => {
              onShapeAdd("Circle");
              onClose();
            }}
          >
            <LucideCircle className="h-8 w-8" />
            Circle
          </button>
          <button
            className="p-2 border border-stone-200 shadow rounded-md"
            onClick={() => {
              onShapeAdd("Star");
              onClose();
            }}
          >
            <Star className="h-8 w-8" />
            Star
          </button>
          <button
            className="p-2 border border-stone-200 shadow rounded-md"
            onClick={() => {
              onShapeAdd("slanted-rectangle");
              onClose();
            }}
          >
            <Diamond className="h-8 w-8" />
            Slanted Rectangle
          </button>
          <button
            className="p-2 border border-stone-200 shadow rounded-md"
            onClick={() => {
              onShapeAdd("Discount");
              onClose();
            }}
          >
            <BadgePercent className="h-8 w-8" />
            Discount Shape
          </button>
          <button
            className="p-2 border border-stone-200 shadow rounded-md"
            onClick={() => {
              onShapeAdd("Parallelogram");
              onClose();
            }}
          >
            <RectangleHorizontal className="h-8 w-8" />
            Parallelogram
          </button>
          <button
            className="p-2 border border-stone-200 shadow rounded-md"
            onClick={() => {
              onShapeAdd("Triangle");
              onClose();
            }}
          >
            <Triangle className="h-8 w-8" />
            Triangle
          </button>
          <button
            className="p-2 border border-stone-200 shadow rounded-md"
            onClick={() => {
              onShapeAdd("Border");
              onClose();
            }}
          >
            <SquareDashedBottom className="h-8 w-8" />
            Border
          </button>
          <button
            onClick={() => {
              onShapeAdd("customShape1");
              onClose();
            }}
          >
            <Shapes className="h-8 w-8" />
            Custom Shape 1
          </button>
          <button
            className="p-2 border border-stone-200 shadow rounded-md"
            onClick={() => {
              onShapeAdd("customShape2");
              onClose();
            }}
          >
            <Shapes className="h-8 w-8" />
            Custom Shape 2
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
