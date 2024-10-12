import { useState } from "react";

export const useShapes = () => {
  const [shapes, setShapes] = useState([]);

  // Add a new shape
  const addShape = (type) => {
    const newShape = {
      id: shapes.length + 1,
      type,
      x: 100,
      y: 100,
      fill: "blue",
      draggable: true,
      rotation: type === "slanted-rectangle" ? 30 : 0,
      showOptions: false, // New field to toggle gear options visibility
    };
    setShapes([...shapes, newShape]);
  };

  // Update the position of a shape
  const updateShapePosition = (id, x, y) => {
    setShapes(shapes.map((shape) =>
      shape.id === id ? { ...shape, x, y } : shape
    ));
  };

  // Update the fill color of a shape
  const updateShapeFill = (id, color) => {
    setShapes(shapes.map((shape) =>
      shape.id === id ? { ...shape, fill: color } : shape
    ));
  };

  // Delete a shape
  const deleteShape = (id) => {
    setShapes(shapes.filter((shape) => shape.id !== id));
  };

  // Toggle gear options visibility for a shape
  const toggleShapeOptions = (id) => {
    setShapes(shapes.map((shape) =>
      shape.id === id ? { ...shape, showOptions: !shape.showOptions } : shape
    ));
  };

  return {
    shapes,
    addShape,
    updateShapePosition,
    updateShapeFill,
    deleteShape,          // New delete functionality
    toggleShapeOptions,   // New toggle options functionality
  };
};
