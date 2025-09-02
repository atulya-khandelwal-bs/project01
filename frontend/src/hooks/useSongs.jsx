// src/hooks/useSongs.js
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import config from "../config";

export const useSongs = (songsPerPage = 10) => {
  const [songs, setSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { token, signOut } = useAuth();

  const fetchSongs = useCallback(async () => {
    setLoading(true);
    try {
      const q = searchQuery.trim();
      let url =
        `${config.API_URL}/songs` +
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
        signOut();
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
  }, [currentPage, searchQuery, songsPerPage, token, signOut]);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return {
    songs,
    loading,
    currentPage,
    totalPages,
    searchQuery,
    setSearchQuery,
    setCurrentPage,
  };
};
