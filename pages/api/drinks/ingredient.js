import axios from "axios";

// this request is used to get all drinks depending the ingredient we search
export default async (req, res) => {
  try {
    const { i } = req.query;
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${i}`
    );

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
