import React from "react";
import { useContext } from "react";
import { ApiContext } from "../App";

import { useParams } from "react-router-dom";
function Launch() {
  const { id } = useParams();
  const { launchData } = useContext(ApiContext);
  const item = launchData.find((x) => x.flight_number === Number(id));

  return (
    <>
      {item && item.links?.mission_patch ? (
        <img
          src={item.links.mission_patch}
          alt={`${item.mission_name} patch`}
          style={{ width: "200px", height: "200px" }}
        />
      ) : (
        "No patch"
      )}
      <h1>{item.mission_name}</h1>
      <p>{item.details}</p>
      <hr />
      <a href="/launches">Back to Launches</a>
    </>
  );
}

export default Launch;
