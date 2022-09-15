/** Archivo para generar un .json de ejemplo con mensajes de forma dinamica */
import { faker } from "@faker-js/faker";
import fs from "fs";

faker.setLocale("es_MX");

const authors = Array.from({ length: 5 }).map(() => {
  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();
  return {
    id: faker.datatype.uuid(),
    firstname,
    lastname,
    age: faker.datatype.number({ min: 18, max: 56 }),
    alias: faker.internet.userName(firstname, lastname),
    avatar: faker.internet.avatar(),
  };
});

const messages = Array.from({ length: 30 }).map(() => {
  const index = Math.floor(Math.random() * authors.length);

  return {
    author: authors[index],
    text: faker.hacker.phrase(),
    id: faker.random.alphaNumeric(10),
  };
});

fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2));
