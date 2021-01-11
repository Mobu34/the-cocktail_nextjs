import { useState } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import favoritesReducer from "../reducers/favorites.reducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, favoritesReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

// const store = createStore(favoritesReducer);

import "../styles/globals.css";
import "../styles/Header.css";
import "../styles/Home.css";
import "../styles/CarouselItem.css";
import "../styles/DrawerMenu.css";
import "../styles/IngredientItem.css";
import "../styles/DrinksPage.css";
import "../styles/DrinkItem.css";
import "../styles/DrinkPage.css";
import "../styles/SearchResult.css";
import "../styles/Favorites.css";

import Header from "../components/Header";
import DrawerMenu from "../components/DrawerMenu";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faBars, faTimes);

const MyApp = ({ Component, pageProps }) => {
  const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Header
            setIsDrawerMenuOpen={setIsDrawerMenuOpen}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            searchResults={searchResults}
            setSearchInput={setSearchResults}
          />
          <DrawerMenu
            isDrawerMenuOpen={isDrawerMenuOpen}
            setIsDrawerMenuOpen={setIsDrawerMenuOpen}
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
          <Component {...pageProps} setIsDrawerMenuOpen={setIsDrawerMenuOpen} />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
