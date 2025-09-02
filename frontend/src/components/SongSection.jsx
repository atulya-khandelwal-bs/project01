import { useSongs } from "../hooks/useSongs";
import SongCard from "./SongCard";

const SongSection = () => {
  const {
    songs,
    loading,
    currentPage,
    totalPages,
    searchQuery,
    setSearchQuery,
    setCurrentPage,
  } = useSongs();

  const handlePlay = async (songId, currentEl) => {
    document.querySelectorAll("audio").forEach((a) => {
      if (a !== currentEl && !a.paused) a.pause();
    });

    try {
      const token = localStorage.getItem("token");
      await fetch(`${config.API_URL}/songs/${songId}`, {
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
      {/* Search bar */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {songs.length > 0 ? (
            songs.map((song, index) => (
              <SongCard
                key={song.id}
                song={song}
                index={index}
                onPlay={handlePlay}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-xl">
              No songs found
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-10">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-xl shadow-lg hover:opacity-90 disabled:opacity-40"
        >
          ⬅ Prev
        </button>

        <span className="text-xl font-bold">
          Page {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
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
