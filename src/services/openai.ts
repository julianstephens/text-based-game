import { config } from "@/config.js";
import { logger } from "@/logger.js";
import type { NewCharacter, RaceIndex } from "@/types/index.js";
import OpenAI from "openai";
import DBManager from "./db.js";
import Singleton from "./singleton.js";

export default class OpenAIClient extends Singleton<OpenAIClient>() {
  private client: OpenAI;

  private constructor() {
    super();
    this.client = new OpenAI({
      apiKey: config.OPENAI_API_KEY,
    });
  }

  public generateBackground = async (char: NewCharacter) => {
    const db = DBManager.getInstance().db;
    // TODO: clean up error handling
    if (!db) throw new Error();

    const examples = db.data.examples;

    const content = `
		${Object.entries(char)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n")}
		${examples.map((e) => e.data).join('\n"""\n')}
		`;

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content:
          "Use the provided characteristics to create a unique and exciting Dungeon's and Dragons character background. The background should answer the following questions:\n1. Why is the character adventuring instead of living a normal life?\n2. What is motivating the character to go on this adventure?\n3. Who are the character's friends and contacts that will assist in the adventure?Example backgrounds are provided after the player characteristics and are delimited by triple quotations.",
      },
      { role: "user", content },
    ];

    const completion = await this.client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    logger.info(completion.choices[0], "oai response");
  };

  public calculateAgeRange = async (
    race: RaceIndex,
    flavorDescription: string,
  ) => {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Tell me the bounded age range of an adult ${race} based on the following description: ${flavorDescription}`,
      },
    ];

    const completion = await this.client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    return completion.choices[0].message.content;
  };
}
