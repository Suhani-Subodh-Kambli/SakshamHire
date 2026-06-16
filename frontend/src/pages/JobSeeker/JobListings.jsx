import { Link, useNavigate } from "react-router-dom";

import mockJobs from "../../data/mockJobs";
import JobCard from "../../components/jobs/JobCard";

function JobListings() {
  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem(
        "sakshamhire_user"
      )
    ) || {};

  const profile =
    JSON.parse(
      localStorage.getItem(
        "jobseeker_profile"
      )
    ) || {};

  const handleLogout = () => {
    localStorage.removeItem(
      "isAuthenticated"
    );

    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      {/* HEADER */}

      <header
        style={{
          background: "#ffffff",
          padding: "16px 32px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.08)",

          display: "flex",
          justifyContent:
            "space-between",

          alignItems: "center",
        }}
      >
        <div>
          <h2
            style={{
              color: "#4f46e5",
              margin: 0,
            }}
          >
            SakshamHire
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <Link
            to="/jobs"
            style={{
              textDecoration: "none",
              color: "#1e293b",
              fontWeight: "600",
            }}
          >
            Jobs
          </Link>

          <Link
            to="/my-profile"
            style={{
              textDecoration: "none",
              color: "#1e293b",
              fontWeight: "600",
            }}
          >
            👤 My Profile
          </Link>

          <button
            onClick={handleLogout}
            style={{
              border: "none",
              background:
                "#ef4444",

              color: "#fff",

              padding:
                "10px 16px",

              borderRadius:
                "10px",

              cursor:
                "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* CONTENT */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "32px",
        }}
      >
        {/* Welcome Card */}

        <div
          style={{
            background: "#fff",

            padding: "24px",

            borderRadius:
              "18px",

            marginBottom:
              "24px",

            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              marginBottom:
                "10px",
            }}
          >
            Welcome,
            {" "}
            {profile.fullName ||
              user.fullName ||
              "Job Seeker"}
          </h1>

          <p
            style={{
              color: "#64748b",
            }}
          >
            Discover inclusive
            opportunities matched
            to your skills and
            accessibility needs.
          </p>

          <div
            style={{
              marginTop:
                "16px",
              fontWeight:
                "600",
            }}
          >
            Total Jobs Available:
            {" "}
            {mockJobs.length}
          </div>
        </div>

        {/* Jobs */}

        <h2
          style={{
            marginBottom:
              "24px",
          }}
        >
          Recommended Jobs
        </h2>

        {mockJobs.length ===
        0 ? (
          <div
            style={{
              background:
                "#fff",

              padding:
                "24px",

              borderRadius:
                "16px",
            }}
          >
            No jobs available.
          </div>
        ) : (
          mockJobs.map(
            (job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            )
          )
        )}
      </div>
    </div>
  );
}

export default JobListings;