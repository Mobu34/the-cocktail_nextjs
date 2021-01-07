import React from "react";
import Link from "next/link";

const IngredientItem = ({ item }) => {
  console.log(item);
  return (
    <Link
      href={`/drinks/${item.strIngredient1}`}
      className="Link IngredientItem"
    >
      {item.strIngredient1}
    </Link>
  );
};

// <Link href={`/post/${post.id}`}>{post.title}</Link>

export default IngredientItem;
