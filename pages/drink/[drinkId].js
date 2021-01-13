import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";

import { closeDrawerMenu } from "../../functions/closeDrawerMenu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// component used as a page, it is used to display a specific drink with its details
const DrinkPage = ({ data, setIsDrawerMenuOpen, setIngredients }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const favorites = useSelector((state) => {
    // this is to get the favorites and add a heart icon if the cocktail is in favorites
    const favsArray =
      data[0].strAlcoholic === "Alcoholic"
        ? state.favoritesAlcohol
        : state.favoritesNonalcohol;
    for (let i = 0; i <= favsArray.length; i++) {
      if (i === favsArray.length) {
        if (isFavorite) {
          setIsFavorite(false);
        }
        break;
      } else if (data[0].idDrink === favsArray[i].idDrink) {
        if (!isFavorite) {
          setIsFavorite(true);
        }
        break;
      }
    }
  });

  const dispatch = useDispatch();

  // here we push all ingredients of the drink in a array to display them
  const ingredients = [];
  let i = 1;
  while (data) {
    let ingredient = "strIngredient" + i;
    if (data[0][ingredient]) {
      ingredients.push(data[0][ingredient]);
      i++;
    } else {
      break;
    }
  }

  // function used to push/remove the drink into/from favorites
  const handleClick = () => {
    const type =
      data[0].strAlcoholic === "Alcoholic"
        ? "TOGGLE_FAVORITES_ALCOHOLIC"
        : "TOGGLE_FAVORITES_NONALCOHOLIC";
    dispatch({ type, value: data[0] });
  };

  return (
    <>
      <Head>
        <title>The Cocktail - {data[0].strDrink}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="DrinkPage"
        onClick={() => closeDrawerMenu(setIsDrawerMenuOpen, setIngredients)}
      >
        <div className="DrinkPage-wrapper">
          <h2>{data[0].strDrink}</h2>
          <div className="DrinkPage-container">
            <div className="DrinkPage-left-container">
              <div className="DrinkPage-bgc"></div>
              <img src={data[0].strDrinkThumb} className="DrinkPage-img" />
            </div>
            <div className="DrinkPage-right-container">
              <div className="DrinkPage-right-subcontainer">
                <h5>Ingredients</h5>
                <ul className="DrinkPage-ingredients">
                  {ingredients.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ul>
                <h5>Instructions</h5>
                <p>{data[0].strInstructions}</p>
                {isFavorite ? (
                  <div
                    className={`DrinkPage-favs ${isFavorite ? "del" : "add"}`}
                    onClick={handleClick}
                  >
                    Supprimer des coups de coeur
                    <FontAwesomeIcon
                      icon={["fas", "heart"]}
                      size="1x"
                      color="#ddb9ba"
                    />
                  </div>
                ) : (
                  <div
                    className={`DrinkPage-favs ${isFavorite ? "del" : "add"}`}
                    onClick={handleClick}
                  >
                    Ajouter aux coups de coeur
                    <FontAwesomeIcon
                      icon={["fas", "heart"]}
                      size="1x"
                      color="#fff"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrinkPage;

import { getApi } from "../../functions/api";

export const getServerSideProps = async (context) => {
  const API = getApi();
  try {
    const { drinkId } = context.query;
    const response = await axios.get(`${API}/drink?id=${drinkId}`);

    return {
      props: {
        data: response.data.drinks,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
