import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { getApi } from "../functions/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DrinkItem = ({ item, isFavorite }) => {
  const API = getApi();

  const [details, setDetails] = useState([]);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleMouseEnter = async () => {
    try {
      const response = await axios.get(`${API}/drink?id=${item.idDrink}`);

      if (response.status === 200) {
        const ingredients = [];
        for (let i = 1; i <= 5; i++) {
          let ingredient = "strIngredient" + i;
          if (response.data.drinks[0][ingredient]) {
            ingredients.push(response.data.drinks[0][ingredient]);
          } else {
            break;
          }
        }
        setDetails(ingredients);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavoritesClick = (e) => {
    console.log(item);
    e.stopPropagation();
    const type =
      item.strAlcoholic === "Alcoholic"
        ? "TOGGLE_FAVORITES_ALCOHOLIC"
        : "TOGGLE_FAVORITES_NONALCOHOLIC";
    dispatch({ type, value: item });
  };

  return (
    <div
      className="DrinkItem"
      onClick={() => router.push(`/drink/${item.idDrink}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setDetails([])}
    >
      <div className="DrinkItem-img-container">
        {isFavorite ? (
          <FontAwesomeIcon
            className="DrinkItem-fav"
            icon={["fas", "heart"]}
            size="2x"
            color="#ddb9ba"
            onClick={handleFavoritesClick}
          />
        ) : (
          <FontAwesomeIcon
            className="DrinkItem-fav"
            icon={["far", "heart"]}
            size="2x"
            color="#ddb9ba"
          />
        )}
        {item.strDrinkThumb ? (
          <img
            className="DrinkItem-img"
            src={item.strDrinkThumb}
            alt={item.strDrink}
          />
        ) : (
          <div className="DrinkItem-noimg">No picture found</div>
        )}
        {details.length > 0 && (
          <div className="DrinkItem-ingredients-container">
            {details.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </div>
        )}
      </div>
      <p className="DrinkItem-name">{item.strDrink}</p>
    </div>
  );
};

export default DrinkItem;
