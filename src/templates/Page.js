import React, { useEffect, useCallback, useRef, useState } from "react";
import Header from "./Header";
import Dispatcher from "../pages/Dispatcher";
import { PubNubProvider } from "pubnub-react";
import PubNub from "pubnub";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Settings from "../pages/account/Profile/Settings";
import { useSelector } from "react-redux";

function Page(props) {
  const { publishkey, subscribekey } = useSelector((state) => {
    return {
      publishkey: state.profile.publishkey,
      subscribekey: state.profile.subscribekey,
    };
  });

  const pubnub = new PubNub({
    subscribeKey:
      subscribekey === null
        ? process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY
        : subscribekey,
    publishKey:
      publishkey === null
        ? process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY
        : publishkey,
  });
  const getHead = () => {
    switch (props.page) {
      case "triplog":
        return <Header isSticky={isSticky} />;
      default:
        return <Header isSticky={isSticky} />;
    }
  };

  const getPage = () => {
    switch (props.page) {
      case "homepage":
        return <Home />;
      case "login":
        return <Login />;
      case "triplog":
        return <Dispatcher />;
      case "account":
        return <Settings />;
      default:
        return <Home />;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.darkHeader(false);
  }, []);

  const headerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  const toggleSticky = useCallback(
    ({ top, bottom }) => {
      if (top <= -80) {
        !isSticky && setIsSticky(true);
      } else {
        isSticky && setIsSticky(false);
      }
    },
    [isSticky]
  );

  useEffect(() => {
    const handleScroll = () => {
      toggleSticky(headerRef.current.getBoundingClientRect());
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toggleSticky]);

  return (
    <div>
      <PubNubProvider client={pubnub}>
        {getHead()}

        <div
          ref={headerRef}
          className={
            props.page === "triplog"
              ? "container-fluid text-black"
              : "container-fluid"
          }
          id={props.page === "triplog" ? "dashboardcs" : null}
        >
          {getPage()}
        </div>
        {/* <Footer /> */}
      </PubNubProvider>
    </div>
  );
}
export default Page;
