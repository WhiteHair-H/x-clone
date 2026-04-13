import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { initDB, getTweets, createTweet, deleteTweet } from "./db.ts";

// 프로덕션 환경 설정
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "production";
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// --- API routes ---

app.get("/api/tweets", async (_req, res) => {
  try {
    const tweets = await getTweets();
    res.json(tweets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tweets" });
  }
});

app.post("/api/tweets", async (req, res) => {
  try {
    const { content, authorId } = req.body;
    if (!content || !authorId) {
      res.status(400).json({ error: "content and authorId are required" });
      return;
    }
    const tweet = await createTweet(content, authorId);
    res.status(201).json(tweet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create tweet" });
  }
});

app.delete("/api/tweets/:id", async (req, res) => {
  try {
    await deleteTweet(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete tweet" });
  }
});

// --- Serve frontend in production ---

const distPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`Serving from: ${distPath}`);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  app.get("/", (_req, res) => {
    res.json({ message: "API running. Frontend available at /api/tweets" });
  });
}

// --- Start ---

async function start() {
  await initDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
