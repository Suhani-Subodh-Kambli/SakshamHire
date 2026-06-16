import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../../styles/Auth.module.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const users =
    JSON.parse(
      localStorage.getItem(
        "sakshamhire_users"
      )
    ) || [];

  const foundUser =
    users.find(
      (user) =>
        user.email ===
          formData.email &&
        user.password ===
          formData.password
    );

  if (!foundUser) {
    alert(
      "Invalid email or password."
    );
    return;
  }

  localStorage.setItem(
    "isAuthenticated",
    "true"
  );

  localStorage.setItem(
    "currentUser",
    JSON.stringify(foundUser)
  );

  if (
    foundUser.role ===
    "jobseeker"
  ) {
    const profile =
      JSON.parse(
        localStorage.getItem(
          `jobseeker_profile_${foundUser.email}`
        )
      );

    if (
      profile &&
      profile.profileCompleted
    ) {
      navigate("/jobs");
    } else {
      navigate("/profile");
    }
  } else {
    navigate("/employer");
  }
};

  return (
    <div className={styles.authPage}>
      <div className={styles.leftPanel}>
        <div className={styles.logo}>
          SakshamHire
        </div>

        <h1 className={styles.heroTitle}>
          Inclusive Careers.
          <br />
          Equal Opportunities.
        </h1>

        <p className={styles.heroText}>
          Connecting differently-abled
          professionals with inclusive
          employers across India.
        </p>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.authCard}>
          <h2 className={styles.authTitle}>
            Welcome Back
          </h2>

          <p className={styles.authSubtitle}>
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
            >
              Login
            </button>
          </form>

          <div className={styles.authFooter}>
            Don't have an account?{" "}
            <Link
              to="/register"
              className={styles.authLink}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;