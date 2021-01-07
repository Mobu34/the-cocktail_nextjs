import Head from "next/head";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Title from "../components/Title";
import CarouselItem from "../components/CarouselItem";

const Home = ({ API, setIsDrawerMenuOpen, alcohols, nonalcohols }) => {
  const getRandomDrinks = (type) => {
    const drinks = [];

    for (let i = 0; i < 10; i++) {
      const random = Math.floor(Math.random() * type.drinks.length);
      if (drinks.indexOf(alcohols.drinks[i]) === -1) {
        drinks.push(alcohols.drinks[random]);
      }
    }
    return drinks;
  };

  return (
    <div
      className="Home"
      onClick={() => {
        setIsDrawerMenuOpen(false);
      }}
    >
      <Head>
        <title>The Cocktail - Welcome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {alcohols && (
        <div className="Home-first-container">
          <div className="wrapper">
            <Title title="Faites vous plaisir notre sélection de cocktails alcoolisés ..." />
          </div>
          <div className="Home-carousel-container">
            <div className="wrapper">
              <div className="Home-carousel-subcontainer">
                <CarouselItem
                  getRandomDrinks={getRandomDrinks}
                  drinkType={alcohols}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {alcohols && (
        <div className="Home-second-container">
          <div className="wrapper">
            <Title title="Mais aussi sans alcool ..." />
          </div>
          <div className="Home-carousel-container">
            <div className="wrapper">
              <div className="Home-carousel-subcontainer">
                <CarouselItem
                  getRandomDrinks={getRandomDrinks}
                  drinkType={nonalcohols}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  console.log(context);
  return {
    props: {
      alcohols: await fetchData("alcohols"),
      nonalcohols: await fetchData("nonalcohols"),
    },
  };
};

const fetchData = async (type) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/drinks/${type}`
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
