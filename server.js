const express = require("express");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
app.use(express.json());

app.use("/api", appointmentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

