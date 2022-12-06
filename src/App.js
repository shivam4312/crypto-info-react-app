import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Exchanges from "./components/Exchanges";
import Coin from "./components/Coin";
import CoinDetails from "./components/CoinDetails";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/coin" element={<Coin />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
