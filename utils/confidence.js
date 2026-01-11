function calculateOverallConfidence({
  ocrConfidence = 0,
  entityConfidence = 0,
  normalizationConfidence = 0,
  hasMissingFields = false
}) {
  let overall =
    0.4 * ocrConfidence +
    0.3 * entityConfidence +
    0.3 * normalizationConfidence;

  // Penalize ambiguity or missing information
  if (hasMissingFields) {
    overall = overall * 0.6;
  }

  return Number(overall.toFixed(2));
}

export default {
  calculateOverallConfidence
};
