import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import DrinkItem from "../../components/DrinkItem";

const DrinksPage = ({ drinks, type }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favs, setFavs] = useState([]);

  const router = useRouter();
  // console.log(router.query.drinksPage);

  const favorites = useSelector((state) => {
    const type =
      router.query.drinksPage === "alcohol"
        ? "favoritesAlcohol"
        : "favoritesNonalcohol";

    if (favs.length === 0) {
      setFavs(state[type]);
    }
  });

  const leftDrinks = [];
  const rightDrinks = [];
  for (let i = 0; i < drinks.length; i++) {
    for (let j = 0; j < favs.length; j++) {
      if (drinks[i].idDrink === favs[j].idDrink) {
        drinks[i].isFavorite = true;
        break;
      } else {
        drinks[i].isFavorite = false;
      }
    }
    if (i % 2 === 0) {
      leftDrinks.push(drinks[i]);
    } else {
      rightDrinks.push(drinks[i]);
    }
  }

  // console.log("left =", leftDrinks);
  // console.log("right =", rightDrinks);

  return (
    <div className="DrinksPage">
      <div className="wrapper">
        <h2>
          {type === "alcohol"
            ? "Les cocktails alcoolisés"
            : type === "nonalcohol"
            ? "Les cocktails sans alcool"
            : `Les cocktails à base de ${type}`}
        </h2>
      </div>
      <div className="DrinksPage-container">
        <div className="DrinksPage-left-container">
          {leftDrinks.map((item, index) => {
            // console.log(item);
            return (
              <DrinkItem key={index} item={item} isFavorite={item.isFavorite} />
            );
          })}
        </div>
        <div className="DrinksPage-right-container">
          {rightDrinks.map((item, index) => {
            return (
              <DrinkItem key={index} item={item} isFavorite={item.isFavorite} />
            );
          })}
        </div>
      </div>
    </div>
  );
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
        type: drinksPage,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
