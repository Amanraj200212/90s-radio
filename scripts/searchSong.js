//this is for searcing scefic song
// node --env-file=.env.local scripts/searchSong.js

import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const API_KEY = process.env.YOUTUBE_API_KEY;

if (!API_KEY) {
  console.error("❌ YOUTUBE_API_KEY is missing.");
  process.exit(1);
}

const rl = readline.createInterface({ input, output });

const query = await rl.question("🎵 Enter song name: ");

rl.close();

const url = new URL(
  "https://www.googleapis.com/youtube/v3/search"
);

url.searchParams.set("part", "snippet");
url.searchParams.set("q", query);
url.searchParams.set("type", "video");
url.searchParams.set("maxResults", "5");
url.searchParams.set("key", API_KEY);

const response = await fetch(url);

if (!response.ok) {
  console.error(await response.text());
  process.exit(1);
}

const data = await response.json();

console.log("\n🎵 Results:\n");

data.items.forEach((item, index) => {
  console.log(`${index + 1}. ${item.snippet.title}`);
  console.log(`   Channel: ${item.snippet.channelTitle}`);
  console.log(`   Video ID: ${item.id.videoId}`);
  console.log(
    `   URL: https://www.youtube.com/watch?v=${item.id.videoId}\n`
  );
});