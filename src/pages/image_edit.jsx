import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Image } from "react-konva";
import NavLogo from "../components/navLogo";
import "../index.css";

// Dummy images for development
const productImageURL = "https://dummyimage.com/300x300/000/fff";
const backgroundImageURL = "https://dummyimage.com/600x600/ddd/aaa";

// GreenSlider component for styled sliders
const GreenSlider = ({ label, min, max, step, value, onChange }) => {
  return (
    <label className="flex flex-col gap-3 p-5 border border-stone-200 rounded-lg shadow-md col-span-2">
      <span className="font-medium text-gray-700">
        {label}{"  "}
        <span className="px-2 py-1 text-sm text-white bg-epash-green rounded-md">
          {value.toFixed(2)}
        </span>
      </span>
      <div className="relative flex flex-col items-start gap-3 mt-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #10B981 0%, #10B981 ${
              ((value - min) / (max - min)) * 100
            }%, #E5E7EB ${((value - min) / (max - min)) * 100}%, #E5E7EB 100%)`,
          }}
        />
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background-color: #10b981;
            border-radius: 50%;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;
          }
          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background-color: #10b981;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;
          }
          input[type="range"]::-webkit-slider-thumb:hover,
          input[type="range"]::-moz-range-thumb:hover {
            background-color: #059669;
          }
        `}</style>
      </div>
    </label>
  );
};

function ImageEdit() {
  const [productImage, setProductImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [productProps, setProductProps] = useState({
    x: 50,
    y: 50,
    scale: 1,
    opacity: 1,
  });

  const backgroundRef = useRef();

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

  const handleDragMove = (e) => {
    setProductProps({
      ...productProps,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransform = (e) => {
    setProductProps({
      ...productProps,
      scale: e.target.scaleX(),
    });
  };

  const handleScaleChange = (value) => {
    setProductProps({ ...productProps, scale: value });
  };

  const handleOpacityChange = (value) => {
    setProductProps({ ...productProps, opacity: value });
  };

  const handleSave = () => {
    const stage = backgroundRef.current.getStage();
    const dataURL = stage.toDataURL();
    console.log("Image Data URL:", dataURL);
  };

  return (
    <>
      <div className="flex w-full justify-between items-center py-5 px-48">
        <NavLogo />
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
      <div className="flex gap-5 md:mx-32 mt-20 rounded border border-stone-200 shadow-md p-12 max-h-[70dvh]">
        <div className="flex justify-center items-center">
          <Stage width={600} height={600} ref={backgroundRef}>
            <Layer>
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
                  onTransformEnd={handleTransform}
                />
              )}
            </Layer>
          </Stage>
        </div>

        {/* Custom Sliders */}
        <div className="grid grid-cols-4 grid-rows-5 gap-5 w-full">
          <GreenSlider
            label="Scale"
            min={0.1}
            max={2}
            step={0.01}
            value={productProps.scale}
            onChange={handleScaleChange}
          />
          <GreenSlider
            label="Opacity"
            min={0}
            max={1}
            step={0.01}
            value={productProps.opacity}
            onChange={handleOpacityChange}
          />
        </div>
      </div>
    </>
  );
}

export default ImageEdit;
