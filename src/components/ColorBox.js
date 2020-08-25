import React, { useState } from "react";
import ColorBoxOptions from "./ColorBoxOptions";
import styled from "styled-components";
import chroma from "chroma-js";

import { useNewColors } from "../context/NewColorsContext";
import { useCopyAlert } from "../context/CopyAlertContext";

import Shades from "./Shades";
import ColorPicker from "./ColorPicker";

import { copyToClipboard } from "../helper";

import { Draggable } from "react-beautiful-dnd";
import { CgArrowsH as DragIcon } from "react-icons/cg";

const Div = styled.div`
  height: 100%;
  width: ${(props) => `${100 / props.length}%`};
  background: ${(props) => props.value};
  color: ${(props) =>
    chroma(props.value).luminance() > 0.6 ? "#000" : "#fff"};

  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
`;

const H2 = styled.div`
  font-size: ${(props) => `${2 - props.count * 0.1}rem`};
  letter-spacing: 1px;
  margin-bottom: 3rem;
  text-transform: uppercase;
  cursor: pointer;
`;

const Icon = styled.i`
  font-size: 1.25rem;
  cursor: pointer;
  opacity: 0.4;

  &:hover {
    opacity: 1;
  }
`;

const ColorBox = (props) => {
  const {
    id,
    value,
    isFavorite,
    showShades,
    length,
    index,
    showAddColorBoxButton,
    setAlertColor,
  } = props;

  const [showColorPicker, setShowColorPicker] = useState(false);

  const { haveColorBoxesLocked, colors, setColors } = useNewColors();
  const { showAlert } = useCopyAlert();

  const copyColorHandler = () => {
    copyToClipboard(value);
    showAlert();
    setAlertColor(value);
    document.querySelector("#copied-sound-effect").play();
  };

  const changeColorHandler = (val) => {
    const updatedColors = [...colors].map((color) => {
      if (color.id === id) return { ...color, value: val.hex };
      else return { ...color };
    });

    setColors(updatedColors);
  };

  const DragIconJSX = ({ provided, hide }) => (
    <Icon style={hide && { display: "none" }} {...provided.dragHandleProps}>
      <DragIcon />
    </Icon>
  );

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Div
          className="colorbox"
          value={value}
          length={length}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <DragIconJSX provided={provided} hide />
          <ColorBoxOptions
            value={value}
            id={id}
            isFavorite={isFavorite}
            showAddColorBoxButton={showAddColorBoxButton}
            toggleColorPicker={() => setShowColorPicker((prev) => !prev)}
            DragIcon={<DragIconJSX provided={provided} />}
          />
          {!haveColorBoxesLocked && (
            <H2 onClick={copyColorHandler} count={colors.length}>
              {value.slice(1)}
            </H2>
          )}

          {showShades && <Shades value={value} id={id} />}

          {showColorPicker && (
            <ColorPicker color={value} changeColor={changeColorHandler} />
          )}
        </Div>
      )}
    </Draggable>
  );
};

export default ColorBox;
