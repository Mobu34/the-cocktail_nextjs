import axios from "axios";
import React from "react";

const DrinkPage = ({ data }) => {
  const ingredients = [];
  let i = 1;
  while (data) {
    let ingredient = "strIngredient" + i;
    if (data[0][ingredient]) {
      ingredients.push(data[0][ingredient]);
      i++;
    } else {
      break;
    }
  }

  return (
    <div className="DrinkPage">
      <div className="DrinkPage-wrapper">
        <h2>{data[0].strDrink}</h2>
        <div className="DrinkPage-container">
          <div className="DrinkPage-left-container">
            <div className="DrinkPage-bgc"></div>
            <img src={data[0].strDrinkThumb} className="DrinkPage-img" />
          </div>
          <div className="DrinkPage-right-container">
            <div className="DrinkPage-right-subcontainer">
              <h5>Ingredients</h5>
              <ul className="DrinkPage-ingredients">
                {ingredients.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
              <h5>Instructions</h5>
              <p>{data[0].strInstructions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkPage;

export const getServerSideProps = async (context) => {
  try {
    const { drinkId } = context.query;
    const response = await axios.get(
      `http://localhost:3000/api/drink?id=${drinkId}`
    );

    return {
      props: {
        data: response.data.drinks,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
