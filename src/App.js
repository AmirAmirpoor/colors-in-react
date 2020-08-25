import React from "react";
import ColorBoxList from "./components/ColorBoxList";
import { NewColorsProviders } from "./context/NewColorsContext";
import { CopyAlertProvider } from "./context/CopyAlertContext";

import "./App.css";

const App = () => {
  return (
    <NewColorsProviders>
      <CopyAlertProvider>
        <ColorBoxList />
      </CopyAlertProvider>
    </NewColorsProviders>
  );
};

export default App;
