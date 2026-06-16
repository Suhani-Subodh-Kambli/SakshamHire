import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import styles from "../../styles/PostJob.module.css";

function PostJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    companyEmail: "",
    hrContactPerson: "",
    hrPhone: "",
    companyLocation: "",

    position: "",
    department: "",
    employmentType: "",

    openings: "",

    minSalary: "",
    maxSalary: "",

    minExperience: "",
    maxExperience: "",

    qualification: "",

    skills: "",

    requirements: "",

    description: "",

    accessibilityFeatures: [],

    disabilityCategories: [],

    applicationDeadline: "",

    applyLink: "",
  });

  const accessibilityOptions = [
    "Wheelchair Accessible Office",
    "Remote Work Available",
    "Hybrid Work Available",
    "Flexible Working Hours",
    "Screen Reader Compatible Systems",
    "Sign Language Support",
    "Accessible Washrooms",
    "Accessible Transportation",
    "Assistive Technology Provided",
    "Ergonomic Workstation",
    "Voice Recognition Software",
    "Accessible Interview Process",
    "Accessible Parking",
  ];

  const disabilityOptions = [
    "Locomotor Disability",
    "Visual Impairment",
    "Hearing Impairment",
    "Speech Disability",
    "Autism Spectrum",
    "Intellectual Disability",
    "Multiple Disabilities",
    "Open To All",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleAccessibility = (feature) => {
    if (
      formData.accessibilityFeatures.includes(feature)
    ) {
      setFormData({
        ...formData,
        accessibilityFeatures:
          formData.accessibilityFeatures.filter(
            (item) => item !== feature
          ),
      });
    } else {
      setFormData({
        ...formData,
        accessibilityFeatures: [
          ...formData.accessibilityFeatures,
          feature,
        ],
      });
    }
  };

  const toggleDisability = (type) => {
    if (
      formData.disabilityCategories.includes(type)
    ) {
      setFormData({
        ...formData,
        disabilityCategories:
          formData.disabilityCategories.filter(
            (item) => item !== type
          ),
      });
    } else {
      setFormData({
        ...formData,
        disabilityCategories: [
          ...formData.disabilityCategories,
          type,
        ],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingJobs =
      JSON.parse(
        localStorage.getItem("posted_jobs")
      ) || [];

    const newJob = {
      id: Date.now(),
      ...formData,
    };

    localStorage.setItem(
      "posted_jobs",
      JSON.stringify([
        ...existingJobs,
        newJob,
      ])
    );

    alert("Job posted successfully!");

    navigate("/previous-posts");
  };

  return (
    <DashboardLayout>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.headerCard}>
            <h1 className={styles.title}>
              Post New Job
            </h1>

            <p className={styles.subtitle}>
              Create inclusive opportunities
              for differently-abled candidates.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className={styles.formCard}
          >
            <h2 className={styles.sectionTitle}>
              Company Information
            </h2>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Company Website</label>
                <input
                  type="url"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Company Email</label>
                <input
                  type="email"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>HR Contact Person</label>
                <input
                  type="text"
                  name="hrContactPerson"
                  value={formData.hrContactPerson}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>HR Phone</label>
                <input
                  type="text"
                  name="hrPhone"
                  value={formData.hrPhone}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Company Location</label>
                <input
                  type="text"
                  name="companyLocation"
                  value={formData.companyLocation}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h2 className={styles.sectionTitle}>
              Job Information
            </h2>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Job Role</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Employment Type</label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
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
                  <option>
                    Remote
                  </option>
                  <option>
                    Hybrid
                  </option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>
                  Number of Openings
                </label>
                <input
                  type="number"
                  name="openings"
                  value={formData.openings}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  Minimum Salary
                </label>
                <input
                  type="number"
                  name="minSalary"
                  value={formData.minSalary}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  Maximum Salary
                </label>
                <input
                  type="number"
                  name="maxSalary"
                  value={formData.maxSalary}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  Minimum Experience
                </label>
                <input
                  type="text"
                  name="minExperience"
                  value={formData.minExperience}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  Maximum Experience
                </label>
                <input
                  type="text"
                  name="maxExperience"
                  value={formData.maxExperience}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  Skills Required
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>
                Additional Requirements
              </label>

              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                Job Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <h2 className={styles.sectionTitle}>
              Accessibility Features
            </h2>

            <div className={styles.accessibilityGrid}>
              {accessibilityOptions.map(
                (feature) => (
                  <div
                    key={feature}
                    onClick={() =>
                      toggleAccessibility(
                        feature
                      )
                    }
                    className={`${styles.accessibilityItem} ${
                      formData.accessibilityFeatures.includes(
                        feature
                      )
                        ? styles.selected
                        : ""
                    }`}
                  >
                    {feature}
                  </div>
                )
              )}
            </div>

            <h2 className={styles.sectionTitle}>
              Disability Categories
            </h2>

            <div className={styles.accessibilityGrid}>
              {disabilityOptions.map(
                (item) => (
                  <div
                    key={item}
                    onClick={() =>
                      toggleDisability(
                        item
                      )
                    }
                    className={`${styles.accessibilityItem} ${
                      formData.disabilityCategories.includes(
                        item
                      )
                        ? styles.selected
                        : ""
                    }`}
                  >
                    {item}
                  </div>
                )
              )}
            </div>

            <div
              className={styles.formGroup}
              style={{
                marginTop: "24px",
              }}
            >
              <label>
                Application Deadline
              </label>

              <input
                type="date"
                name="applicationDeadline"
                value={
                  formData.applicationDeadline
                }
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                Application Link
              </label>

              <input
                type="url"
                name="applyLink"
                value={formData.applyLink}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
            >
              Publish Job
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default PostJob;