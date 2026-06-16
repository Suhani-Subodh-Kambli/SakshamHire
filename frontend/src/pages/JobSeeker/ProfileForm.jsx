import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileProgress from "../../components/profile/ProfileProgress";
import styles from "../../styles/ProfileForm.module.css";

const currentUser =
  JSON.parse(
    localStorage.getItem(
      "currentUser"
    )
  );

function ProfileForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  fullName:
    currentUser?.fullName || "",

  email:
    currentUser?.email || "",

  phone: "",
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",

    education: "",
    experience: "",
    skills: "",

    preferredJobType: "",
    preferredWorkMode: "",

    linkedin: "",
    portfolio: "",

    disabilityType: "",
    accessibilityNeeds: "",

    resume: null,
    disabilityProof: null,
  });

  const requiredFields = [
    "fullName",
    "email",
    "phone",
    "dateOfBirth",
    "gender",
    "address",
    "city",
    "state",
    "education",
    "experience",
    "skills",
    "preferredJobType",
    "preferredWorkMode",
    "disabilityType",
    "accessibilityNeeds",
  ];

  const completedFields =
    requiredFields.filter(
      (field) =>
        formData[field] &&
        formData[field].toString().trim() !== ""
    ).length +
    (formData.resume ? 1 : 0);

  const totalFields =
    requiredFields.length + 1;

  const percentage = Math.round(
    (completedFields / totalFields) * 100
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const missingFields =
    requiredFields.filter(
      (field) =>
        !formData[field] ||
        formData[field]
          .toString()
          .trim() === ""
    );

  if (!formData.resume) {
    missingFields.push(
      "Resume Upload"
    );
  }

  if (missingFields.length > 0) {
    alert(
      "Please complete all required fields before submitting."
    );
    return;
  }

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "currentUser"
      )
    );

  localStorage.setItem(
    `jobseeker_profile_${currentUser.email}`,
    JSON.stringify({
      ...formData,
      profileCompleted: true,
    })
  );

  alert(
    "Profile completed successfully!"
  );

  navigate("/jobs");
};
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Create Your Profile
        </h1>

        <p className={styles.subtitle}>
          Complete your profile to
          discover accessible jobs.
        </p>

        <ProfileProgress
          percentage={percentage}
        />

        <form
          onSubmit={handleSubmit}
        >
          {/* PERSONAL INFO */}

          <div className={styles.card}>
            <h2
              className={
                styles.sectionTitle
              }
            >
              Personal Information
            </h2>

            <div
              className={
                styles.formGrid
              }
            >
              <div
                className={
                  styles.inputGroup
                }
              >
                <label>
                  Full Name *
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
                  required
                />
              </div>

              <div
                className={
                  styles.inputGroup
                }
              >
                <label>Email *</label>

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <div
                className={
                  styles.inputGroup
                }
              >
                <label>Phone *</label>

                <input
                  type="tel"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <div
                className={
                  styles.inputGroup
                }
              >
                <label>
                  Date of Birth *
                </label>

                <input
                  type="date"
                  name="dateOfBirth"
                  value={
                    formData.dateOfBirth
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <div
                className={
                  styles.inputGroup
                }
              >
                <label>
                  Gender *
                </label>

                <select
                  name="gender"
                  value={
                    formData.gender
                  }
                  onChange={
                    handleChange
                  }
                  required
                >
                  <option value="">
                    Select
                  </option>
                  <option>
                    Female
                  </option>
                  <option>
                    Male
                  </option>
                  <option>
                    Other
                  </option>
                </select>
              </div>

              <div
                className={
                  styles.inputGroup
                }
              >
                <label>
                  Address *
                </label>

                <input
                  type="text"
                  name="address"
                  value={
                    formData.address
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <div
                className={
                  styles.inputGroup
                }
              >
                <label>City *</label>

                <input
                  type="text"
                  name="city"
                  value={
                    formData.city
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <div
                className={
                  styles.inputGroup
                }
              >
                <label>State *</label>

                <input
                  type="text"
                  name="state"
                  value={
                    formData.state
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>
            </div>
          </div>

          {/* EDUCATION */}

          <div className={styles.card}>
            <h2
              className={
                styles.sectionTitle
              }
            >
              Education
            </h2>

            <div
              className={
                styles.inputGroup
              }
            >
              <label>
                Highest Qualification *
              </label>

              <select
                name="education"
                value={
                  formData.education
                }
                onChange={
                  handleChange
                }
                required
              >
                <option value="">
                  Select Qualification
                </option>

                <option>
                  10th Pass
                </option>

                <option>
                  12th Pass
                </option>

                <option>
                  Diploma
                </option>

                <option>
                  Graduate
                </option>

                <option>
                  Post Graduate
                </option>

                <option>PhD</option>
              </select>
            </div>
          </div>

          {/* EXPERIENCE */}

          <div className={styles.card}>
            <h2
              className={
                styles.sectionTitle
              }
            >
              Experience
            </h2>

            <div
              className={
                styles.formGrid
              }
            >
              <div
                className={
                  styles.inputGroup
                }
              >
                <label>
                  Years of Experience *
                </label>

                <input
                  type="number"
                  name="experience"
                  value={
                    formData.experience
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <div
                className={
                  styles.inputGroup
                }
              >
                <label>
                  Preferred Job Type *
                </label>

                <select
                  name="preferredJobType"
                  value={
                    formData.preferredJobType
                  }
                  onChange={
                    handleChange
                  }
                  required
                >
                  <option value="">
                    Select
                  </option>
                  <option>
                    Full Time
                  </option>
                  <option>
                    Part Time
                  </option>
                  <option>
                    Internship
                  </option>
                  <option>
                    Contract
                  </option>
                </select>
              </div>

              <div
                className={
                  styles.inputGroup
                }
              >
                <label>
                  Preferred Work Mode *
                </label>

                <select
                  name="preferredWorkMode"
                  value={
                    formData.preferredWorkMode
                  }
                  onChange={
                    handleChange
                  }
                  required
                >
                  <option value="">
                    Select
                  </option>
                  <option>
                    Remote
                  </option>
                  <option>
                    Hybrid
                  </option>
                  <option>
                    Onsite
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* SKILLS */}

          <div className={styles.card}>
            <h2
              className={
                styles.sectionTitle
              }
            >
              Skills
            </h2>

            <div
              className={
                styles.inputGroup
              }
            >
              <label>
                Skills *
              </label>

              <textarea
                name="skills"
                value={
                  formData.skills
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>
          </div>

          {/* ACCESSIBILITY */}

          <div className={styles.card}>
            <h2
              className={
                styles.sectionTitle
              }
            >
              Accessibility Profile
            </h2>

            <div
              className={
                styles.formGrid
              }
            >
              <div
                className={
                  styles.inputGroup
                }
              >
                <label>
                  Disability Type *
                </label>

                <select
                  name="disabilityType"
                  value={
                    formData.disabilityType
                  }
                  onChange={
                    handleChange
                  }
                  required
                >
                  <option value="">
                    Select
                  </option>
                  <option>
                    Visual Impairment
                  </option>
                  <option>
                    Hearing Impairment
                  </option>
                  <option>
                    Locomotor Disability
                  </option>
                  <option>
                    Cognitive Disability
                  </option>
                  <option>
                    Multiple Disabilities
                  </option>
                </select>
              </div>

              <div
                className={
                  styles.inputGroup
                }
              >
                <label>
                  Accessibility Needs *
                </label>

                <textarea
                  name="accessibilityNeeds"
                  value={
                    formData.accessibilityNeeds
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>
            </div>
          </div>

          {/* RESUME */}

          <div className={styles.card}>
            <h2
              className={
                styles.sectionTitle
              }
            >
              Resume Upload *
            </h2>

            <div
              className={
                styles.uploadBox
              }
            >
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={
                  handleFileChange
                }
                required
              />
            </div>
          </div>

          {/* OPTIONAL */}

          <div className={styles.card}>
            <h2
              className={
                styles.sectionTitle
              }
            >
              Disability Proof
              (Optional)
            </h2>

            <div
              className={
                styles.uploadBox
              }
            >
              <input
                type="file"
                name="disabilityProof"
                accept=".pdf,.jpg,.png"
                onChange={
                  handleFileChange
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className={
              styles.submitBtn
            }
          >
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;