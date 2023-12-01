import React, { createContext, useState, useContext } from "react";

const SpotifyContext = createContext();

export const useSpotify = () => useContext(SpotifyContext);

export const SpotifyProvider = ({ children }) => {
  const [spotifyData, setSpotifyData] = useState({
    token: "",
    photo: "",
    url: "",
  });

  return (
    <SpotifyContext.Provider value={{ spotifyData, setSpotifyData }}>
      {children}
    </SpotifyContext.Provider>
  );
};
