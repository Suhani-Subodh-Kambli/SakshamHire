import env from "../config/env";

export const loginUser =
  async (payload) => {
    const response =
      await fetch(
        `${env.API_URL}/auth/login`,
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