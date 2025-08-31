import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SongSection from "../components/SongSection";
import Footer from "../components/Footer";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <Hero />
      <SongSection />
      <Footer />
    </div>
  );
};

export default HomePage;
