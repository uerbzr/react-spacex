import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Launches from "./components/Launches";
import LaunchesAdd from "./components/LaunchesAdd.jsx";
import Welcome from "./components/Welcome";
import Launch from "./components/Launch";
import Navigation from "./components/Navigation";
import Crew from "./components/Crew";
import CrewAdd from "./components/CrewAdd";

function App() {
  const [data, setData] = useState([]);
  const api = "http://localhost:3001";
  const url = `${api}/launches`;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>SpaceX Viewer</h1>

      <div className="container-nav-main">
        <nav className="sidebar">
          <Navigation />
        </nav>
        <main className="main">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/launches/:id" element={<Launch data={data} />} />
            <Route path="/launches" element={<Launches api={api} />} />
            <Route path="/launches/add" element={<LaunchesAdd api={api} />} />
            <Route path="/crew" element={<Crew api={api} />} />
            <Route path="/crew/add" element={<CrewAdd api={api} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
