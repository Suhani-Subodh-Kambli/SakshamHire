import DashboardLayout from "../../components/layout/DashboardLayout";

import dashboardStyles from "../../styles/Dashboard.module.css";

function EmployerDashboard() {
  const jobs =
    JSON.parse(
      localStorage.getItem(
        "posted_jobs"
      )
    ) || [];

  return (
    <DashboardLayout>
      <div
        className={
          dashboardStyles.dashboardGrid
        }
      >
        <div
          className={
            dashboardStyles.statCard
          }
        >
          <div
            className={
              dashboardStyles.statValue
            }
          >
            {jobs.length}
          </div>

          <div
            className={
              dashboardStyles.statText
            }
          >
            Active Jobs
          </div>
        </div>

        <div
          className={
            dashboardStyles.statCard
          }
        >
          <div
            className={
              dashboardStyles.statValue
            }
          >
            146
          </div>

          <div
            className={
              dashboardStyles.statText
            }
          >
            Candidate Matches
          </div>
        </div>

        <div
          className={
            dashboardStyles.statCard
          }
        >
          <div
            className={
              dashboardStyles.statValue
            }
          >
            92%
          </div>

          <div
            className={
              dashboardStyles.statText
            }
          >
            Accessibility Score
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EmployerDashboard;