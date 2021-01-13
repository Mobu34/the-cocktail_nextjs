import React, { useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";

import DrinkItem from "../components/DrinkItem";

import { closeDrawerMenu } from "../functions/closeDrawerMenu";

const Favorites = ({ setIsDrawerMenuOpen, setIngredients }) => {
  const [alcohols, setAlcohols] = useState([]);
  const [nonalcohols, setNonalcohols] = useState([]);

  const favorites = useSelector((state) => {
    if (alcohols.length !== state.favoritesAlcohol.length) {
      setAlcohols(state.favoritesAlcohol);
    }
    if (nonalcohols.length !== state.favoritesNonalcohol.length) {
      setNonalcohols(state.favoritesNonalcohol);
    }
  });

  return (
    <>
      <Head>
        <title>The Cocktail - Coups de coeur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="Favorites"
        onClick={() => closeDrawerMenu(setIsDrawerMenuOpen, setIngredients)}
      >
        <div className="wrapper">
          <div className="Favorites-container">
            {alcohols.length > 0 ? (
              <>
                <h2>Vos coups de coeur alcoolisés</h2>
                <div className="Favorites-carousel-container">
                  {alcohols.map((item) => {
                    return (
                      <DrinkItem
                        key={item.idDrink}
                        item={item}
                        isFavorite={true}
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              "Pas encore d'alcool coup de coeur"
            )}
          </div>
          <div className="Favorites-container">
            {nonalcohols.length > 0 ? (
              <>
                <h2>Vos coups de coeur sans alcool</h2>
                <div className="Favorites-carousel-container">
                  {nonalcohols.map((item) => {
                    return (
                      <DrinkItem
                        key={item.idDrink}
                        item={item}
                        isFavorite={true}
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              "Pas encore de soft coup de coeur"
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
