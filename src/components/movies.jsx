import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "../components/common/like";
import Pagination from "../components/common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
  };
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handleChangePage = (page) => {
    this.setState({ currentPage: page });
  };
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage } = this.state;
    const movies = paginate(this.state.movies, currentPage, pageSize);
    if (count === 0) return <p>there are no movies is database.</p>;
    return (
      <React.Fragment>
        <p>there are {count} movies in datebase.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Gener</th>
              <th>Stock</th>
              <th>Rate</th>
              <th>Favourite</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title} </td>
                <td>{movie.genre.name} </td>
                <td>{movie.numberInStock} </td>
                <td>{movie.dailyRentalRate} </td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger sm-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          changePage={this.handleChangePage}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
