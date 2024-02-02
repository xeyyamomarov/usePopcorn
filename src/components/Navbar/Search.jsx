import React, { useEffect, useRef } from "react";
import { useKey } from "../customHooks/useKey";

const Search = ({ query, setQuery }) => {
  const ref = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === ref.current) return;
    ref.current.focus();
    setQuery("");
  });

  // useEffect(() => {
  //   function callBack(e) {
  //     if (document.activeElement === ref.current) return;
  //     if (e.code === "Enter") {
  //       ref.current.focus();
  //       setQuery("")
  //     }
  //   }

  //   document.addEventListener("keydown", callBack);
  //   return () => {
  //     document.removeEventListener("keydown", callBack);
  //   };
  // }, [setQuery]);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={ref}
    />
  );
};

export default Search;
