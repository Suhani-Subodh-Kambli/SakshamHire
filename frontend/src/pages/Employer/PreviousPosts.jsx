import DashboardLayout from "../../components/layout/DashboardLayout";

function PreviousPosts() {
  const jobs =
    JSON.parse(
      localStorage.getItem("posted_jobs")
    ) || [];

  return (
    <DashboardLayout>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
          }}
        >
          Previous Job Posts
        </h1>

        {jobs.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            No jobs posted yet.
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              style={{
                background: "white",
                padding: "24px",
                marginBottom: "20px",
                borderRadius: "16px",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  color: "#4f46e5",
                  marginBottom: "16px",
                }}
              >
                {job.position}
              </h2>

              <p>
                <strong>Company:</strong>{" "}
                {job.companyName}
              </p>

              <p>
                <strong>Website:</strong>{" "}
                {job.companyWebsite || "N/A"}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {job.companyEmail}
              </p>

              <p>
                <strong>HR Contact:</strong>{" "}
                {job.hrContactPerson || "N/A"}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {job.hrPhone || "N/A"}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {job.companyLocation || "N/A"}
              </p>

              <hr
                style={{
                  margin: "16px 0",
                }}
              />

              <p>
                <strong>Department:</strong>{" "}
                {job.department || "N/A"}
              </p>

              <p>
                <strong>
                  Employment Type:
                </strong>{" "}
                {job.employmentType || "N/A"}
              </p>

              <p>
                <strong>Openings:</strong>{" "}
                {job.openings}
              </p>

              <p>
                <strong>
                  Salary Range:
                </strong>{" "}
                ₹{job.minSalary || 0} - ₹
                {job.maxSalary || 0}
              </p>

              <p>
                <strong>
                  Experience:
                </strong>{" "}
                {job.minExperience || 0} -{" "}
                {job.maxExperience || 0} Years
              </p>

              <p>
                <strong>
                  Qualification:
                </strong>{" "}
                {job.qualification || "N/A"}
              </p>

              <p>
                <strong>
                  Skills Required:
                </strong>{" "}
                {job.skills || "N/A"}
              </p>

              <hr
                style={{
                  margin: "16px 0",
                }}
              />

              <p>
                <strong>
                  Additional Requirements:
                </strong>
              </p>

              <p>
                {job.requirements ||
                  "None"}
              </p>

              <p>
                <strong>
                  Job Description:
                </strong>
              </p>

              <p>{job.description}</p>

              <hr
                style={{
                  margin: "16px 0",
                }}
              />

              <p>
                <strong>
                  Accessibility Features:
                </strong>
              </p>

              {job.accessibilityFeatures
                ?.length ? (
                <ul>
                  {job.accessibilityFeatures.map(
                    (
                      feature,
                      index
                    ) => (
                      <li key={index}>
                        {feature}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p>
                  No accessibility
                  information provided.
                </p>
              )}

              <p>
                <strong>
                  Disability Categories:
                </strong>
              </p>

              {job.disabilityCategories
                ?.length ? (
                <ul>
                  {job.disabilityCategories.map(
                    (
                      category,
                      index
                    ) => (
                      <li key={index}>
                        {category}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p>
                  Open to all.
                </p>
              )}

              <hr
                style={{
                  margin: "16px 0",
                }}
              />

              <p>
                <strong>
                  Application Deadline:
                </strong>{" "}
                {job.applicationDeadline ||
                  "Not specified"}
              </p>

              <p>
                <strong>
                  Application Link:
                </strong>{" "}
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Apply Here
                </a>
              </p>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

export default PreviousPosts;