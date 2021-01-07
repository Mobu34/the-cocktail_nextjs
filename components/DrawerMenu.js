import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import IngredientItem from "./IngredientItem";

const DrawerMenu = ({ isDrawerMenuOpen, setIsDrawerMenuOpen }) => {
  const [ingredients, setIngredients] = useState([]);

  const router = useRouter();

  const handleClick = (name) => {
    router.push(`/drinks/${name}`);
    setIsDrawerMenuOpen(false);
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
        <div
          className="DrawerMenu-close-icon"
          onClick={() => setIsDrawerMenuOpen(false)}
        ></div>
      </div>
      <div className="DrawerMenu-btn-container">
        <div className="DrawerMenu-btn" onClick={() => handleClick("alcohol")}>
          Cocktails alcoolisés
        </div>
        <div
          className="DrawerMenu-btn"
          onClick={() => handleClick("nonalcohol")}
        >
          Cocktails sans alcool
        </div>
        <div className="DrawerMenu-btn" onClick={() => handleClick("favorite")}>
          Cocktails favoris
        </div>
        <div className="DrawerMenu-btn" onClick={getAllIngredients}>
          Ingrédients
        </div>
      </div>
      {ingredients && (
        <div className="DrawerMenu-ingredient-container">
          {ingredients.map((ingredient, index) => {
            return <IngredientItem key={index} item={ingredient} />;
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
