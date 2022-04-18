import React, { useEffect, useCallback, useRef, useState } from "react";
import Header from "./Header";
import Dispatcher from "../pages/Dispatcher";
import Footer from "./Footer";
import Home from "../pages/Home";
import Login from "../pages/Login";


function Page(props) {
  const getHead =()=>{
    switch (props.page) {
      case "triplog":
        return <Header isSticky={isSticky}/>;
      default:
        return <Header isSticky={isSticky}/>;
    } 
  }

  const getPage = () => {
    switch (props.page) {
      case "homepage":
        return <Home />;
      case "login":
        return <Login />;
      case "triplog":
        return <Dispatcher />;
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
      {getHead()}
      <div ref={headerRef} className="container-fluid">
        {getPage()}
      </div>
      {/* <Footer /> */}
    </div>
  );
}
export default Page;
