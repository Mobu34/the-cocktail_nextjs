import React from "react";
import { useRouter } from "next/router";

const IngredientItem = ({ item, setIsDrawerMenuOpen, setIngredients }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/drinks/${item.strIngredient1}`);
    setIsDrawerMenuOpen(false);
    setIngredients([]);
  };

  return (
    <div className="Link IngredientItem" onClick={handleClick}>
      {item.strIngredient1}
    </div>
  );
};

export default IngredientItem;
