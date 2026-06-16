import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../../styles/Auth.module.css";

function Register() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] =
    useState("");

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!selectedRole) {
    alert("Please select a role.");
    return;
  }

  if (
    formData.password !==
    formData.confirmPassword
  ) {
    alert("Passwords do not match.");
    return;
  }

  const users =
    JSON.parse(
      localStorage.getItem(
        "sakshamhire_users"
      )
    ) || [];

  const alreadyExists =
    users.find(
      (u) =>
        u.email === formData.email
    );

  if (alreadyExists) {
    alert(
      "Account already exists."
    );
    return;
  }

  const newUser = {
    fullName:
      formData.fullName,
    email: formData.email,
    password:
      formData.password,
    role: selectedRole,
  };

  users.push(newUser);

  localStorage.setItem(
    "sakshamhire_users",
    JSON.stringify(users)
  );

  alert(
    "Registration successful."
  );

  navigate("/");
};

  return (
    <div
      className={
        styles.authPage
      }
    >
      {/* LEFT PANEL */}

      <div
        className={
          styles.leftPanel
        }
      >
        <div
          className={styles.logo}
        >
          SakshamHire
        </div>

        <h1
          className={
            styles.heroTitle
          }
        >
          Start Your
          Inclusive Career
          Journey
        </h1>

        <p
          className={
            styles.heroText
          }
        >
          Join a community
          dedicated to equal
          employment
          opportunities and
          accessible
          workplaces.
        </p>

        <div
          className={
            styles.statsGrid
          }
        >
          <div
            className={
              styles.statCard
            }
          >
            <div
              className={
                styles.statNumber
              }
            >
              95%
            </div>

            <div
              className={
                styles.statLabel
              }
            >
              Success Rate
            </div>
          </div>

          <div
            className={
              styles.statCard
            }
          >
            <div
              className={
                styles.statNumber
              }
            >
              500+
            </div>

            <div
              className={
                styles.statLabel
              }
            >
              Partners
            </div>
          </div>

          <div
            className={
              styles.statCard
            }
          >
            <div
              className={
                styles.statNumber
              }
            >
              PAN India
            </div>

            <div
              className={
                styles.statLabel
              }
            >
              Reach
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}

      <div
        className={
          styles.rightPanel
        }
      >
        <div
          className={
            styles.authCard
          }
        >
          <h2
            className={
              styles.authTitle
            }
          >
            Create Account
          </h2>

          <p
            className={
              styles.authSubtitle
            }
          >
            Join SakshamHire
            today.
          </p>

          {/* Role Selection */}

          <div
            className={
              styles.roleCards
            }
          >
            <div
              className={`${styles.roleCard} ${
                selectedRole ===
                "jobseeker"
                  ? styles.roleCardSelected
                  : ""
              }`}
              onClick={() =>
                setSelectedRole(
                  "jobseeker"
                )
              }
            >
              <h3>
                Job Seeker
              </h3>

              <p>
                Find accessible
                jobs and build
                your career.
              </p>
            </div>

            <div
              className={`${styles.roleCard} ${
                selectedRole ===
                "employer"
                  ? styles.roleCardSelected
                  : ""
              }`}
              onClick={() =>
                setSelectedRole(
                  "employer"
                )
              }
            >
              <h3>
                Employer
              </h3>

              <p>
                Hire talented
                differently-abled
                professionals.
              </p>
            </div>
          </div>

          <form
            onSubmit={
              handleSubmit
            }
            style={{
              marginTop: "1.5rem"
            }}
          >
            <div
              className={
                styles.formGroup
              }
            >
              <label
                className={
                  styles.formLabel
                }
              >
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={
                  formData.fullName
                }
                onChange={
                  handleChange
                }
                className={
                  styles.formInput
                }
                required
              />
            </div>

            <div
              className={
                styles.formGroup
              }
            >
              <label
                className={
                  styles.formLabel
                }
              >
                Email
              </label>

              <input
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                className={
                  styles.formInput
                }
                required
              />
            </div>

            <div
              className={
                styles.formGroup
              }
            >
              <label
                className={
                  styles.formLabel
                }
              >
                Password
              </label>

              <input
                type="password"
                name="password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                className={
                  styles.formInput
                }
                required
              />
            </div>

            <div
              className={
                styles.formGroup
              }
            >
              <label
                className={
                  styles.formLabel
                }
              >
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={
                  formData.confirmPassword
                }
                onChange={
                  handleChange
                }
                className={
                  styles.formInput
                }
                required
              />
            </div>

            <button
              type="submit"
              className={
                styles.submitButton
              }
            >
              Create Account
            </button>
          </form>

          <div
            className={
              styles.authFooter
            }
          >
            Already have an
            account?{" "}
            <Link
              to="/"
              className={
                styles.authLink
              }
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;