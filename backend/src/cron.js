const cron = require("node-cron");
const axios = require("axios");

const BACKEND_URL = "https://dinesmart-2.onrender.com/";

cron.schedule("*/14 * * * *", async () => {
  console.log("🔁 Running cron job...");
  try {
    await axios.get(`${BACKEND_URL}/api/test`);
    console.log("✅ Ping successful");
  } catch (err) {
    console.error("❌ Ping failed:", err.message);
  }
});
