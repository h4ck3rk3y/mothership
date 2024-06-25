// src/components/GoogleAnalytics.js
import ReactGA from "react-ga4";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize("G-Z7QZZSW1WC");
  }, []);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return null;
};

export default GoogleAnalytics;