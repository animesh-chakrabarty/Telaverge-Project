const express = require("express");
const spdy = require("spdy");
const fs = require("fs").promises;
const path = require("path");

const PORT = 8000;

const logFilePath = path.join(__dirname, "server.log");

const app = express();

app.use(express.json());

async function appendLog(logEntry) {
  try {
    await fs.appendFile(logFilePath, logEntry);
    console.log(logEntry);
  } catch (error) {
    console.error("Error writing to log file:", error);
  }
}

app.post("/", (req, res) => {
  const now = new Date();
  const localDateTime = now.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  const messageReceived = req.body.message || "hii";
  const responseMessage = "hello";

  const logEntry = `Received at ${localDateTime}: ${messageReceived}\nSent at ${localDateTime}: ${responseMessage}\n\n`;

  res.json({ message: responseMessage });

  appendLog(logEntry);
});

async function startServer() {
  try {
    const key = await fs.readFile("/app/cert/server.key");
    const cert = await fs.readFile("/app/cert/server.cert");

    const server = spdy.createServer(
      {
        key: key,
        cert: cert,
      },
      app
    );

    server.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
