import dbConnect from "../../../db/connect";
import Joke from "../../../db/models/Joke";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  switch (request.method) {
    case "GET":
      const joke = await Joke.findById(id);

      if (!joke) {
        response.status(404).json({ status: "Not Found" });
      }

      response.status(200).json(joke);
      break;

    case "PUT":
      await Joke.findByIdAndUpdate(id, {
        $set: request.body,
      });

      response.status(200).json({ status: "Joke updated!" });
      break;

    case "DELETE":
      try {
        await Joke.findByIdAndDelete(id);

        response.status(200).json({ status: "Joke deleted!" });
      } catch (error) {
        response.status(400).json({ error: error.message });
      }
      break;
    default:
      console.log("request method was neither GET, PUT or DELETE");
      response.status(405).json({ error: "Method not allowed" });
      break;
  }
}
