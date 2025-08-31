import React, { useState, useEffect } from 'react';

const SongSection = () => {
    const [songs, setSongs] = useState([]); // All songs
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [loading, setLoading] = useState(true); // Loading state
    const songsPerPage = 10; // Number of songs to show per page

    // Fetch songs from your Strapi backend
    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch('http://localhost:1337/api/home-page');  // Your Strapi API URL
                const data = await response.json();
                setSongs(data); // Store songs in state
            } catch (error) {
                console.error('Error fetching songs:', error);
            } finally {
                setLoading(false); // Hide loading indicator once data is fetched
            }
        };

        fetchSongs();
    }, []); // This effect runs only once when the component is mounted

    // Calculate which songs to display based on currentPage
    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong); // Slice the songs to show only the current page's songs

    // Calculate total pages (round up to the next whole number if necessary)
    const totalPages = Math.ceil(songs.length / songsPerPage);

    // Handle page change when the user clicks "Previous" or "Next"
    const handlePageChange = (page) => {
        setCurrentPage(page); // Update currentPage to the new page
    };

    return (
        <div className="p-6">
            {/* Loading Indicator */}
            {loading ? (
                <div className="text-center text-xl font-bold">Loading...</div>
            ) : (
                <div>
                    {/* Display the list of songs for the current page */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {currentSongs.length > 0 ? (
                            currentSongs.map((song) => (
                                <div key={song.id} className="bg-white p-4 rounded-lg shadow-lg">
                                    <h3 className="text-xl font-semibold">{song.title}</h3>
                                    <p className="text-gray-600">{song.artist}</p>
                                    <p className="text-gray-500">{song.genre}</p>
                                </div>
                            ))
                        ) : (
                            <div>No songs available</div>
                        )}
                    </div>
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-4 mt-6">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-gray-300 px-6 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>

                <span className="text-lg">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 px-6 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SongSection;
