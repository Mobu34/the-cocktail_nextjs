import React from "react";
import { useRouter } from "next/router";

const SearchResult = ({ item, setSearchInput, setSearchResults }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/drink/${item.idDrink}`);
    setSearchInput("");
    setSearchResults([]);
  };

  //   router.push(`/drink/${item.strDrink}`);
  return (
    <div className="SearchResult" onClick={handleClick}>
      {item.strDrink}
    </div>
  );
};

export default SearchResult;
