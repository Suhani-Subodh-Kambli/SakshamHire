import OpenAI from "openai";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true, // Note: For production, use a backend proxy
});

/**
 * Generates an embedding for a given text using OpenAI's model.
 * Used for Smart Job Matching.
 */
export const generateEmbedding = async (text) => {
  if (!apiKey) {
    console.error("OpenAI API Key is missing");
    return null;
  }

  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    return null;
  }
};

/**
 * Gets a chat response from GPT-4o.
 * Used for the AI Conversational Assistant.
 */
export const getChatResponse = async (messages) => {
  if (!apiKey) {
    return {
      role: "assistant",
      content: "I'm sorry, I cannot connect to the AI service right now. Please check your API key configuration.",
    };
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant for SakshamHire, an inclusive job portal for persons with disabilities. 
          Your goal is to provide career guidance, help with platform navigation, interview preparation, 
          and information about government schemes for disabled individuals. 
          Be empathetic, natural, and clear. Ensure your responses are accessible and easy to understand.`,
        },
        ...messages,
      ],
    });
    return response.choices[0].message;
  } catch (error) {
    console.error("Error getting chat response:", error);
    return {
      role: "assistant",
      content: "I encountered an error while processing your request. Please try again later.",
    };
  }
};
