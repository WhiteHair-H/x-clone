import { Tweet } from "./types";

export async function fetchTweets(): Promise<Tweet[]> {
  const res = await fetch("/api/tweets");
  if (!res.ok) throw new Error("Failed to fetch tweets");
  return res.json();
}

export async function postTweet(
  content: string,
  authorId: string,
): Promise<Tweet> {
  const res = await fetch("/api/tweets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, authorId }),
  });
  if (!res.ok) throw new Error("Failed to post tweet");
  return res.json();
}

export async function removeTweet(id: string): Promise<void> {
  const res = await fetch(`/api/tweets/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete tweet");
}
