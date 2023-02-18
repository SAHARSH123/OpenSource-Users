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
  const [error, setError] = useState({ show: false, msg: "" });

  const fetchRemainingRequest = async () => {
    const url = rootUrl + "/rate_limit";
    try {
      const response = await axios.get(url);
      const remaining = response?.data?.rate?.remaining;

      setRequest(remaining);
      if (remaining === 0) {
        setError({ show: true, msg: "You have excedded the limit!" });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const fetchUser = async (userName) => {
    const baseUrl = rootUrl + "/users/";
    const userUrl = baseUrl + userName;
    const followerUrl = userUrl + "/followers";
    setIsLoading(true);
    setError({ show: false, msg: "" });
    try {
      const promises1 = axios.get(userUrl);
      const promise2 = axios.get(followerUrl);

      const [userResponse, followerResponse] = await Promise.allSettled([
        promises1,
        promise2,
      ]);
      const user = userResponse?.value?.data;
      const follower = followerResponse?.value?.data;
      if (
        userResponse?.status === "fulfilled" &&
        followerResponse?.status === "fulfilled"
      ) {
        setOpenSourceUser(user);
        setFollowers(follower);
      } else {
        setError({ show: true, msg: "User Not found" });
      }

      fetchRemainingRequest();
    } catch (error) {
      setIsLoading(false);
      setError({ show: true, msg: error?.response?.data?.message });
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchRemainingRequest();
  }, []);

  return (
    <OpenSourceContext.Provider
      value={{
        openSourceUser,
        repos,
        followers,
        request,
        error,
        fetchUser,
        loading,
      }}>
      {props.children}
    </OpenSourceContext.Provider>
  );
}

export default OpenSourceContextProvider;
