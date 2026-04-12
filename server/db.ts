import pg from "pg";

const pool = new pg.Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://xclone:xclone123@localhost:5432/xclone",
});

export async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      username VARCHAR(50) UNIQUE NOT NULL,
      avatar VARCHAR(500),
      is_verified BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS tweets (
      id VARCHAR(50) PRIMARY KEY,
      author_id VARCHAR(50) REFERENCES users(id),
      content TEXT NOT NULL,
      image VARCHAR(500),
      likes INTEGER DEFAULT 0,
      retweets INTEGER DEFAULT 0,
      replies INTEGER DEFAULT 0,
      views INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Seed default user
  await pool.query(`
    INSERT INTO users (id, name, username, avatar, is_verified)
    VALUES ('u1', 'John Doe', 'johndoe', 'https://picsum.photos/seed/johndoe/200/200', true)
    ON CONFLICT (id) DO NOTHING;
  `);
}

export async function getTweets() {
  const result = await pool.query(`
    SELECT t.id, t.content, t.image, t.likes, t.retweets, t.replies, t.views, t.created_at,
           u.id AS author_id, u.name AS author_name, u.username AS author_username,
           u.avatar AS author_avatar, u.is_verified AS author_verified
    FROM tweets t
    JOIN users u ON t.author_id = u.id
    ORDER BY t.created_at DESC
  `);

  return result.rows.map((row) => ({
    id: row.id,
    content: row.content,
    image: row.image,
    likes: row.likes,
    retweets: row.retweets,
    replies: row.replies,
    views: row.views,
    timestamp: relativeTime(row.created_at),
    author: {
      id: row.author_id,
      name: row.author_name,
      username: row.author_username,
      avatar: row.author_avatar,
      isVerified: row.author_verified,
    },
  }));
}

export async function createTweet(content: string, authorId: string) {
  const id = `t${Date.now()}`;
  await pool.query(
    "INSERT INTO tweets (id, author_id, content) VALUES ($1, $2, $3)",
    [id, authorId, content],
  );

  const result = await pool.query(
    `SELECT t.id, t.content, t.image, t.likes, t.retweets, t.replies, t.views, t.created_at,
            u.id AS author_id, u.name AS author_name, u.username AS author_username,
            u.avatar AS author_avatar, u.is_verified AS author_verified
     FROM tweets t
     JOIN users u ON t.author_id = u.id
     WHERE t.id = $1`,
    [id],
  );

  const row = result.rows[0];
  return {
    id: row.id,
    content: row.content,
    image: row.image,
    likes: row.likes,
    retweets: row.retweets,
    replies: row.replies,
    views: row.views,
    timestamp: "now",
    author: {
      id: row.author_id,
      name: row.author_name,
      username: row.author_username,
      avatar: row.author_avatar,
      isVerified: row.author_verified,
    },
  };
}

export async function deleteTweet(id: string) {
  await pool.query("DELETE FROM tweets WHERE id = $1", [id]);
}

function relativeTime(date: Date): string {
  const diffMs = Date.now() - new Date(date).getTime();
  const min = Math.floor(diffMs / 60000);
  const hr = Math.floor(diffMs / 3600000);
  const day = Math.floor(diffMs / 86400000);

  if (min < 1) return "now";
  if (min < 60) return `${min}m`;
  if (hr < 24) return `${hr}h`;
  return `${day}d`;
}
