import React from "react";
import "./SquareBox.css";

const squareBox = (props) => {
  const { boxState, onClick } = props;
  return (
    <div className="squarebox" onClick={onClick}>
      {boxState == null ? "" : boxState}
    </div>
  );
};

export default squareBox;
