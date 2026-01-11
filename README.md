

# Plum AI Automation Engineer – Intern Assignment  
## AI-Powered Appointment Scheduler Backend

---

## Overview

This repository contains my solution for the **Plum AI Automation Engineer – Intern Assignment**.  
The project implements a backend service that parses **natural language text or document-based appointment requests** and converts them into **structured scheduling data**.

The system supports both typed text and uploaded images, applies **OCR for text extraction**, performs **entity extraction**, **normalizes date and time**, and returns a structured JSON response with **guardrails** to handle ambiguity or missing information.

---

## Project Structure

```

appointment-backend/
│
├── README.md
├── server.js
├── package.json
│
├── routes/
│   └── appointmentRoutes.js
│
├── services/
│   ├── ocrService.js
│   ├── entityService.js
│   ├── normalizationService.js
│   └── guardrailService.js
│
├── utils/
│   └── confidence.js
│
└── uploads/ (optional)

```

---

## Objective

The objective of this project is to build a backend pipeline that:

1. Accepts appointment requests as **text or images**
2. Extracts text using **OCR** when images are uploaded
3. Identifies relevant entities such as **date, time, and department**
4. Normalizes extracted information into **ISO date and time format**
5. Applies **guardrails** to handle missing or ambiguous inputs
6. Returns a **structured JSON response**

---

## Features Implemented

- REST API using **Node.js** and **Express.js**
- Image upload handling using **Multer**
- OCR-based text extraction using **Tesseract.js**
- Rule-based **entity extraction**
- Date and time normalization using **chrono-node** and **moment-timezone**
- Guardrails for incomplete or ambiguous requests
- Confidence scoring across pipeline stages

---

## Technology Stack

- **Node.js**
- **Express.js**
- **Multer**
- **Tesseract.js**
- **chrono-node**
- **moment-timezone**

---

## API Endpoint

### Parse Appointment Request

```

POST /api/parse-appointment

````

---

## Sample Requests & Responses

### Sample Text Request

```json
{
  "text": "Book dentist next Friday at 3pm"
}
````

### Sample Success Response

```json
{
  "appointment": {
    "department": "Dentistry",
    "date": "2025-09-26",
    "time": "15:00",
    "tz": "Asia/Kolkata"
  },
  "overall_confidence": 0.88,
  "status": "ok"
}
```

### Sample Guardrail Response

```json
{
  "status": "needs_clarification",
  "message": "Ambiguous date/time or department"
}
```

---

## Processing Flow

1. Input is received as **text or image**
2. OCR is applied if an image is uploaded
3. Extracted text is cleaned and normalized
4. Entities are identified using rule-based logic
5. Date and time are normalized to **Asia/Kolkata** timezone
6. Guardrails validate extracted information
7. Final structured response is returned

---

## Running the Project Locally

### Install Dependencies

```bash
npm install
```

### Start the Server

```bash
npm start
```

The server runs on:

```
http://localhost:3000
```

---

## Deployment

* The backend is deployed on **Render**
* Server starts automatically after deployment
* No manual startup is required
* APIs are accessible via the deployed URL

---
## 🌐 Deployed URL

The backend is deployed on **Render** and is publicly accessible at:

https://appointment-backend-erpd.onrender.com

All APIs can be tested using this base URL along with the defined endpoints.

Example:
POST https://appointment-backend-erpd.onrender.com/api/parse-appointment

---

## Notes

* OCR output may be noisy; text-cleaning logic is applied before entity extraction
* Free-tier deployment may experience cold-start delays
* The system is focused strictly on **backend processing**

---

## Timeline

* **Development Time:** ~2–3 days

---

##  Conclusion

This project demonstrates a complete backend pipeline for **AI-assisted appointment parsing**, combining OCR, rule-based extraction, normalization, and guardrail-based validation.
The solution emphasizes **correctness, clarity, and backend engineering best practices**, aligning with real-world automation use cases.

---
