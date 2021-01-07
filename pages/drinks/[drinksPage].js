import React from "react";
import { useRouter } from "next/router";

const DrinksPage = () => {
  const router = useRouter();
  // console.log(router);
  return <div></div>;
};

export default DrinksPage;

export const getServerSideProps = (context) => {
  let type;
  switch (context.query.DrinksPage) {
    case "alcohol":
      type = "alcohol";
      break;
    case "nonalcohol":
      type = "nonalcohol";
    default:
      type = context.query.DrinksPage;
      break;
  }
  return {
    props: {
      data: null,
    },
  };
};
