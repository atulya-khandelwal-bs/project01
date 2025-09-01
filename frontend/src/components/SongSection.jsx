import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SongSection = () => {
  const [songs, setSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const songsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchSongs = async () => {
      setLoading(true);
      try {
        const q = searchQuery.trim();
        let url =
          `http://localhost:1337/api/songs` +
          `?pagination[page]=${currentPage}` +
          `&pagination[pageSize]=${songsPerPage}` +
          `&populate=music`;

        if (q) {
          url +=
            `&filters[$or][0][name][$containsi]=${encodeURIComponent(q)}` +
            `&filters[$or][1][singer][$containsi]=${encodeURIComponent(q)}`;
        }

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        const data = await response.json();
        setSongs(data.data || []);
        setTotalPages(data.meta?.pagination?.pageCount || 1);
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [currentPage, searchQuery, navigate]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePlay = async (songId, currentEl) => {
    document.querySelectorAll("audio").forEach((a) => {
      if (a !== currentEl && !a.paused) a.pause();
    });

    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:1337/api/songs/${songId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: { isPlayed: true } }),
      });
    } catch (error) {
      console.error("Error updating isPlayed:", error);
    }
  };

  return (
    <div className="p-10 bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen text-white">
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by song name or artist..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full max-w-md px-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Loader */}
      {loading ? (
        <div className="text-center text-3xl font-extrabold animate-pulse">
          Loading songs...
        </div>
      ) : (
        <div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {songs.length > 0 ? (
              songs.map((song, index) => {
                const musicFiles = Array.isArray(song.music)
                  ? song.music
                  : song.music
                  ? [song.music]
                  : [];

                return (
                  <motion.div
                    key={song.id}
                    className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl hover:scale-105 hover:rotate-1 transition-all duration-300 flex flex-col justify-between"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {/* Song info */}
                    <div>
                      <h3 className="text-2xl font-bold text-white drop-shadow">
                        {song.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-3 py-1 bg-gray-700 rounded-full text-xs">
                          {song.singer}
                        </span>
                        <span className="px-3 py-1 border border-pink-400 text-pink-400 rounded-full text-xs">
                          {song.genre}
                        </span>
                      </div>
                      <p className="text-gray-300 mt-3 text-sm line-clamp-3">
                        {song.description}
                      </p>
                    </div>

                    {/* Music player */}
                    <div className="mt-4">
                      {musicFiles.length > 0 ? (
                        musicFiles.map((file) => (
                          <audio
                            key={file.id}
                            controls
                            className="mt-3 w-full rounded-lg shadow-inner"
                            onPlay={(e) => handlePlay(song.id, e.currentTarget)}
                          >
                            <source
                              src={`http://localhost:1337${file.url}`}
                              type={file.mime || "audio/mpeg"}
                            />
                            Your browser does not support the audio element.
                          </audio>
                        ))
                      ) : (
                        <p className="text-red-400 mt-3">No music file</p>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full text-center text-xl">
                No songs found
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-xl shadow-lg hover:opacity-90 disabled:opacity-40"
        >
          ⬅ Prev
        </button>

        <span className="text-xl font-bold">
          Page {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gradient-to-r from-pink-500 to-red-600 text-white px-6 py-2 rounded-xl shadow-lg hover:opacity-90 disabled:opacity-40"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default SongSection;
