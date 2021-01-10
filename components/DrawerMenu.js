import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import IngredientItem from "./IngredientItem";

const DrawerMenu = ({
  isDrawerMenuOpen,
  setIsDrawerMenuOpen,
  ingredients,
  setIngredients,
}) => {
  const router = useRouter();

  const handleCloseClick = () => {
    setIsDrawerMenuOpen(false);
    setIngredients([]);
  };

  const handleAllDrinksClick = (name) => {
    router.push(`/drinks/${name}`);
    setIsDrawerMenuOpen(false);
    setIngredients([]);
  };

  const getAllIngredients = async () => {
    if (ingredients.length === 0) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/ingredients"
        );

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
        <FontAwesomeIcon icon="times" />
        <div className="DrawerMenu-close-icon" onClick={handleCloseClick}></div>
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
        <div className="DrawerMenu-btn">Cocktails favoris</div>
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
              />
            );
          })}
        </div>
      )}
    </div>
  ) : (
    <></>
  );
  //   return <div className="DrawerMenu"></div>;
};

export default DrawerMenu;
