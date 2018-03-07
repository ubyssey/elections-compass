const MAX_DIFFERENCE = 4;
const PRECISION = 2;
const PENALTY_WEIGHT = 2 / 3;

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function percentDiff(a, b) {
  return Math.abs(a - b) / MAX_DIFFERENCE;
}

export function computeSimilarity(answersA, answersB) {
  let total = 0;
  let count = 0;
  let skipCount = 0;

  for (var i = 0; i < answersA.length; i++) {
    if (answersA[i] !== null && answersB[i] !== null) {
      total += percentDiff(answersA[i], answersB[i]);
      count++;
    } else {
      skipCount++;
    }
  }

  if (count === 0) {
    return 0;
  }

  const
    // Raw difference
    difference = (total / count),
    // Penalty for skipped questions
    skipPenalty = (skipCount / answersA.length) * PENALTY_WEIGHT,
    // Total difference with penalty
    totalDifference = difference + skipPenalty,
    // Similarity score
    similarity = 1 - totalDifference;

  // Round score to 2 digits
  return round(Math.max(similarity, 0), PRECISION)
}
