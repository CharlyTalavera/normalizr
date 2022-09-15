import fs from "fs";
import { denormalize, normalize, schema } from "normalizr";

const messagesString = fs.readFileSync("./messages.json", "utf-8")
const messagesJson = JSON.parse(messagesString);

const authors = new schema.Entity("author");

const messages = new schema.Entity("messages", {
  author: authors,
});

const messagesArray = new schema.Array(messages);

const normalized = normalize(messagesJson, messagesArray);

const normalizedString = JSON.stringify(normalized.entities, null, 2);

console.log("Original size:", messagesString.length);
console.log("Normalized size:", normalizedString.length);

/** Solo necesitamos enviar el 'entities' al client */
const { entities } = normalized;

console.log("Normalized entities:", JSON.stringify(entities, null, 2));

/**************************************************/
/*                Desnormalización                */
/**************************************************/

// @ts-ignore
const denormalized = denormalize(Object.keys(entities.messages), messagesArray, entities);

console.log("Desnormalized:", JSON.stringify(denormalized, null, 2));

