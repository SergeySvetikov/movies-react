import { Movie } from "./Movie";
import { MoviesProps } from '../types/Movies'
import React from "react";

function Movies(props: MoviesProps) {
  const { movies = []} = props;
  return (
    <div className="movies">
      {movies.length ? movies.map(movie => (
        <Movie key={movie.imdbID} {...movie} />
      )) : <h4>С таким названием ничего не найдено</h4>
      }
    </div>
  )
}

export { Movies }
