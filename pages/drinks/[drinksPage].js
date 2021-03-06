import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

import DrinkItem from "../../components/DrinkItem";

import { closeDrawerMenu } from "../../functions/closeDrawerMenu";

// component used as a page, it is used to display all alcoholic/non alcoholic drinks
const DrinksPage = ({ drinks, type, setIsDrawerMenuOpen, setIngredients }) => {
  const [favs, setFavs] = useState([]);

  const router = useRouter();

  const favorites = useSelector((state) => {
    // this is to get the favorites and add a heart icon to all drinks that are in favorites
    const type =
      router.query.drinksPage === "alcohol"
        ? "favoritesAlcohol"
        : "favoritesNonalcohol";

    if (favs.length === 0) {
      setFavs(state[type]);
    }
  });

  // this is to create the left and the right columns
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

  return (
    <>
      <Head>
        <title>
          The Cocktail -{" "}
          {type === "alcohol"
            ? "Les cocktails alcoolisés"
            : type === "nonalcohol"
            ? "Les cocktails sans alcool"
            : `Les cocktails à base de ${type}`}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="DrinksPage"
        onClick={() => closeDrawerMenu(setIsDrawerMenuOpen, setIngredients)}
      >
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
              return (
                <DrinkItem
                  key={index}
                  item={item}
                  isFavorite={item.isFavorite}
                />
              );
            })}
          </div>
          <div className="DrinksPage-right-container">
            {rightDrinks.map((item, index) => {
              return (
                <DrinkItem
                  key={index}
                  item={item}
                  isFavorite={item.isFavorite}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DrinksPage;

import { getApi } from "../../functions/api";

export const getServerSideProps = async (context) => {
  const API = getApi();

  try {
    const { drinksPage } = context.query;
    let response;
    switch (drinksPage) {
      case "alcohol":
        response = await axios.get(`${API}/drinks/alcohols`);
        break;
      case "nonalcohol":
        response = await axios.get(`${API}/drinks/nonalcohols`);
        break;
      default:
        response = await axios.get(`${API}/drinks/ingredient?i=${drinksPage}`);
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
