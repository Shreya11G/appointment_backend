const DEPARTMENTS = {
  dentist: "Dentistry",
  doctor: "General Medicine",
  cardiology: "Cardiology"
};

function extractEntities(text) {
  if (!text || typeof text !== "string") {
    return {
      entities: {
        date_phrase: null,
        time_phrase: null,
        department: null,
        department_normalized: null
      },
      entities_confidence: 0
    };
  }

  text = text.toLowerCase();
  const timeMatch = text.match(/\d{1,2}\s?(am|pm)/i);

  let departmentKey = null;
  for (let key in DEPARTMENTS) {
    if (text.includes(key)) {
      departmentKey = key;
      break;
    }
  }

  return {
    entities: {
      date_phrase: text,
      time_phrase: timeMatch ? timeMatch[0] : null,
      department: departmentKey,
      department_normalized: departmentKey
        ? DEPARTMENTS[departmentKey]
        : null
    },
    entities_confidence: 0.85
  };
}

module.exports = { extractEntities };
