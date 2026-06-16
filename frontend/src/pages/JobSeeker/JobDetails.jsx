import {
  useParams
} from "react-router-dom";

import mockJobs from "../../data/mockJobs";

function JobDetails() {
  const { id } =
    useParams();

  const job =
    mockJobs.find(
      (item) =>
        item.id ===
        Number(id)
    );

  if (!job) {
    return (
      <main>
        <h2>
          Job Not Found
        </h2>
      </main>
    );
  }

  return (
    <main>
      <h1>{job.role}</h1>

      <h3>
        {job.company}
      </h3>

      <p>
        {job.description}
      </p>

      <p>
        <strong>
          Vacancies:
        </strong>{" "}
        {job.vacancies}
      </p>

      <p>
        <strong>
          AI Match:
        </strong>{" "}
        {job.matchScore}%
      </p>

      <h4>
        Accessibility
        Features
      </h4>

      <ul>
        {job.accessibilityFeatures.map(
          (feature) => (
            <li key={feature}>
              {feature}
            </li>
          )
        )}
      </ul>
    </main>
  );
}

export default JobDetails;