import MovieCard from "@app/_components/MovieCard";
import { Movie } from "@lib/types";

interface MoviesListProps {
  movies: Movie[];
}

const MoviesList = ({ movies }: MoviesListProps) => (
  <div className="grid grid-cols-3 gap-10 py-10">
    {movies.map((movie) => (
      <MovieCard {...movie} key={movie.id} />
    ))}
  </div>
);

export default MoviesList;
