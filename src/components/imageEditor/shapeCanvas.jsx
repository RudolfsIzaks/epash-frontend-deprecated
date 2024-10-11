import React, { useState } from "react";
import { Stage, Layer, Rect, Circle, Star } from "react-konva";
import ShapePickerModal from "./shapeLibrary"; // Import the shape picker modal

const ShapeCanvas = () => {
  const [shapes, setShapes] = useState([]);
  const [isShapePickerOpen, setShapePickerOpen] = useState(false);
  const [selectedShapeId, setSelectedShapeId] = useState(null);

  const handleShapeAdd = (type) => {
    const newShape = {
      id: shapes.length + 1,
      type,
      x: 100,
      y: 100,
      fill: "blue",
      draggable: true,
      rotation: type === "slanted-rectangle" ? 30 : 0, // Slanted rectangle rotation
    };
    setShapes([...shapes, newShape]);
  };

  const handleColorChange = (color) => {
    const updatedShapes = shapes.map((shape) =>
      shape.id === selectedShapeId ? { ...shape, fill: color } : shape
    );
    setShapes(updatedShapes);
  };

  return (
    <>
      {/* Add Shape Button */}
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-md"
        onClick={() => setShapePickerOpen(true)}
      >
        Add Shape
      </button>

      {/* Color Picker */}
      <input
        type="color"
        onChange={(e) => handleColorChange(e.target.value)}
        disabled={!selectedShapeId}
      />

      {/* Canvas with Shapes */}
      <Stage width={800} height={600}>
        <Layer>
          {shapes.map((shape) => {
            if (shape.type === "rectangle") {
              return (
                <Rect
                  key={shape.id}
                  x={shape.x}
                  y={shape.y}
                  width={100}
                  height={100}
                  fill={shape.fill}
                  draggable={shape.draggable}
                  onClick={() => setSelectedShapeId(shape.id)}
                  onDragEnd={(e) => {
                    const updatedShapes = shapes.map((s) =>
                      s.id === shape.id
                        ? { ...s, x: e.target.x(), y: e.target.y() }
                        : s
                    );
                    setShapes(updatedShapes);
                  }}
                />
              );
            }
            if (shape.type === "circle") {
              return (
                <Circle
                  key={shape.id}
                  x={shape.x}
                  y={shape.y}
                  radius={50}
                  fill={shape.fill}
                  draggable={shape.draggable}
                  onClick={() => setSelectedShapeId(shape.id)}
                  onDragEnd={(e) => {
                    const updatedShapes = shapes.map((s) =>
                      s.id === shape.id
                        ? { ...s, x: e.target.x(), y: e.target.y() }
                        : s
                    );
                    setShapes(updatedShapes);
                  }}
                />
              );
            }
            if (shape.type === "star") {
              return (
                <Star
                  key={shape.id}
                  x={shape.x}
                  y={shape.y}
                  numPoints={5}
                  innerRadius={30}
                  outerRadius={50}
                  fill={shape.fill}
                  draggable={shape.draggable}
                  onClick={() => setSelectedShapeId(shape.id)}
                  onDragEnd={(e) => {
                    const updatedShapes = shapes.map((s) =>
                      s.id === shape.id
                        ? { ...s, x: e.target.x(), y: e.target.y() }
                        : s
                    );
                    setShapes(updatedShapes);
                  }}
                />
              );
            }
            if (shape.type === "slanted-rectangle") {
              return (
                <Rect
                  key={shape.id}
                  x={shape.x}
                  y={shape.y}
                  width={100}
                  height={100}
                  fill={shape.fill}
                  draggable={shape.draggable}
                  rotation={shape.rotation} // Apply rotation for slanted rectangle
                  onClick={() => setSelectedShapeId(shape.id)}
                  onDragEnd={(e) => {
                    const updatedShapes = shapes.map((s) =>
                      s.id === shape.id
                        ? { ...s, x: e.target.x(), y: e.target.y() }
                        : s
                    );
                    setShapes(updatedShapes);
                  }}
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>

      {/* Shape Picker Modal */}
      {isShapePickerOpen && (
        <ShapePickerModal
          onShapeAdd={handleShapeAdd}
          onClose={() => setShapePickerOpen(false)}
        />
      )}
    </>
  );
};

export default ShapeCanvas;
