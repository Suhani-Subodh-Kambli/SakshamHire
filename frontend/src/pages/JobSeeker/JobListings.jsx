import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import mockJobs from "../../data/mockJobs";
import JobCard from "../../components/jobs/JobCard";
import { rankJobs } from "../../utils/aiUtils";

function JobListings() {
  const navigate = useNavigate();
  const [rankedJobs, setRankedJobs] = useState([]);
  const [isRanking, setIsRanking] = useState(true);

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

  useEffect(() => {
    // Simulate AI ranking process
    const timer = setTimeout(() => {
      const ranked = rankJobs(profile.embedding, mockJobs);
      setRankedJobs(ranked);
      setIsRanking(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [profile]);

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
            accessibility needs via our <strong>Smart Match AI</strong>.
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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0 }}>Recommended Jobs</h2>
          {isRanking && (
            <span style={{ color: '#4f46e5', fontSize: '14px', fontWeight: '500' }}>
              ✨ AI is matching jobs...
            </span>
          )}
        </div>

        {rankedJobs.length ===
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
            {isRanking ? "Analyzing opportunities..." : "No jobs available."}
          </div>
        ) : (
          rankedJobs.map(
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