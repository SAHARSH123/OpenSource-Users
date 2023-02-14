import React, { useState, useEffect } from "react";
import OpenSourceContext from "./context";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

function OpenSourceContextProvider(props) {
  const [openSourceUser, setOpenSourceUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const [loading, setIsLoading] = useState(false);
  const [request, setRequest] = useState(0);

  const fetchRequest = async () => {
    const url = rootUrl + "/rate_limit";
    try {
      const response = await axios.get(url);
      const remaining = response?.data?.rate?.remaining;
      setRequest(remaining);
      if (remaining === 0) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <OpenSourceContext.Provider
      value={{ openSourceUser, repos, followers, request }}>
      {props.children}
    </OpenSourceContext.Provider>
  );
}

export default OpenSourceContextProvider;
