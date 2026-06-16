import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/ProfileForm.module.css";

function Profile() {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const savedProfile =
    JSON.parse(
      localStorage.getItem(
        `jobseeker_profile_${currentUser?.email}`
      )
    ) || {};

  const [editing, setEditing] =
    useState(false);

  const [profile, setProfile] =
    useState(savedProfile);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem(
      `jobseeker_profile_${currentUser.email}`,
      JSON.stringify(profile)
    );

    alert(
      "Profile updated successfully"
    );

    setEditing(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          My Profile
        </h1>

        <div className={styles.card}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>

              <input
                name="fullName"
                value={profile.fullName || ""}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Email</label>

              <input
                name="email"
                value={profile.email || ""}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Phone</label>

              <input
                name="phone"
                value={profile.phone || ""}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Qualification</label>

              <input
                name="education"
                value={profile.education || ""}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Skills</label>

              <textarea
                name="skills"
                value={profile.skills || ""}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            {!editing ? (
              <button
                className={styles.submitBtn}
                onClick={() =>
                  setEditing(true)
                }
              >
                Edit Profile
              </button>
            ) : (
              <button
                className={styles.submitBtn}
                onClick={handleSave}
              >
                Save Changes
              </button>
            )}

            <Link
              to="/jobs"
              className={styles.submitBtn}
              style={{
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Back To Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;