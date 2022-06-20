import React from "react";
import { BrowserRouter } from 'react-router-dom';
import AppRoter from "./components/AppRouter";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
        <NavBar />
        <AppRoter />
    </BrowserRouter>
  );
}

export default App;
