import React from "react";
import { useRouter } from "next/router";

// component used to display the results of the search
const SearchResult = ({ item, setSearchInput, setSearchResults }) => {
  const router = useRouter();

  // function triggered when we click on a result
  const handleClick = () => {
    router.push(`/drink/${item.idDrink}`);
    setSearchInput(""); // we empty the input value
    setSearchResults([]); // we empty the results
  };

  return (
    <div className="SearchResult" onClick={handleClick}>
      {item.strDrink}
    </div>
  );
};

export default SearchResult;
