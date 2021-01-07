import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ setIsDrawerMenuOpen }) => {
  return (
    <header>
      <div className="wrapper Header-container">
        {/* <FontAwesomeIcon
          icon="bars"
          size={24}
          onClick={() => {
            setDrawerMenuOpen(true);
          }}
        /> */}
        <div
          onClick={() => {
            setIsDrawerMenuOpen(true);
          }}
        >
          ICON
        </div>
        <h1>The Cocktail</h1>
        <div></div>
      </div>
    </header>
  );
};

export default Header;
