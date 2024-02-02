import axios from "axios";
import { useEffect, useState } from "react";

const KEY = "3684ea02";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${KEY}&s="${query}`,
          { signal: controller.signal }
        );

        if (response.data.Response === "False") {
          throw new Error("Movie not found");
        }
        setMovies(response.data.Search);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    // onCloseMovie();

    fetchData();
    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, loading, error };
}
