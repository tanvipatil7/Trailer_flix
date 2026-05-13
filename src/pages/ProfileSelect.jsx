import { useNavigate } from "react-router-dom";
import placeholder from "../assets/placeholder.png";

function ProfileSelect() {
  const navigate = useNavigate();

  return (
    <div className="profiles">
      <h1>Who’s watching?</h1>

      <div className="profiles__list">
        <div className="profile" onClick={() => navigate("/home")}>
          <img src={placeholder} alt="Profile" />
          <p>User</p>
        </div>

        <div className="profile" onClick={() => navigate("/home")}>
          <img src={placeholder} alt="Profile" />
          <p>Kids</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileSelect;
