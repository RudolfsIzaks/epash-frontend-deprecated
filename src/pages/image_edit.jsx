import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image"; // This hook helps load images
import "../index.css";

// Dummy images for development
const productImageURL = "https://dummyimage.com/300x300/000/fff"; // Replace with backend images later
const backgroundImageURL = "https://dummyimage.com/600x400/ddd/aaa"; // Replace with backend images later

function ImageEdit() {
  const [productImage] = useImage(productImageURL);
  const [backgroundImage] = useImage(backgroundImageURL);
  
  const [productProps, setProductProps] = useState({
    x: 50,
    y: 50,
    scale: 1,
    opacity: 1,
  });

  const backgroundRef = useRef();

  // Handle drag
  const handleDragMove = (e) => {
    setProductProps({
      ...productProps,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  // Handle scale
  const handleTransform = (e) => {
    setProductProps({
      ...productProps,
      scale: e.target.scaleX(),
    });
  };

  // Handle opacity change
  const handleOpacityChange = (e) => {
    setProductProps({
      ...productProps,
      opacity: e.target.value,
    });
  };

  // Handle save - This is where you will later send the compiled image to the backend
  const handleSave = () => {
    const stage = backgroundRef.current.getStage();
    const dataURL = stage.toDataURL();
    console.log("Image Data URL:", dataURL); 
    // You can send this dataURL to the backend here
  };

  return (
    <>
      <div className="flex w-full justify-between items-center py-5 px-48">
        <div className="flex gap-3">
          <button className="bg-red-500 text-white font-custom font-bold py-2 px-5 rounded-md">
            Discard
          </button>
          <button
            className="bg-epash-green text-white font-custom font-bold py-2 px-5 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>

      {/* Image editor canvas */}
      <div className="flex justify-center items-center h-screen">
        <Stage width={600} height={400} ref={backgroundRef}>
          <Layer>
            {/* Background Image */}
            {backgroundImage && (
              <Image
                image={backgroundImage}
                x={0}
                y={0}
                width={600}
                height={400}
                draggable={false}
              />
            )}
            {/* Product Image */}
            {productImage && (
              <Image
                image={productImage}
                x={productProps.x}
                y={productProps.y}
                scaleX={productProps.scale}
                scaleY={productProps.scale}
                opacity={productProps.opacity}
                draggable
                onDragMove={handleDragMove}
                onTransform={handleTransform}
              />
            )}
          </Layer>
        </Stage>
      </div>

      {/* Controls for scaling and opacity */}
      <div className="flex justify-center space-x-4 mt-4">
        {/* Scale control */}
        <label>
          Scale:
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.01"
            value={productProps.scale}
            onChange={(e) =>
              setProductProps({ ...productProps, scale: parseFloat(e.target.value) })
            }
          />
        </label>
        
        {/* Opacity control */}
        <label>
          Opacity:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={productProps.opacity}
            onChange={handleOpacityChange}
          />
        </label>
      </div>
    </>
  );
}

export default ImageEdit;
