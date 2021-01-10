import React from "react";
import Link from "next/link";
import { Router, useRouter } from "next/router";

const IngredientItem = ({ item, setIsDrawerMenuOpen }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/drinks/${item.strIngredient1}`);
    setIsDrawerMenuOpen(false);
  };

  return (
    <div className="Link IngredientItem" onClick={handleClick}>
      {item.strIngredient1}
    </div>
  );
};

export default IngredientItem;
