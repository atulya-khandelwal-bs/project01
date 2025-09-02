import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import config from "../config";

function Footer() {
  const [footerData, setFooterData] = useState(null);
  const { token, signOut } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await fetch(
          `${config.API_URL}/global?populate[footer]=true`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          signOut();
          return;
        }

        const data = await response.json();
        setFooterData(data.data?.footer || null);
      } catch (error) {
        console.error("Error fetching footer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooter();
  }, []);

  if (loading) {
    return (
      <header className="bg-gray-800 text-white py-4 text-center">
        <p className="animate-pulse">Loading footer...</p>
      </header>
    );
  }

  const currentDate = new Date().toLocaleDateString("en-GB");

  return (
    <footer className="bg-gray-900 text-gray-300 py-6 text-center">
      {footerData ? (
        <p>
          © {currentDate} {footerData.text}. {footerData.desc}
        </p>
      ) : (
        <p>No footer found</p>
      )}
    </footer>
  );
}

export default Footer;
