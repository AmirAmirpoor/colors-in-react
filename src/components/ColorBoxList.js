import React, { useState } from "react";
import ColorBox from "./ColorBox";
import { useNewColors } from "../context/NewColorsContext";
import { useCopyAlert } from "../context/CopyAlertContext";
import styled from "styled-components";

import Alert from "./Alert";

import audioSrc from "../assets/success.mp3";

import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  position: relative;
`;

const ColorBoxList = () => {
  const { colors, setColors, setColorBoxesLocked } = useNewColors();
  const { shouldShow } = useCopyAlert();
  const [alertColor, setAlertColor] = useState("seagreen");

  const dragStartHandler = () => {
    // For reordering color boxes
    setColorBoxesLocked(true);
  };

  const dragEndHandler = (info) => {
    const { source, destination, draggableId } = info;
    if (destination) {
      const updatedColors = [...colors];
      const draggedColorBox = [...colors].find(
        (color) => color.id === draggableId
      );

      updatedColors.splice(source.index, 1);
      updatedColors.splice(destination.index, 0, draggedColorBox);
      setColors(updatedColors);
    }

    setColorBoxesLocked(false);
  };

  return (
    <DragDropContext onDragEnd={dragEndHandler} onDragStart={dragStartHandler}>
      <Droppable droppableId="colorbox-list" direction="horizontal">
        {(provided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {colors.map((color, index) => (
              <ColorBox
                {...color}
                length={colors.length}
                key={color.id}
                index={index}
                showAddColorBoxButton={index !== colors.length - 1}
                setAlertColor={(value) => setAlertColor(value)}
              />
            ))}

            {provided.placeholder}

            <Alert
              text="Copied to clipboard"
              value={alertColor}
              shouldShow={shouldShow}
            />
            <audio src={audioSrc} id="copied-sound-effect"></audio>
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ColorBoxList;
