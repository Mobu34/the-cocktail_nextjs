import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import axios from "axios";

import SearchResult from "../components/SearchResult";

const Header = ({
  setIsDrawerMenuOpen,
  // searchInput,
  // setSearchInput,
  // searchResults,
  // setSearchResults,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

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
        <FontAwesomeIcon
          icon="bars"
          size={30}
          color="#ddb9ba"
          onClick={() => {
            setIsDrawerMenuOpen(true);
          }}
        />
        {/* <div
          onClick={() => {
            setIsDrawerMenuOpen(true);
          }}
        >
          ICON
        </div> */}
        <h1 onClick={() => router.push("/")}>The Cocktail</h1>
        <div className="Header-search-container">
          <input
            className="Header-search-input"
            id="search"
            name="search"
            onChange={(e) => handleChange(e)}
            value={searchInput}
            placeholder="ex: Mojito"
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
