import { config } from "dotenv";

config();

import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

// This Below articles are Google Results from Top 1 Website content

const articles = [
  { ArticleHeading: "Heading" },
  { Result1: "Research your audience:" },
  { Result2: "Build a Presence on the right social media networks" },
];

// Destructuring the array to get a hold of Results
const [Test1, Test2, Test3] = articles;

// Connected or initiated the ChatGPT APi
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

// Created the user Interface Prompt in the Terminal
const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();
userInterface.on("line", async (input) => {
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  });
  // We get a hold of the results from Chat Gpt
  const results = res.data.choices[0].message.content;
  // Check the content of the hard coded results with the chat gpt results

  const trimmedResults = results.slice(0, 25);

  if (trimmedResults == Test3.Result2 || trimmedResults == Test3.Result1) {
    console.log("Same result");
  } else {
    console.log("Sorry results don't match");
  }

  //console.log(results);
  userInterface.prompt();
});
