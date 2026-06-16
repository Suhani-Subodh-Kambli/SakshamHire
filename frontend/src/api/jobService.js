import env from "../config/env";

export const getJobs =
  async () => {
    const response =
      await fetch(
        `${env.API_URL}/jobs`
      );

    return response.json();
  };