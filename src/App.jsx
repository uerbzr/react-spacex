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
export const ApiContext = createContext();

function App() {
  const [launchData, setLaunchData] = useState([]);
  const api = "http://localhost:3001";
  const launchUrl = `${api}/launches`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(launchUrl);
      const jsonData = await response.json();
      setLaunchData(jsonData);
    };
    fetchData();
  }, []);

  return (
    <>
      <ApiContext.Provider value={{ api, launchData, setLaunchData }}>
        <div className="container">
          <h1>SpaceX Viewer</h1>

          <div className="container-nav-main">
            <nav className="sidebar">
              <Navigation />
            </nav>
            <main className="main">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/launches/:id" element={<Launch />} />
                <Route path="/launches" element={<Launches />} />
                <Route path="/launches/add" element={<LaunchesAdd />} />
                <Route path="/crew" element={<Crew />} />
                <Route path="/crew/add" element={<CrewAdd />} />
              </Routes>
            </main>
          </div>
        </div>
      </ApiContext.Provider>
    </>
  );
}

export default App;
