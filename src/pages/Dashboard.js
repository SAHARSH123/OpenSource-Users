import React, { useContext } from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import OpenSourceContext, { GithubContext } from "../context/context";
const Dashboard = () => {
  const { loading } = useContext(OpenSourceContext);
  return (
    <main>
      <Navbar />
      <Search />
      {loading === true && (
        <img src={loadingImage} alt="loading" className="loading-img" />
      )}
      {loading === false && <Info />}
      {loading === false && <User />}
      {/* <Repos /> */}
    </main>
  );
};

export default Dashboard;
