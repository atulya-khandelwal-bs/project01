import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchHeader = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/global?populate[header][populate][logo][populate][photo]=true&populate[header][populate][links]=true",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        const data = await response.json();
        setHeaderData(data.data?.header || null);
      } catch (error) {
        console.error("Error fetching header:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeader();
  }, [navigate]);

  if (loading) {
    return (
      <header className="bg-gray-800 text-white py-4 text-center">
        <p className="animate-pulse">Loading header...</p>
      </header>
    );
  }

  if (!headerData) {
    return (
      <header className="bg-gray-800 text-white py-4 text-center">
        <p>No header content found</p>
      </header>
    );
  }

  const logoText = headerData.logo?.text || "App";
  const logoUrl = headerData.logo?.photo?.url
    ? `http://localhost:1337${headerData.logo.photo.url}`
    : headerData.logo?.photo?.url;

  const link = headerData.links?.[0] || { text: "Sign Out", url: "/login" };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate(link.url || "/login");
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={logoUrl}
            alt={logoText}
            className="w-10 h-10 mr-2 object-contain"
          />
          <h1 className="text-xl font-semibold">{logoText}</h1>
        </div>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        >
          {link.text}
        </button>
      </div>
    </header>
  );
}

export default Header;
