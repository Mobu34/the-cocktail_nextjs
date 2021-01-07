import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

const DrinksPage = ({ drinks }) => {
  const router = useRouter();
  console.log(drinks);
  return <div></div>;
};

export default DrinksPage;

export const getServerSideProps = async (context) => {
  try {
    const { drinksPage } = context.query;
    let response;
    switch (drinksPage) {
      case "alcohol":
        response = await axios.get("http://localhost:3000/api/drinks/alcohols");
        break;
      case "nonalcohol":
        response = await axios.get(
          "http://localhost:3000/api/drinks/nonalcohols"
        );
        break;
      default:
        response = await axios.get(
          `http://localhost:3000/api/drinks/ingredient?i=${drinksPage}`
        );
        break;
    }

    return {
      props: {
        drinks: response.data.drinks,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
