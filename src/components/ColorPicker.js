import React from "react";
import { SliderPicker } from "react-color";
import "../App.css";

import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  width: 95%;
  bottom: 17%;
  left: 50%;
  transform: translateX(-50%);
  max-width: 300px;
  margin: 1rem auto;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 0.65rem;
`;

const ColorPicker = ({ color, changeColor }) => {
  return (
    <Container>
      <SliderPicker color={color} onChange={changeColor} />
    </Container>
  );
};

export default ColorPicker;
