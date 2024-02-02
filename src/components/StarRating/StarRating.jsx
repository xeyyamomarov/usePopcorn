import React, { useState } from "react";
import Star from "./Star";
// import PropTypes from "prop-types";

const allstyles = {
  containerStyle: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  starContainerStyle: {
    display: "flex",
  },
};

const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  messages = [],
  defaultRating = 0,
  onSetRating,
}) => {
  //   StarRating.propTypes = {
  //     maxRating: PropTypes.number,
  //   };
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color: color,
    fontSize: `${size / 1.5}px`,
  };

  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (rating) => {
    setRating(rating);
    onSetRating(rating);
  };

  const handleTempIn = (rating) => {
    setTempRating(rating);
  };

  const handleTempOut = () => {
    setTempRating(0);
  };
  return (
    <div style={allstyles.containerStyle}>
      <div style={allstyles.starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            handleTempIn={() => handleTempIn(i + 1)}
            handleTempOut={handleTempOut}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
};

export default StarRating;
