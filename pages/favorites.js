import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import DrinkItem from "../components/DrinkItem";

const Favorites = () => {
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
    <div className="Favorites">
      <div className="wrapper">
        <div className="Favorites-container">
          {alcohols.length > 0 ? (
            <>
              <h2>Vos alcools</h2>
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
            "Pas encore d'alcools"
          )}
        </div>
        <div className="Favorites-container">
          {nonalcohols.length > 0 ? (
            <>
              <h2>Vos sans alcools</h2>
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
            "Pas encore de soft"
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
