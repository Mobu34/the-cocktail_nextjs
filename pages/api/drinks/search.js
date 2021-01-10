import axios from "axios";

export default async (req, res) => {
  try {
    const { s } = req.query;
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${s}`
    );

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
