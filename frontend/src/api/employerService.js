import env from "../config/env";

export const createJob =
  async (payload) => {
    const response =
      await fetch(
        `${env.API_URL}/jobs`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(
            payload
          )
        }
      );

    return response.json();
  };