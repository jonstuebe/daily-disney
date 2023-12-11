import { kv } from "@vercel/kv";
import disney from "./disney.json";

(async () => {
  // how to reset all the data
  // await kv.del("questions");
  // await kv.lpush("questions", ...disney);
  // await kv.set("lastInsertedIndex", disney.length - 1);

  const lastInsertedIndex: number = (await kv.get("lastInsertedIndex")) ?? 0;
  const newIndex = lastInsertedIndex + 1;
  const questionsToInsert = disney.slice(newIndex);

  console.log(`inserted ${questionsToInsert.length} new questions`);

  if (questionsToInsert.length > 0) {
    await kv.lpush("questions", ...questionsToInsert);
    await kv.set("lastInsertedIndex", disney.length - 1);
  }
})();
