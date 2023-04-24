require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Reminder = require("./model/Reminder");

// Contants
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

// Connect to the db
mongoose.connect(process.env.MONGO_URI);

// ******** Controllers ********

// home route
app.get("/", (_req, res) => {
  res.send("<h1>Reminder app</h1>");
});

// Get all reminders
app.post("/reminders", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Somthing went wrong. Please try again!" });
  }

  try {
    const allReminders = await Reminder.find({ email });
    res.status(200).json(allReminders);
  } catch (error) {
    res.status(400).json({ message: "Unable to add. Please try again!" });
  }
});

// Save a reminder
app.post("/reminder/add", async (req, res) => {
  const { name, date, time, email } = req.body;

  if (!name || !date || !time || !email) {
    return res
      .status(400)
      .json({ message: "Somthing went wrong. Please try again!" });
  }

  try {
    const reminderDoc = await Reminder.create({
      name,
      date,
      time,
      email,
    });

    res
      .status(200)
      .json({ message: "Created successfully", reminder: reminderDoc });
  } catch (error) {
    res.status(400).json({ message: "Somthing went wrong. Please try again!" });
  }
});

// Delete a reminder
app.delete("/reminder/delete/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Somthing went wrong. Please try again!" });
  }

  try {
    await Reminder.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Unable to delete the reminder. Please try again!" });
  }
});

// Mark reminder as completed
app.put("/reminder/completed/:id", async (req, res) => {
  const { id } = req.params;
  const { checked } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Somthing went wrong. Please try again!" });
  }

  try {
    await Reminder.findByIdAndUpdate(id, { isCompleted: checked });
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Unable to delete the reminder. Please try again!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
