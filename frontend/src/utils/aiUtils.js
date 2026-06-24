/**
 * Calculates the cosine similarity between two vectors.
 * @param {number[]} vecA 
 * @param {number[]} vecB 
 * @returns {number} Similarity score (0 to 1)
 */
export const cosineSimilarity = (vecA, vecB) => {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

/**
 * Ranks jobs based on a user profile vector.
 * @param {number[]} userEmbedding 
 * @param {Object[]} jobs 
 * @returns {Object[]} Ranked jobs with 'matchScore'
 */
export const rankJobs = (userEmbedding, jobs) => {
  if (!userEmbedding) return jobs;

  return jobs
    .map(job => ({
      ...job,
      matchScore: job.embedding 
        ? Math.round(cosineSimilarity(userEmbedding, job.embedding) * 100) 
        : Math.round(Math.random() * 20 + 70) // Fallback for mock demo if no embedding
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
};

/**
 * Prepares a searchable string from a job seeker's profile.
 * @param {Object} profile 
 * @returns {string}
 */
export const prepareProfileText = (profile) => {
  return `
    Skills: ${profile.skills?.join(", ") || "None"}
    Education: ${profile.education || ""}
    Experience: ${profile.experience || ""}
    Interests: ${profile.interests || ""}
    Disability Type: ${profile.disabilityType || ""}
  `.trim();
};
