import { useEffect, useState } from "react";

function Footer() {
  const [footerData, setFooterData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/global?populate[footer]=true",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setFooterData(data.data?.footer || null);
      } catch (error) {
        console.error("Error fetching footer:", error);
      }
    };

    fetchFooter();
  }, []);

  const currentDate = new Date().toLocaleDateString("en-GB");
  // format: dd/mm/yyyy

  return (
    <footer className="bg-gray-900 text-gray-300 py-6 text-center">
      {footerData ? (
        <p>
          © {currentDate} {footerData.text}. {footerData.desc}
        </p>
      ) : (
        <p>Loading footer...</p>
      )}
    </footer>
  );
}

export default Footer;
