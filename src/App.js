import "./App.css";
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Perps from "./pages/Perps";
import LeaderBoard from "./pages/LeaderBoard";
import Pool from "./pages/Pool";
import Rule from "./pages/Rule";
import { connectWallet } from "./app/historySlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(connectWallet());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Perps />} />
          <Route path="perps" element={<Perps />} />
          <Route path="leaderboard" element={<LeaderBoard />} />
          <Route path="pool" element={<Pool />} />
          <Route path="rule" element={<Rule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
