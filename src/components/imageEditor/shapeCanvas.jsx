import { useState } from "react";

export const useShapes = () => {
  const [shapes, setShapes] = useState([]);

  const addShape = (type) => {
    const newShape = {
      id: shapes.length + 1,
      type,
      x: 100,
      y: 100,
      fill: "blue",
      draggable: true,
      rotation: type === "slanted-rectangle" ? 30 : 0,
    };
    setShapes([...shapes, newShape]);
  };

  const updateShapePosition = (id, x, y) => {
    setShapes(shapes.map((shape) =>
      shape.id === id ? { ...shape, x, y } : shape
    ));
  };

  const updateShapeFill = (id, color) => {
    setShapes(shapes.map((shape) =>
      shape.id === id ? { ...shape, fill: color } : shape
    ));
  };

  return { shapes, addShape, updateShapePosition, updateShapeFill };
};
