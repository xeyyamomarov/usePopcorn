import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import NumResults from "./components/Navbar/NumResults";
import Box from "./components/Main/components/ListBox/ListBox";
import MovieList from "./components/Main/components/ListBox/MovieList";
import WatchedSummary from "./components/Main/components/WatchedBox/WatchedSummary";
import WatchedMoviesList from "./components/Main/components/WatchedBox/WatchedMoviesList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import Search from "./components/Navbar/Search";
import MovieDetails from "./components/Main/components/WatchedBox/MovieDetails";
import { useMovies } from "./components/customHooks/useMovies";
import { useLocalStorageState } from "./components/customHooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // const [watched, setWatched] = useState([]);
  // const [watched, setWatched] = useState(() => {
  //   const localData = localStorage.getItem("movied");
  //   return JSON.parse(localData);
  // });

  // 

  const { movies, loading, error } = useMovies(query);

  const KEY = "3684ea02";

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function onCloseMovie() {
    setSelectedId(null);
  }

  function handleAddMovied(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteMovied(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // useEffect(() => {
  //   localStorage.setItem("movied", JSON.stringify(watched));
  // }, [watched]);

  // useEffect(()=>{
  //   JSON.parse(localStorage.getItem("movied"))
  // },[])

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {!loading && !error && (
            <MovieList
              movies={movies}
              handleSelectedMovie={handleSelectedMovie}
            />
          )}
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={onCloseMovie}
              handleAddMovied={handleAddMovied}
              KEY={KEY}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteMovied}
              />
            </>
          )}
        </Box>
      </Main>

      {/* <StarRating
        maxRating={5}
        messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      /> */}
    </>
  );
}
