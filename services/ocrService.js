const Tesseract = require("tesseract.js");

async function extractText(text, image) {
  if (text) {
    return {
      rawText: text,
      confidence: 0.9
    };
  }

  if (image) {
    const result = await Tesseract.recognize(image.buffer, "eng");
    return {
      rawText: result.data.text.trim().toLowerCase(),
      confidence: 0.75
    };
  }

  return { rawText: "", confidence: 0 };
}

module.exports = { extractText };
