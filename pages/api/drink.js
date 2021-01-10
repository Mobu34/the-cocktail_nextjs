import axios from "axios";

export default async (req, res) => {
  try {
    const { id, name } = req.query;
    let response;

    if (id) {
      response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
    } else if (name) {
    }

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
