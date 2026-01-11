const express = require("express");
const multer = require("multer");

const ocrService = require("../services/ocrService");
const entityService = require("../services/entityService");
const normalizeService = require("../services/normalizationService");
const guardrailService = require("../services/guardrailService");
const { calculateOverallConfidence } = require("../utils/confidence");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.get("/parse-appointment", (req, res) => {
  res.json({
    message: "POST this endpoint to parse appointments"
  });
});

router.post("/parse-appointment", upload.single("image"), async (req, res) => {
  try {
    console.log("FILE RECEIVED:", req.file);
    console.log("BODY:", req.body);

    const { rawText } = await ocrService.extractText(req.body.text, req.file);

    const entitiesResult = entityService.extractEntities(rawText);

    const normalizedResult = normalizeService.normalizeEntities(
      entitiesResult.entities
    );

    if (!normalizedResult || !normalizedResult.normalized) {
      return res.json({
        status: "needs_clarification",
        message: "Unable to normalize date/time"
      });
    }

    const isValid = guardrailService.validate(
      entitiesResult.entities,
      normalizedResult.normalized
    );

    if (!isValid) {
      return res.json({
        status: "needs_clarification",
        message: "Ambiguous date/time or department"
      });
    }

    res.json({
      appointment: {
        department: entitiesResult.entities.department_normalized,
        date: normalizedResult.normalized.date,
        time: normalizedResult.normalized.time,
        tz: "Asia/Kolkata"
      },
      status: "ok"
    });

  } catch (err) {
  console.error("🔥 INTERNAL ERROR:", err);
  res.status(500).json({
    error: err.message,
    stack: err.stack
  });
}
});
module.exports = router;
