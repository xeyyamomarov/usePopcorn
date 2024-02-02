import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import StarRating from "../../../StarRating/StarRating";
import Loader from "../../../Loader";
import { useKey } from "../../../customHooks/useKey";

const MovieDetails = ({
  selectedId,
  onCloseMovie,
  KEY,
  handleAddMovied,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  // const [avgRating,setAvgRating] = useState(0)

  const countRef = useRef(0)

  const isWathced = watched.map((movie) => movie.imdbID).includes(selectedId);

  const movieRated = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;


  useEffect(()=>{
    if(userRating){
       countRef.current++;
      console.log(countRef.current,"curr")
    }
  },[userRating])

  //   useEffect(
  //     function () {
  //       async function getMovieDetails() {
  //         // setIsLoading(true);
  //         const res = await fetch(
  //           `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
  //         );
  //         const data = await res.json();
  //         setMovie(data);
  //         // setIsLoading(false);
  //       }
  //       getMovieDetails();
  //     },
  //     [selectedId]
  //   );

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return () => {
      document.title = "UsePopcorn";
    };
  }, [title]);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        setMovie(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [selectedId]);

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDesicions:countRef.current
    };

    handleAddMovied(newWatchedMovie);
    onCloseMovie();
  };

  useKey("Escape",onCloseMovie)

  // useEffect(() => {
  //   function callback(e) {
  //     if (e.code === "Escape") {
  //       onCloseMovie();
  //     }
  //   }
  //   document.addEventListener("keydown", callback);
  //   return () => {
  //     document.removeEventListener("keydown", callback);
  //   };
  // }, [onCloseMovie]);
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={` Poster  of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          {/* <p>{avgRating}</p> */}

          <section>
            <div className="rating">
              {!isWathced ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {movieRated} <span>⭐️</span>{" "}
                </p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}

      {/* {selectedId} */}
    </div>
  );
};

export default MovieDetails;
