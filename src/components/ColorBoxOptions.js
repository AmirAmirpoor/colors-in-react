import React from "react";
import styled from "styled-components";
import chroma from "chroma-js";
import uniqid from "uniqid";

import { CgClose as DeleteIcon } from "react-icons/cg";
import { MdApps as ShadesIcon } from "react-icons/md";
import { MdStarBorder as EmptyStarIcon } from "react-icons/md";
import { MdStar as FillStarIcon } from "react-icons/md";
// import { CgArrowsH as DragIcon } from "react-icons/cg";
import { MdSettings as SettingIcon } from "react-icons/md";
import { CgMathPlus as AddIcon } from "react-icons/cg";

import { useNewColors } from "../context/NewColorsContext";

import { getAverageColor } from "../helper";

const OptionsDiv = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  flex-direction: column;
  height: 50%;
  justify-content: space-between;
  color: ${(props) =>
    chroma(props.value).luminance() > 0.6 ? "#000" : "#fff"};
`;

const Icon = styled.i`
  font-size: 1.25rem;
  cursor: pointer;
  opacity: 0.4;

  &:hover {
    opacity: 1;
  }
`;

const AddColorBoxDiv = styled.div`
  position: absolute;
  width: 20%;
  height: 100%;
  right: 0;
  transform: translateX(50%);
  z-index: 100;
  top: 0;
`;

const AddColorBoxButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  border: none;
  color: #666;
  outline: none;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  backface-visibility: hidden;
  transition: transform 200ms ease;
`;

const ColorBoxOptions = ({
  id,
  value,
  isFavorite,
  showAddColorBoxButton,
  toggleColorPicker,
  DragIcon,
}) => {
  const {
    colors,
    setColors,
    haveColorBoxesLocked,
    setColorBoxesLocked,
  } = useNewColors();

  const showShadesHandler = () => {
    const updatedColors = [...colors].map((color) => {
      if (color.id === id) return { ...color, showShades: true };
      else return { ...color };
    });

    setColors(updatedColors);
    setColorBoxesLocked(true);
  };

  const deleteColorBoxHandler = () => {
    const deletedColorBoxIndex = colors.findIndex((color) => color.id === id);
    const updatedColors = [...colors];
    updatedColors.splice(deletedColorBoxIndex, 1);
    setColors(updatedColors);
  };

  const addColorBoxHandler = () => {
    const index = colors.findIndex((color) => color.id === id);

    const prevColor = colors[index].value;
    const nextColor = colors[index + 1].value;

    const newColor = {
      id: uniqid(),
      value: getAverageColor([prevColor, nextColor]),
      isFavorite: false,
      showShades: false,
    };

    const first = [...colors].slice(0, index + 1);
    const second = [...colors].slice(index + 1);

    const updatedColors = [...first, newColor, ...second];
    setColors(updatedColors);
  };

  const toggleIsFavoriteHandler = () => {
    const updatedColors = [...colors].map((color) => {
      if (color.id === id) return { ...color, isFavorite: !color.isFavorite };
      else return { ...color };
    });

    setColors(updatedColors);
  };

  return (
    <>
      {!haveColorBoxesLocked && (
        <OptionsDiv className="colorbox-options" value={value}>
          {colors.length > 2 && (
            <Icon>
              <DeleteIcon onClick={deleteColorBoxHandler} />
            </Icon>
          )}
          <Icon onClick={showShadesHandler}>
            <ShadesIcon />
          </Icon>
          <Icon onClick={toggleIsFavoriteHandler}>
            {isFavorite ? <FillStarIcon /> : <EmptyStarIcon />}
          </Icon>
          {DragIcon}
          <Icon onClick={toggleColorPicker}>
            <SettingIcon />
          </Icon>
        </OptionsDiv>
      )}

      {!haveColorBoxesLocked && showAddColorBoxButton && (
        <AddColorBoxDiv className="addcolorbox-container">
          {colors.length < 10 && (
            <AddColorBoxButton
              className="addcolorbox-button"
              onClick={addColorBoxHandler}
            >
              <AddIcon />
            </AddColorBoxButton>
          )}
        </AddColorBoxDiv>
      )}
    </>
  );
};

export default ColorBoxOptions;
