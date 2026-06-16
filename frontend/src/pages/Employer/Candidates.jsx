import DashboardLayout from "../../components/layout/DashboardLayout";

function Candidates() {
  const candidates = [
    {
      id: 1,
      name:
        "Priya Sharma",
      score: 95,
      disability:
        "Visual Impairment"
    },
    {
      id: 2,
      name:
        "Rahul Verma",
      score: 91,
      disability:
        "Locomotor Disability"
    },
    {
      id: 3,
      name:
        "Aditi Singh",
      score: 88,
      disability:
        "Hearing Impairment"
    }
  ];

  return (
    <DashboardLayout>
      <div
        style={{
          padding: "1rem"
        }}
      >
        <h1
          style={{
            marginBottom:
              "20px"
          }}
        >
          Suitable Candidates
        </h1>

        {candidates.map(
          (candidate) => (
            <div
              key={
                candidate.id
              }
              style={{
                background:
                  "white",
                padding:
                  "20px",
                marginBottom:
                  "16px",
                borderRadius:
                  "12px",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)"
              }}
            >
              <h3>
                {
                  candidate.name
                }
              </h3>

              <p>
                <strong>
                  Match
                  Score:
                </strong>{" "}
                {
                  candidate.score
                }
                %
              </p>

              <p>
                <strong>
                  Disability:
                </strong>{" "}
                {
                  candidate.disability
                }
              </p>

              <button
                style={{
                  background:
                    "#4f46e5",
                  color:
                    "white",
                  border:
                    "none",
                  padding:
                    "10px 16px",
                  borderRadius:
                    "8px",
                  cursor:
                    "pointer"
                }}
              >
                View Profile
              </button>
            </div>
          )
        )}
      </div>
    </DashboardLayout>
  );
}

export default Candidates;