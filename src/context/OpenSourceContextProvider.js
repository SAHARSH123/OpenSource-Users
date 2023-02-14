import React, { useState } from "react";
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
  return (
    <OpenSourceContext.Provider value={{ openSourceUser, repos, followers }}>
      {props.children}
    </OpenSourceContext.Provider>
  );
}

export default OpenSourceContextProvider;
