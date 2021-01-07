import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRouter } from "next/router";

const CarouselItem = ({ getRandomDrinks, drinkType }) => {
  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/drink/${id}`);
    // console.log("clicked");
  };
  return (
    <Carousel className="CarouselItem" autoPlay>
      {getRandomDrinks(drinkType).map((drink) => {
        return (
          <div
            key={drink.idDrink}
            className="CarouselItem-container"
            onClick={() => handleClick(drink.idDrink)}
          >
            <img src={drink.strDrinkThumb} className="CarouselItem-img" />
            <div className="CarouselItem-drinkname">{drink.strDrink}</div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarouselItem;
