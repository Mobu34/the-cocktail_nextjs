import "../styles/globals.css";
import "../styles/Header.css";
import "../styles/Home.css";
import "../styles/CarouselItem.css";

import Header from "../components/Header";

const MyApp = ({ Component, pageProps }) => {
  const API = "http://localhost:3000";
  return (
    <div className="App">
      <Header />
      <Component {...pageProps} API={API} />
    </div>
  );
};

export default MyApp;
