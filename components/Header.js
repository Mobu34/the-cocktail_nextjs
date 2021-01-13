import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import axios from "axios";

import SearchResult from "../components/SearchResult";

import { getApi } from "../functions/api";
import { closeDrawerMenu } from "../functions/closeDrawerMenu";

const Header = ({ setIsDrawerMenuOpen, setIngredients }) => {
  const API = getApi();

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [headerSize, setHeaderSize] = useState(60);

  const router = useRouter();

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      setHeaderSize(20);
    } else {
      setHeaderSize(60);
    }
  });

  const handleBackHomeClick = () => {
    router.push("/");
    closeDrawerMenu(setIsDrawerMenuOpen, setIngredients);
  };

  const handleChange = async (e) => {
    setSearchInput(e.target.value);
    if (e.target.value.length > 1) {
      try {
        const response = await axios.get(
          `${API}/drinks/search?s=${e.target.value}`
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
          <h1
            style={{ fontSize: headerSize }}
            className="Header-title"
            onClick={handleBackHomeClick}
          >
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
