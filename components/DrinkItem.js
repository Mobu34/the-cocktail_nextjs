import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";

const DrinkItem = ({ item }) => {
  const [details, setDetails] = useState([]);

  const router = useRouter();

  const handleMouseEnter = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/drink?id=${item.idDrink}`
      );

      if (response.status === 200) {
        const ingredients = [];
        for (let i = 1; i <= 5; i++) {
          let ingredient = "strIngredient" + i;
          if (response.data.drinks[0][ingredient]) {
            ingredients.push(response.data.drinks[0][ingredient]);
          } else {
            break;
          }
        }
        setDetails(ingredients);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="DrinkItem"
      onClick={() => router.push(`/drink/${item.idDrink}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setDetails([])}
    >
      <div className="DrinkItem-img-container">
        {item.strDrinkThumb ? (
          <img
            className="DrinkItem-img"
            src={item.strDrinkThumb}
            alt={item.strDrink}
          />
        ) : (
          <div className="DrinkItem-noimg">No picture found</div>
        )}
        {details.length > 0 && (
          <div className="DrinkItem-ingredients-container">
            {details.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </div>
        )}
      </div>
      <p className="DrinkItem-name">{item.strDrink}</p>
    </div>
  );
};

export default DrinkItem;
