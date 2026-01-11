function validate(entities, normalized) {
  if (!entities.department) return false;
  if (!entities.time_phrase) return false;
  if (!normalized) return false;

  return true;
}

module.exports = { validate };
