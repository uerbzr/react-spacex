import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CrewAdd = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "Robert Behnken",
    agency: "NASA",
    image: "https://imgur.com/0smMgMH.png",
    wikipedia: "https://en.wikipedia.org/wiki/Robert_L._Behnken",
    launches: ["5eb87d46ffd86e000604b388"],
    status: "active",
    id: "5ebf1a6e23a9a60006e03a7a",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/crew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/crew");
      } else {
        alert("Failed to add crew member.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Crew Member (default one provided for ease!)</h2>
      <label>
        Name:
        <input name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Agency:
        <input name="agency" value={formData.agency} onChange={handleChange} />
      </label>
      <br />
      <label>
        Image URL:
        <input name="image" value={formData.image} onChange={handleChange} />
      </label>
      <br />
      <label>
        Wikipedia:
        <input
          name="wikipedia"
          value={formData.wikipedia}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Launch ID:
        <input
          name="launches"
          value={formData.launches[0]}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              launches: [e.target.value],
            }))
          }
        />
      </label>
      <br />
      <label>
        Status:
        <input name="status" value={formData.status} onChange={handleChange} />
      </label>
      <br />
      <label>
        ID:
        <input name="id" value={formData.id} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CrewAdd;
