import axios from "axios";

// this request is triggered to get all ingredients
export default async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
    );

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
