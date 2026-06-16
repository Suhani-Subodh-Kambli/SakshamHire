import { Link, useNavigate } from "react-router-dom";

import styles from "./Navbar.module.css";

function Navbar() {
  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem(
        "sakshamhire_user"
      )
    ) || {};

  const logout = () => {
    localStorage.removeItem(
      "isAuthenticated"
    );

    navigate("/");
  };

  return (
    <header className={styles.navbar}>
      <div>
        <h2>
          Welcome,{" "}
          {user.fullName ||
            "User"}
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
        }}
      >
        {user.role ===
          "jobseeker" && (
          <Link
            to="/my-profile"
          >
            👤 Profile
          </Link>
        )}

        <button
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;