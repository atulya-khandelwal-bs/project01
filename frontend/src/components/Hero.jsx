import React from "react";

const Hero = () => {
  return (
    <section className="bg-blue-500 text-white text-center py-20">
      <div className="container  mx-auto">
        <h2 className="text-4xl font-bold mb-4"> Welcome to Our Music App</h2>
        <p className="text-lg mb-6">
          Explore songs, artists, and genres from all over the world.
        </p>
        <button className="bg-yellow-500 text-black py-2 px-6 rounded-full">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
