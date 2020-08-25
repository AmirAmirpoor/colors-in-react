import React from "react";
import styled from "styled-components";
import chroma from "chroma-js";

import { useNewColors } from "../context/NewColorsContext";

const Div = styled.div`
  position: absolute;
  bottom: -75px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 50px;
  background: ${(props) => props.value};
  border-radius: 0;
  color: ${(props) =>
    chroma(props.value).luminance() > 0.6 ? "#000" : "#fff"};
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  font-weight: 300;
  transition: opacity 200ms ease;
`;

const Alert = ({ shouldShow, text, value }) => {
  return (
    <Div value={value} className={`alert ${shouldShow && "show"}`}>
      {text}
    </Div>
  );
};

export default Alert;
