import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LaunchesAdd = ({ api }) => {
  const url = `${api}/launches`;
  const [formData, setFormData] = useState({
    flight_number: "1",
    video_link: "https://www.youtube.com/watch?v=_hu9w2NwxNs",
    details: "Nigel mows the lawn in rural France",
    mission_name: "Operation lawn mow",
    mission_patch:
      "https://i.etsystatic.com/33992268/r/il/ba64dc/4947766593/il_570xN.4947766593_40x7.jpg",
  });

  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      flight_number: parseInt(formData.flight_number),
      details: formData.details,
      mission_name: formData.mission_name,

      launch_site: {
        site_id: "1",
        site_name: "Maison de Sibbert",
        site_name_long: "Rural France",
      },
      links: {
        mission_patch: formData.mission_patch,
        video_link: formData.video_link,
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        navigate("/launches");
      } else {
        setStatus("Failed!");
      }
    } catch (error) {
      setStatus(`⚠️ Network error: ${error.message}`);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "2rem auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Submit Launch Info</h2>
      <form onSubmit={handleSubmit}>
        <label>Flight Number:</label>
        <br />
        <input
          type="number"
          name="flight_number"
          value={formData.flight_number}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label>Mission Name:</label>
        <input
          type="name"
          name="mission_name"
          value={formData.mission_name}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label>Video Link:</label>
        <br />
        <input
          type="url"
          name="video_link"
          value={formData.video_link}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label>Details:</label>
        <br />
        <textarea
          name="details"
          rows="4"
          value={formData.details}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </div>
  );
};

export default LaunchesAdd;
