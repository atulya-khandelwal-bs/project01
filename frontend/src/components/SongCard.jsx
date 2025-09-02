import { motion } from "framer-motion";

const SongCard = ({ song, index, onPlay }) => {
  const musicFiles = Array.isArray(song.music)
    ? song.music
    : song.music
    ? [song.music]
    : [];

  return (
    <motion.div
      className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl hover:scale-105 hover:rotate-1 transition-all duration-300 flex flex-col justify-between"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.05 }}
    >
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

      <div className="mt-4">
        {musicFiles.length > 0 ? (
          musicFiles.map((file) => (
            <audio
              key={file.id}
              controls
              className="mt-3 w-full rounded-lg shadow-inner"
              onPlay={(e) => onPlay(song.id, e.currentTarget)}
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
};

export default SongCard;
