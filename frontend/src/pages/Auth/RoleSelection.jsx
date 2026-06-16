import { useNavigate } from "react-router-dom";

import Button from "../../components/common/Button";

function RoleSelection() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    navigate(
      `/register?role=${role}`
    );
  };

  return (
    <main>
      <h1>Select Your Role</h1>

      <Button
        fullWidth
        onClick={() =>
          selectRole(
            "jobseeker"
          )
        }
      >
        Job Seeker
      </Button>

      <br />
      <br />

      <Button
        fullWidth
        onClick={() =>
          selectRole(
            "employer"
          )
        }
      >
        Employer
      </Button>
    </main>
  );
}

export default RoleSelection;