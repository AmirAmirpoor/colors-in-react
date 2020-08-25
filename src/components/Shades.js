import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import styled from "styled-components";

import { useNewColors } from "../context/NewColorsContext";

import { getShades } from "../helper";

const ShadesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100% !important;
`;

const Shade = styled.div`
  width: 100%;
  height: 4%;
  background-color: ${(props) => props.value};
  color: ${(props) =>
    chroma(props.value).luminance() > 0.6 ? "#000" : "#fff"};
  font-size: 0.75rem;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  span {
    opacity: 0;
  }
`;

const Shades = ({ id, value }) => {
  const [shades, setShades] = useState([]);
  useEffect(() => {
    const shadesOfColor = getShades(value);
    setShades(shadesOfColor);
  }, [value]);

  const { colors, setColors, setColorBoxesLocked } = useNewColors();

  const updateColorHandler = (id, shade) => {
    const updatedColors = [...colors].map((color) => {
      if (color.id === id) return { ...color, value: shade, showShades: false };
      else return { ...color, showShades: false };
    });

    setColors(updatedColors);
    setColorBoxesLocked(false);
  };

  return (
    <ShadesContainer>
      {shades.map((shade, index) => (
        <Shade
          key={index}
          className="shade"
          value={shade}
          onClick={() => updateColorHandler(id, shade)}
        >
          <span className={`${shade === value && "active"}`}>
            {shade.slice(1)}
          </span>
        </Shade>
      ))}
    </ShadesContainer>
  );
};

export default Shades;
