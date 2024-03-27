import OpenAI from "openai";
import type { NewCharacter } from "../../types/character.js";
import { config } from "../config.js";
import { getDB } from "../db.js";
import { logger } from "../logger.js";

export default class OpenAIClient {
  private static instance: OpenAIClient;

  public static getInstance = () => {
    if (!OpenAIClient.instance) {
      OpenAIClient.instance = new OpenAIClient();
    }
    return OpenAIClient.instance;
  };

  private client: OpenAI;

  private constructor() {
    this.client = new OpenAI({
      apiKey: config.OPENAI_API_KEY,
    });
  }

  public generateBackground = async (char: NewCharacter) => {
    const db = getDB();
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
}
