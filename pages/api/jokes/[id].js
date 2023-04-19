import dbConnect from "../../../db/connect";
import Joke from "../../../db/models/Joke";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const joke = await Joke.findById(id);

    if (!joke) {
      return response.status(404).json({ status: "Not Found" });
    }

    return response.status(200).json(joke);
  }

  if (request.method === "PUT") {
    await Joke.findByIdAndUpdate(id, {
      $set: request.body,
    });

    return response.status(200).json({ status: "Joke updated!" });
  }

  if (request.method === "DELETE") {
    try {
      await Joke.findByIdAndDelete(id);

      return response.status(200).json({ status: "Joke deleted!" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
