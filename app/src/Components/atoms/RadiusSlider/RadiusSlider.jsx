import React from "react";

const RadiusSlider = ({ radius, setRadius, onChange }) => {
  const handleChange = (event) => {
    onChange(parseFloat(event.target.value));
    setRadius(parseFloat(event.target.value));
  };

  return (
    <div className="radius-slider">
      <label htmlFor="radius">Radius: {radius} km</label>
      <input
        type="range"
        id="radius"
        name="radius"
        min="1"
        max="30"
        step="1"
        value={radius}
        onChange={handleChange}
      />
    </div>
  );
};

export default RadiusSlider;
