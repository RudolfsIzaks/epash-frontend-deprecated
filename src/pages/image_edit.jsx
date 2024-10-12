import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Image, Rect, Circle, Star } from "react-konva";
import NavLogo from "../components/navLogo";
import "../index.css";
import { useShapes } from "../components/imageEditor/shapeCanvas"; // Custom hook for shape logic
import ShapePickerModal from "../components/imageEditor/shapeLibrary"; // Modal for picking shapes
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPaintBrush, faTrash } from "@fortawesome/free-solid-svg-icons";

// Dummy images for development
const productImageURL = "https://dummyimage.com/300x300/000/fff";
const backgroundImageURL = "https://dummyimage.com/600x600/ddd/aaa";

// GreenSlider component for styled sliders
const GreenSlider = ({ label, min, max, step, value, onChange }) => {
  return (
    <label className="flex flex-col gap-3 p-5 border border-stone-200 rounded-lg shadow-md col-span-2">
      <span className="font-medium flex justify-between items-center text-gray-700">
        {label}
        {"  "}
        <span className="px-2 py-1 text-sm text-white bg-black rounded-md">
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

  // Import functions from useShapes hook
  const {
    shapes,
    addShape,
    updateShapePosition,
    updateShapeFill,
    deleteShape,
    toggleShapeOptions,
    updateShapeScale,
    updateShapeOpacity,
  } = useShapes(); // Hook for shapes

  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [isShapePickerOpen, setShapePickerOpen] = useState(false); // Modal open state

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
  const openColorPicker = (shapeId) => {
    const newColor = prompt(
      "Enter a color value (e.g., red, #f00, rgb(255,0,0))"
    );
    if (newColor) {
      updateShapeFill(shapeId, newColor); // Use updateShapeFill from the hook
    }
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

  const handleShapeAdd = (type) => {
    addShape(type);
  };

  const handleShapeClick = (id) => {
    setSelectedShapeId(id);
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
              {/* Render shapes here */}
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
                      scaleX={shape.scale} // Use shape scale for X axis
                      scaleY={shape.scale} // Use shape scale for Y axis
                      opacity={shape.opacity} // Use shape opacity
                      onClick={() => handleShapeClick(shape.id)}
                      onDragEnd={(e) =>
                        updateShapePosition(
                          shape.id,
                          e.target.x(),
                          e.target.y()
                        )
                      }
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
                      scaleX={shape.scale} // Use shape scale for X axis
                      scaleY={shape.scale} // Use shape scale for Y axis
                      opacity={shape.opacity} // Use shape opacity
                      onClick={() => handleShapeClick(shape.id)}
                      onDragEnd={(e) =>
                        updateShapePosition(
                          shape.id,
                          e.target.x(),
                          e.target.y()
                        )
                      }
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
                      scaleX={shape.scale} // Use shape scale for X axis
                      scaleY={shape.scale} // Use shape scale for Y axis
                      opacity={shape.opacity} // Use shape opacity
                      onClick={() => handleShapeClick(shape.id)}
                      onDragEnd={(e) =>
                        updateShapePosition(
                          shape.id,
                          e.target.x(),
                          e.target.y()
                        )
                      }
                    />
                  );
                }
                return null;
              })}
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
          <div className="col-span-3 row-span-3 rounded-lg library_shapes flex flex-col p-5 items-start justify-end">
            <h2 className="text-white font-black font-custom text-2xl">
              Element Library
            </h2>
            <p className="w-2/3 text-stone-100 text-sm py-3">
              Pick and choose elements to add to your ad, add artistic elements,
              graphic appeal and stylish borders to further intensify your
              brand.
            </p>
            <button
              className="px-4 py-2 bg-white border border-white text-black rounded-md mt-2 hover:bg-transparent hover:text-white transition"
              onClick={() => setShapePickerOpen(true)}
            >
              Add Shape
            </button>
          </div>
          <div className="row-span-3 col-span-1 flex flex-col gap-3">
            {shapes.map((shape, index) => (
              <div
                key={shape.id}
                className="shape-toolbar p-2 border border-stone-200 flex gap-2 items-center justify-between rounded shadow-md"
              >
                <p className="font-custom font-bold">{shape.type}</p>
                {/* Delete Shape Icon */}
                <div className="flex gap-2 items-center justify-start">
                  <button
                    className="icon delete-icon mx-2"
                    onClick={() => deleteShape(shape.id)} // Use deleteShape from the hook
                    aria-label="Delete Shape"
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-stone-500 text-sm"
                    />
                  </button>

                  {/* Change Color Icon */}
                  <button
                    className="icon paint-brush-icon mx-2"
                    onClick={() => openColorPicker(shape.id)}
                    aria-label="Change Color"
                  >
                    <FontAwesomeIcon
                      icon={faPaintBrush}
                      className="text-stone-500 text-sm"
                    />
                  </button>

                  {/* Gear Icon for Scale and Opacity */}
                  <div className="gear-container flex flex-col gap-2 mx-2">
                    <button
                      className="icon gear-icon"
                      onClick={() => toggleShapeOptions(shape.id)} // Use toggleShapeOptions from the hook
                      aria-label="Shape Options"
                    >
                      <FontAwesomeIcon
                        icon={faGear}
                        className="text-stone-500 text-sm"
                      />
                    </button>
                  </div>
                </div>
                {shape.showOptions && (
                  <div className="shape-options mt-2 bg-white rounded flex flex-col gap-5 z-50">
                    {/* Scale Slider */}
                    <GreenSlider
                      label="Scale"
                      min={0.1}
                      max={2}
                      step={0.01}
                      value={shape.scale || 1} // Fallback to 1 if scale is undefined
                      onChange={(newScale) =>
                        updateShapeScale(shape.id, newScale)
                      }
                    />

                    <GreenSlider
                      label="Opacity"
                      min={0}
                      max={1}
                      step={0.01}
                      value={shape.opacity || 1} // Fallback to 1 if opacity is undefined
                      onChange={(newOpacity) =>
                        updateShapeOpacity(shape.id, newOpacity)
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shape Picker Modal */}
      {isShapePickerOpen && (
        <ShapePickerModal
          onShapeAdd={handleShapeAdd}
          onClose={() => setShapePickerOpen(false)}
        />
      )}
    </>
  );
}

export default ImageEdit;
