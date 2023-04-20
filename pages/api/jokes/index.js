import dbConnect from "../../../db/connect";
import Joke from "../../../db/models/Joke";

export default async function handler(request, response) {
  await dbConnect();

  switch (request.method) {
    case "GET":
      const jokes = await Joke.find();
      response.status(200).json(jokes);

      break;

    case "POST":
      try {
        const jokeData = request.body;
        await Joke.create(jokeData);

        response.status(201).json({ status: "Joke created" });
      } catch (error) {
        response.status(400).json({ error: error.message });
      }

      break;

    default:
      console.log("request method was neither GET or POST");
      response.status(405).json({ error: "Method not allowed" });
      break;
  }
}
