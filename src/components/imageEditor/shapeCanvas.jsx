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
      scale: 1,         // Add default scale value
      opacity: 1,       // Add default opacity value
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

  // Update the scale of a shape
  const updateShapeScale = (id, scale) => {
    setShapes(shapes.map((shape) =>
      shape.id === id ? { ...shape, scale } : shape
    ));
  };

  // Update the opacity of a shape
  const updateShapeOpacity = (id, opacity) => {
    setShapes(shapes.map((shape) =>
      shape.id === id ? { ...shape, opacity } : shape
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
    updateShapeScale,      // New scale functionality
    updateShapeOpacity,    // New opacity functionality
    deleteShape,
    toggleShapeOptions,
  };
};
