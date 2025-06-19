const cron = require("node-cron");
const Student = require("../models/Student");
const fetchCFData = require("../utils/cfFetcher");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendReminderEmail(student) {
  if (!student.remindersEnabled) return;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: student.email,
    subject: "Codeforces Activity Reminder",
    text: `Hi ${student.name},\n\nYou have not solved any problems in the last 7 days. Please get back to problem solving!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    student.remindersSent += 1;
    await student.save();
    console.log(`Reminder email sent to ${student.email}`);
  } catch (err) {
    console.error("Error sending email:", err.message);
  }
}

async function syncStudentData(student) {
  try {
    const cfData = await fetchCFData(student.codeforcesHandle);
    student.cfData = cfData;
    student.currentRating = cfData.currentRating;
    student.maxRating = cfData.maxRating;
    student.lastSynced = new Date();

    // Detect inactivity: no submissions in last 7 days (simplified)
    // For demo, assume inactivity if no contests in 7 days
    const lastContestDate = cfData.contests.length
      ? new Date(Math.max(...cfData.contests.map((c) => c.ratingUpdateTimeSeconds * 1000)))
      : null;
    const inactive = lastContestDate
      ? (Date.now() - lastContestDate.getTime()) / (1000 * 3600 * 24) > 7
      : true;

    if (inactive) {
      await sendReminderEmail(student);
    }

    await student.save();
  } catch (err) {
    console.error(`Error syncing student ${student.name}:`, err.message);
  }
}

function startSyncJob() {
  // Default: run daily at 2 AM
  cron.schedule("0 2 * * *", async () => {
    console.log("Starting daily Codeforces data sync...");

    const students = await Student.find();
    for (const student of students) {
      await syncStudentData(student);
    }

    console.log("Daily sync completed.");
  });

  console.log("Cron job scheduled to run daily at 2 AM");
}

module.exports = { startSyncJob };
