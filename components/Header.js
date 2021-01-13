import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import axios from "axios";

import SearchResult from "../components/SearchResult";

import { closeDrawerMenu } from "../functions/closeDrawerMenu";

const Header = ({
  setIsDrawerMenuOpen,
  setIngredients,
  // searchInput,
  // setSearchInput,
  // searchResults,
  // setSearchResults,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  const handleBackHomeClick = () => {
    router.push("/");
    closeDrawerMenu(setIsDrawerMenuOpen, setIngredients);
  };

  const handleChange = async (e) => {
    setSearchInput(e.target.value);
    if (e.target.value.length > 1) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/drinks/search?s=${e.target.value}`
        );
        console.log(response.data.drinks);
        if (response.status === 200 && response.data.drinks) {
          setSearchResults(response.data.drinks);
        } else if (!response.data.drinks && searchResults.length > 0) {
          setSearchResults([]);
        }
      } catch (err) {
        console.log();
      }
    } else if (searchResults.length > 0) {
      setSearchResults([]);
    }
  };

  return (
    <header>
      <div className="wrapper Header-container">
        <div className="Header-drawermenu-icon-container">
          <FontAwesomeIcon
            icon="bars"
            size={30}
            color="#ddb9ba"
            onClick={() => {
              setIsDrawerMenuOpen(true);
            }}
            className="Header-drawermenu-icon"
          />
        </div>

        <div>
          <h1 className="Header-title" onClick={handleBackHomeClick}>
            The Cocktail
          </h1>
        </div>
        <div className="Header-search-container">
          <input
            className="Header-search-input"
            id="search"
            name="search"
            onChange={(e) => handleChange(e)}
            value={searchInput}
            placeholder="ex: Mojito"
            onFocus={() => closeDrawerMenu(setIsDrawerMenuOpen, setIngredients)}
          />
          {searchResults.length > 0 && (
            <div className="Header-search-result-container">
              {searchResults.map((item) => {
                console.log(item);
                return (
                  <SearchResult
                    key={item.idDrink}
                    item={item}
                    setSearchInput={setSearchInput}
                    setSearchResults={setSearchResults}
                  />
                );
                // console.log(item);
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
