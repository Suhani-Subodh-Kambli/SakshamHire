import {
  useState,
  useEffect
} from "react";

import {
  Navigate
} from "react-router-dom";

import mockJobs from "../../data/mockJobs";

import JobCard from "../../components/jobs/JobCard";

import Loader from "../../components/common/Loader";

import AccessibilityPanel from "../../components/accessibility/AccessibilityPanel";

function JobsPage() {
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setLoading(false);
      }, 1000);

    return () =>
      clearTimeout(timer);
  }, []);

  const profile = JSON.parse(
    localStorage.getItem(
      "jobseeker_profile"
    )
  );

  if (
    !profile ||
    !profile.profileCompleted
  ) {
    return (
      <Navigate to="/profile" />
    );
  }

  if (loading) {
    return (
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "3rem"
        }}
      >
        <Loader />
      </main>
    );
  }

  return (
    <main>
      <h1>
        Recommended Jobs
      </h1>

      <AccessibilityPanel />

      {mockJobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
        />
      ))}
    </main>
  );
}

export default JobsPage;