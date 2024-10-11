import React, { useState, useEffect, useRef } from "react"; // Added useRef import
import { Stage, Layer, Image } from "react-konva";
import NavLogo from "../components/navLogo";
import "../index.css";

// Dummy images for development
const productImageURL = "https://dummyimage.com/300x300/000/fff"; // Replace with backend images later
const backgroundImageURL = "https://dummyimage.com/600x600/ddd/aaa"; // Replace with backend images later

function ImageEdit() {

  // Instead of using useImage hook, use plain useState and useEffect
  const [productImage, setProductImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = productImageURL;
    img.onload = () => setProductImage(img);
  }, [productImageURL]);

  useEffect(() => {
    const img = new window.Image();
    img.src = backgroundImageURL;
    img.onload = () => setBackgroundImage(img);
  }, [backgroundImageURL]);

  const [productProps, setProductProps] = useState({
    x: 50,
    y: 50,
    scale: 1,
    opacity: 1,
  });

  const backgroundRef = useRef(); // Background canvas reference

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
      scale: e.target.scaleX(), // assuming uniform scaling
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
        <NavLogo/>
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
        <Stage width={600} height={600} ref={backgroundRef}>
          <Layer>
            {/* Background Image */}
            {backgroundImage && (
              <Image
                image={backgroundImage}
                x={0}
                y={0}
                width={600}
                height={600}
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
                onTransformEnd={handleTransform} // Changed to onTransformEnd for smoother scaling
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
