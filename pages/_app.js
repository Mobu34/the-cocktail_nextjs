import { useState } from "react";

import "../styles/globals.css";
import "../styles/Header.css";
import "../styles/Home.css";
import "../styles/CarouselItem.css";
import "../styles/DrawerMenu.css";
import "../styles/IngredientItem.css";
import "../styles/DrinksPage.css";
import "../styles/DrinkItem.css";
import "../styles/DrinkPage.css";

import Header from "../components/Header";
import DrawerMenu from "../components/DrawerMenu";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faBars, faTimes);

const MyApp = ({ Component, pageProps }) => {
  const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  return (
    <div className="App">
      <Header setIsDrawerMenuOpen={setIsDrawerMenuOpen} />
      <DrawerMenu
        isDrawerMenuOpen={isDrawerMenuOpen}
        setIsDrawerMenuOpen={setIsDrawerMenuOpen}
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <Component {...pageProps} setIsDrawerMenuOpen={setIsDrawerMenuOpen} />
    </div>
  );
};

export default MyApp;
