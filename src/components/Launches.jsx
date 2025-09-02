import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Launches({api}) {
  const url = `${api}/launches`;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((launch) =>
      launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  return (
    <>
      <h1>Launches</h1>
      <p>Click patch to view details</p>
      <input
        type="text"
        placeholder="Search mission name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "300px" }}
      />

      <table>
        <thead>
          <tr>
            <td></td>
            <td>Flight</td>
            <td>Mission Name</td>
            <td>Launch Date (UTC)</td>
            <td>Details</td>
            <td>Launch Site</td>
            <td>Video</td>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((launch, index) => (
            <tr key={index}>
              <td>
                {launch.links.mission_patch ? (
                  <Link to={`/launches/${launch.flight_number}`}>
                    <img
                      src={launch.links.mission_patch}
                      title="Click for details"
                      style={{ width: "50px", height: "50px" }}
                      className="zoom-image"
                    />
                  </Link>
                ) : (
                  "No patch"
                )}
              </td>
              <td>{launch.flight_number}</td>
              <td>{launch.mission_name}</td>
              <td>{launch.launch_date_utc}</td>
              <td>{launch.details}</td>
              <td>{launch.launch_site.site_name_long}</td>
              <td>
                <a href={launch.links.video_link} target="_blank">
                  📹
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Launches;
