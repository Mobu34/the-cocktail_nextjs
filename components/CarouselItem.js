import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRouter } from "next/router";

// this component is used for the carousel on the home page
const CarouselItem = ({ data }) => {
  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/drink/${id}`); // redirect to the page of the cocktail when we click on the carousel
  };

  return (
    <Carousel className="CarouselItem" autoPlay>
      {data.map((drink) => {
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
