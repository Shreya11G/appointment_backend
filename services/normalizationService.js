const chrono = require("chrono-node");
const moment = require("moment-timezone");

function normalizeEntities(entities) {
  if (!entities.date_phrase || !entities.time_phrase) {
    return { normalized: null, confidence: 0 };
  }

  const parsedDate = chrono.parseDate(
    `${entities.date_phrase} ${entities.time_phrase}`,
    new Date(),
    { forwardDate: true }
  );
    if (!parsedDate) {
    return { normalized: null, normalization_confidence: 0 };
  }
  const istDate = moment(parsedDate).tz("Asia/Kolkata");

  return {
    normalized: {
      date: istDate.format("YYYY-MM-DD"),
      time: istDate.format("HH:mm")
    },
    normalization_confidence: 0.9
  };
}

module.exports = { normalizeEntities };
