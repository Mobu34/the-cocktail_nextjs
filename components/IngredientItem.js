import React from "react";
import { useRouter } from "next/router";

import { closeDrawerMenu } from "../functions/closeDrawerMenu";

// component used to display each ingredient in the drawer menu
const IngredientItem = ({ item, setIsDrawerMenuOpen, setIngredients }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/drinks/${item.strIngredient1}`);
    closeDrawerMenu(setIsDrawerMenuOpen, setIngredients);
  };

  return (
    <div className="Link IngredientItem" onClick={handleClick}>
      {item.strIngredient1}
    </div>
  );
};

export default IngredientItem;
