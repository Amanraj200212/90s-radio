//script genrated by CHATGPT
// node --env-file=.env.local scripts/fetchSongs.js


import fs from "node:fs";
import path from "node:path";

const API_KEY = process.env.YOUTUBE_API_KEY;

if (!API_KEY) {
  console.error("❌ YOUTUBE_API_KEY is missing.");
  console.error("Make sure it exists in .env.local");
  process.exit(1);
}

const songs = [
  ["Pehla Nasha", "Udit Narayan, Sadhana Sargam"],
  ["Papa Kehte Hain", "Udit Narayan"],
  ["Ae Mere Humsafar", "Udit Narayan, Alka Yagnik"],
  ["Dil Hai Ke Manta Nahin", "Anuradha Paudwal, Kumar Sanu"],
  ["Aankhon Se Tune Kya Keh Diya", "Kumar Sanu, Alka Yagnik"],
  ["Mera Dil Bhi Kitna Pagal Hai", "Kumar Sanu, Alka Yagnik"],
  ["Dheere Dheere Se Meri Zindagi Mein Aana", "Kumar Sanu, Anuradha Paudwal"],
  ["Nazar Ke Samne", "Anuradha Paudwal, Kumar Sanu"],
  ["Tu Meri Zindagi Hai", "Kumar Sanu, Anuradha Paudwal"],
  ["Bahut Pyar Karte Hain", "Anuradha Paudwal"],

  ["Tum Mile Dil Khile", "Kumar Sanu, Alka Yagnik"],
  ["Ek Ladki Ko Dekha", "Kumar Sanu"],
  ["Kuch Kuch Hota Hai", "Udit Narayan, Alka Yagnik"],
  ["Tujhe Dekha To", "Kumar Sanu, Lata Mangeshkar"],
  ["Ho Gaya Hai Tujhko To Pyar Sajna", "Lata Mangeshkar, Udit Narayan"],
  ["Mere Khwabon Mein", "Lata Mangeshkar"],
  ["Ruk Ja O Dil Deewane", "Udit Narayan"],
  ["Zara Sa Jhoom Loon Main", "Asha Bhosle, Abhijeet"],
  ["Yeh Kaali Kaali Aankhen", "Kumar Sanu"],
  ["Jaadu Teri Nazar", "Udit Narayan"],

  ["Chand Chhupa Badal Mein", "Udit Narayan, Alka Yagnik"],
  ["Humko Humise Chura Lo", "Lata Mangeshkar, Udit Narayan"],
  ["Aankhon Mein Base Ho Tum", "Kumar Sanu, Alka Yagnik"],
  ["Jo Bhi Kasmein", "Alka Yagnik, Udit Narayan"],
  ["Mujhe Neend Na Aaye", "Udit Narayan, Anuradha Paudwal"],
  ["Odh Li Chunariya", "Kumar Sanu, Alka Yagnik"],
  ["Do Dil Mil Rahe Hain", "Kumar Sanu"],
  ["Main Koi Aisa Geet Gaoon", "Abhijeet, Alka Yagnik"],
  ["Yeh Dil Deewana", "Sonu Nigam"],
  ["Chaiyya Chaiyya", "Sukhwinder Singh, Sapna Awasthi"],

  ["Tu Hi Re", "Hariharan, Kavita Krishnamurti"],
  ["Humma Humma", "Remo Fernandes, Swarnalatha"],
  ["Kehna Hi Kya", "K. S. Chithra"],
  ["Choli Ke Peeche Kya Hai", "Alka Yagnik, Ila Arun"],
  ["Dhak Dhak Karne Laga", "Anuradha Paudwal, Udit Narayan"],
  ["Tip Tip Barsa Paani", "Alka Yagnik, Udit Narayan"],
  ["Goriya Re Goriya", "Lata Mangeshkar, Udit Narayan"],
  ["Mera Piya Ghar Aaya", "Kavita Krishnamurti"],
  ["Husn Hai Suhana", "Chandana Dixit, Abhijeet"],
  ["Main Toh Raste Se Ja Raha Tha", "Alka Yagnik, Kumar Sanu"],

  ["Ole Ole", "Abhijeet"],
  ["Tan Tana Tan", "Udit Narayan, Sudesh Bhosle"],
  ["Haseena Maan Jaayegi", "Shankar Mahadevan, Hema Sardesai"],
  ["Kisi Disco Mein Jaaye", "Alka Yagnik, Kumar Sanu"],
  ["Chunnari Chunnari", "Abhijeet, Anuradha Sriram"],
  ["Jhanjharia", "Abhijeet"],
  ["Ramta Jogi", "Sukhwinder Singh, Alka Yagnik"],
  ["Pardesi Pardesi", "Udit Narayan, Alka Yagnik"],
  ["Aaye Ho Meri Zindagi Mein", "Udit Narayan"],
  ["Ab Tere Bin", "Kumar Sanu"],

  ["Kitna Haseen Chehra", "Kumar Sanu"],
  ["Jeeta Tha Jiske Liye", "Kumar Sanu, Alka Yagnik"],
  ["Dil Ka Rishta", "Alka Yagnik, Kumar Sanu"],
  ["Jeeye To Jeeye Kaise", "Kumar Sanu, Anuradha Paudwal"],
  ["Mera Dil Tere Liye", "Anuradha Paudwal, Udit Narayan"],
  ["Tumse Milne Ki Tamanna Hai", "Kumar Sanu"],
  ["Ek Sanam Chahiye Aashiqui Ke Liye", "Kumar Sanu"],
  ["Aankh Hai Bhari Bhari", "Kumar Sanu"],
  ["Tere Dar Se Sanam", "Kumar Sanu"],
  ["Dil Ka Aalam", "Kumar Sanu"],

  ["Tumhe Apna Banane Ki Kasam", "Anuradha Paudwal, Kumar Sanu"],
  ["Dil Mera Churaya Kyun", "Kumar Sanu, Anuradha Paudwal"],
  ["Woh Ladki Bahut Yaad Aati Hai", "Kumar Sanu, Alka Yagnik"],
  ["Mera Chand Mujhe Aaya Hai Nazar", "Kumar Sanu"],
  ["Mujhe Tumse Mohabbat Hai", "Kumar Sanu"],
  ["Na Tum Jaano Na Hum", "Lucky Ali, Ramya"],
  ["Pyaar Ki Kashti Mein", "Udit Narayan, Alka Yagnik"],
  ["Chand Sitare", "Kumar Sanu"],
  ["Dil Ne Yeh Kaha Hain Dil Se", "Udit Narayan, Alka Yagnik, Kumar Sanu"],
  ["Hum To Deewane Huye", "Alka Yagnik, Udit Narayan"],

  ["Kaho Naa Pyaar Hai", "Udit Narayan, Alka Yagnik"],
  ["Koi Mil Gaya", "Kavita Krishnamurti, Udit Narayan"],
  ["Humko Sirf Tumse Pyaar Hai", "Kumar Sanu, Alka Yagnik"],
  ["Teri Chunariya", "Kumar Sanu, Alka Yagnik"],
  ["Mera Sanam Sabse Pyara Hai", "Alka Yagnik, Udit Narayan"],
  ["Milne Ki Tum Koshish Karna", "Kumar Sanu, Alka Yagnik"],
  ["Kahin Mujhe Pyar Hua", "Kumar Sanu, Alka Yagnik"],
  ["Maine Pyar Tumhi Se Kiya Hai", "Anuradha Paudwal, Kumar Sanu"],
  ["Aisi Deewangi", "Alka Yagnik, Nadeem-Shravan"],
  ["Mujhe Tumse Mohabbat Hai", "Kumar Sanu"],

  ["Sona Sona", "Sonu Nigam, Sudesh Bhosle"],
  ["Urvashi Urvashi", "A. R. Rahman"],
  ["Muqabla Muqabla", "Mano, Swarnalatha"],
  ["Sarkai Lo Khatiya", "Kumar Sanu, Alka Yagnik"],
  ["What Is Mobile Number", "Sonu Nigam, Alka Yagnik"],
  ["Kisi Disco Mein Jaaye", "Alka Yagnik, Kumar Sanu"],
  ["Aankh Hai Bhari Bhari", "Kumar Sanu"],
  ["Nazar Nazar", "Kumar Sanu"],
  ["Mera Mann", "Udit Narayan, Alka Yagnik"],
  ["Mera Mann Tera Pyaasa", "Kumar Sanu"],

  ["Aankhon Mein Neendein", "Udit Narayan, Alka Yagnik"],
  ["Mera Dil Tere Liye", "Anuradha Paudwal, Udit Narayan"],
  ["Meri Duniya Tu Hi Re", "Sonu Nigam, Kavita Krishnamurti"],
  ["Tujhe Dekha To", "Kumar Sanu, Lata Mangeshkar"],
  ["Jo Bhi Kasmein", "Alka Yagnik, Udit Narayan"],
  ["Pehla Nasha", "Udit Narayan, Sadhana Sargam"],
  ["Tu Hi Re", "Hariharan, Kavita Krishnamurti"],
  ["Do Dil Mil Rahe Hain", "Kumar Sanu"],
  ["Tum Mile Dil Khile", "Kumar Sanu, Alka Yagnik"],
  ["Dil Hai Ke Manta Nahin", "Anuradha Paudwal, Kumar Sanu"],
];

async function searchYouTube(query) {
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
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
}

async function main() {
  const results = [];

  for (let i = 0; i < songs.length; i++) {
    const [title, artist] = songs[i];

    console.log(
      `[${i + 1}/${songs.length}] Searching: ${title}`
    );

    try {
      const data = await searchYouTube(
        `${title} ${artist} Hindi song`
      );

      const video = data.items?.[0];

      if (!video) {
        console.log(`❌ No result: ${title}`);

        results.push({
          title,
          artist,
          videoId: "",
        });

        continue;
      }

      results.push({
        title,
        artist,
        videoId: video.id.videoId,
      });

      console.log(
        `✅ ${video.snippet.title} → ${video.id.videoId}`
      );

      // Avoid hammering the API.
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      console.log(`❌ Error: ${title}`);
      console.log(error.message);

      results.push({
        title,
        artist,
        videoId: "",
      });
    }
  }

  const output = `export const songs = ${JSON.stringify(
    results,
    null,
    2
  )} as const;\n`;

  const outputPath = path.join(
    process.cwd(),
    "app",
    "data",
    "songs.ts"
  );

  fs.mkdirSync(path.dirname(outputPath), {
    recursive: true,
  });

  fs.writeFileSync(outputPath, output);

  console.log("\n🎵 songs.ts generated!");
  console.log(outputPath);
}

main();