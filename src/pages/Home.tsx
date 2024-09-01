import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import OptionRow from "../components/OptionRow";
import WeServe from "../components/WeServe";
import Popular from "../components/Popular";
import WhyUs from "../components/WhyUs";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="bg-[#fcfcfc] font-serif">
      <Navbar current={"home"} />
      <Header />
      <OptionRow />
      <WeServe />
      <Popular />
      <WhyUs />
      <Footer />
    </div>
  );
}

export default Home;
