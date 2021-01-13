import Head from "next/head";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Title from "../components/Title";
import CarouselItem from "../components/CarouselItem";

import { closeDrawerMenu } from "../functions/closeDrawerMenu";

// component used as page, is is used to display the home page
const Home = ({
  setIsDrawerMenuOpen,
  setIngredients,
  alcohols,
  nonalcohols,
}) => {
  return (
    <>
      <Head>
        <title>The Cocktail - Welcome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="Home"
        onClick={() => closeDrawerMenu(setIsDrawerMenuOpen, setIngredients)}
      >
        {alcohols && (
          <div className="Home-first-container">
            <div className="wrapper">
              <Title title="Faites vous plaisir avec notre sélection de cocktails alcoolisés ..." />
            </div>
            <div className="Home-carousel-container">
              <div className="wrapper">
                <div className="Home-carousel-subcontainer">
                  <CarouselItem data={alcohols} />
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
                  <CarouselItem data={nonalcohols} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

import { getApi } from "../functions/api";

export const getServerSideProps = async (context) => {
  return {
    props: {
      alcohols: await fetchData("alcohols"),
      nonalcohols: await fetchData("nonalcohols"),
    },
  };
};

const fetchData = async (type) => {
  const API = getApi();
  try {
    const response = await axios.get(`${API}/drinks/${type}`);

    const drinks = [];

    for (let i = 0; i < 10; i++) {
      const random = Math.floor(Math.random() * response.data.drinks.length);
      if (drinks.indexOf(response.data.drinks[i]) === -1) {
        drinks.push(response.data.drinks[random]);
      }
    }

    return drinks;
  } catch (err) {
    console.log(err);
  }
};
