import React from "react";
import Header from "../components/Header"; // Make sure to import the Header component
import Hero from "../components/Hero"; // Import the Hero section
import SongSection from "../components/SongSection"; // Import the SongSection
import Footer from "../components/Footer"; // Import the Footer

const HomePage = () => {
  return (
    <div>
      <Header /> {/* Header with logo and sign-out button */}
      <Hero /> {/* Hero section with a banner */}
      <SongSection /> {/* Song section with the list of songs and pagination */}
      <Footer /> {/* Footer with current date and app info */}
    </div>
  );
};

export default HomePage;
