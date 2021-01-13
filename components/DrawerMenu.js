import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { getApi } from "../functions/api"; // this function is imported to use the API
import { closeDrawerMenu } from "../functions/closeDrawerMenu"; // this function is imported to close the drawer menu

import IngredientItem from "./IngredientItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// this component is used for the left drawer menu
const DrawerMenu = ({
  isDrawerMenuOpen,
  setIsDrawerMenuOpen,
  ingredients,
  setIngredients,
}) => {
  const API = getApi();

  const router = useRouter();

  // this function is triggered when we click alcohol or nonalcohol cocktails
  const handleAllDrinksClick = (name) => {
    router.push(`/drinks/${name}`);
    closeDrawerMenu(setIsDrawerMenuOpen, setIngredients);
  };

  // this function is triggered when we click on favorites
  const handleFavoritesClick = () => {
    router.push("/favorites");
    closeDrawerMenu(setIsDrawerMenuOpen, setIngredients);
  };

  // this function is triggered to display all ingredients
  const getAllIngredients = async () => {
    if (ingredients.length === 0) {
      try {
        const response = await axios.get(`${API}/ingredients`);

        if (response.status === 200) {
          setIngredients(response.data.drinks);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setIngredients([]);
    }
  };

  return isDrawerMenuOpen ? (
    <div className="DrawerMenu">
      <div className="DrawerMenu-header">
        <div></div>
        <h3>Menu</h3>
        <FontAwesomeIcon
          icon="times"
          onClick={() => closeDrawerMenu(setIsDrawerMenuOpen, setIngredients)}
          className="DrawerMenu-close-icon"
        />
      </div>
      <div className="DrawerMenu-btn-container">
        <div
          className="DrawerMenu-btn"
          onClick={() => handleAllDrinksClick("alcohol")}
        >
          Cocktails alcoolisés
        </div>
        <div
          className="DrawerMenu-btn"
          onClick={() => handleAllDrinksClick("nonalcohol")}
        >
          Cocktails sans alcool
        </div>
        <div className="DrawerMenu-btn" onClick={handleFavoritesClick}>
          Coup(s) de coeur
        </div>
        <div className="DrawerMenu-btn" onClick={getAllIngredients}>
          Ingrédients
        </div>
      </div>
      {ingredients && (
        <div className="DrawerMenu-ingredient-container">
          {ingredients.map((ingredient, index) => {
            return (
              <IngredientItem
                key={index}
                item={ingredient}
                setIsDrawerMenuOpen={setIsDrawerMenuOpen}
                setIngredients={setIngredients}
              />
            );
          })}
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default DrawerMenu;
