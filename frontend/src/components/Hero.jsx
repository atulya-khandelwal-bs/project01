import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [heroContent, setHeroContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🔑 If no token, redirect immediately
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchHeroContent = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/home-page?populate[HeroSection]=true",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 🔑 Handle unauthorized
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        const data = await response.json();
        setHeroContent(data.data?.HeroSection || null);
      } catch (error) {
        console.error("Error fetching Hero Section:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroContent();
  }, [navigate]);

  if (loading) {
    return (
      <section className="bg-blue-500 text-white text-center py-20">
        <h2 className="text-3xl animate-pulse">Loading...</h2>
      </section>
    );
  }

  if (!heroContent) {
    return (
      <section className="bg-blue-500 text-white text-center py-20">
        <h2 className="text-3xl">No Hero Section Found</h2>
      </section>
    );
  }

  return (
    <section className="bg-blue-500 text-white text-center py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-4">{heroContent.heading}</h2>
        <p className="text-lg mb-6">{heroContent.subHeading}</p>
        <button className="bg-yellow-500 text-black py-2 px-6 rounded-full">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
