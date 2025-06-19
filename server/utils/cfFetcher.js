const axios = require("axios");

async function fetchCFData(handle) {
  try {
    const userResponse = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
    if (userResponse.data.status !== "OK") throw new Error("User not found");

    const user = userResponse.data.result[0];
    const ratingResponse = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
    if (ratingResponse.data.status !== "OK") throw new Error("Rating info not found");

    // Prepare contests array with rating changes and unsolved problems count (dummy here, expand as needed)
    const contests = ratingResponse.data.result.map((contest) => ({
      contestId: contest.contestId,
      contestName: contest.contestName,
      rank: contest.rank,
      ratingUpdateTimeSeconds: contest.ratingUpdateTimeSeconds,
      oldRating: contest.oldRating,
      newRating: contest.newRating,
      ratingChange: contest.newRating - contest.oldRating,
      // unsolvedProblems: 0 // You can expand this based on submissions API if needed
    }));

    // For problems, you could fetch submissions, here we keep empty or minimal
    const problems = []; // Expand as needed

    return {
      currentRating: user.rating || 0,
      maxRating: user.maxRating || 0,
      contests,
      problems,
    };
  } catch (err) {
    console.error("Error fetching CF data:", err.message);
    return {
      currentRating: 0,
      maxRating: 0,
      contests: [],
      problems: [],
    };
  }
}

module.exports = fetchCFData;
