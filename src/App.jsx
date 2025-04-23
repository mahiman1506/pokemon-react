import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Pokemon } from "./Pokemon";
import PokemonFullDetails from "./PokemonFullDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pokemon />} />
        <Route path="/pokemon/:name" element={<PokemonFullDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;