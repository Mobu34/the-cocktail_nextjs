import axios from "axios";

// this request is used to get all details of a specific drink depending to the id
export default async (req, res) => {
  try {
    const { id } = req.query;

    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
