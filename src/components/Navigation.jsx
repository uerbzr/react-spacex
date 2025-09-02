import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/launches">Launches</Link>
        </li>
        <li>
          <Link to="/launches/add">&nbsp;Add Launch</Link>
        </li>

        <li>
          <Link to="/crew">Crew</Link>
        </li>
        <li>
          <Link to="/crew/add">&nbsp;&nbsp;Add Crew</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
