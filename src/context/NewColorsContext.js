import React, { useState, createContext, useContext } from "react";
import chroma from "chroma-js";
import uniqid from "uniqid";

const NewColorsContext = createContext();

export const NewColorsProviders = ({ children }) => {
  // each color should have => {id: lkdldc, value: chroma(), isFavorite: false}
  const [colors, setColors] = useState([
    {
      id: uniqid(),
      value: chroma.random().hex(),
      isFavorite: false,
      showShades: false,
    },
    {
      id: uniqid(),
      value: chroma.random().hex(),
      isFavorite: false,
      showShades: false,
    },
    {
      id: uniqid(),
      value: chroma.random().hex(),
      isFavorite: false,
      showShades: false,
    },
    {
      id: uniqid(),
      value: chroma.random().hex(),
      isFavorite: false,
      showShades: false,
    },
  ]);

  const [haveColorBoxesLocked, setColorBoxesLocked] = useState(false);

  return (
    <NewColorsContext.Provider
      value={{ colors, setColors, haveColorBoxesLocked, setColorBoxesLocked }}
    >
      {children}
    </NewColorsContext.Provider>
  );
};

export const useNewColors = () => useContext(NewColorsContext);
