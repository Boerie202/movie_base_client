import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'


import './movie-view.scss';

export class MovieView extends React.Component {


    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <Link to={`/genre/${movie.Genre.Name}`}>
                        <button variant='link'>{movie.Genre.Name}</button>
                    </Link>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <Link to={`/director/${movie.Director.Name}`}>
                        <button variant='link' >{movie.Director.Name}</button>
                    </Link>
                </div>

                <button onClick={() => { onBackClick(null); }}>Back</button>
                <button id="movie-view-button" onClick={() => { FavoriteMovies }}>Add to favorites</button>
            </div >
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired
        }),
        Actors: PropTypes.array,
        ImagePath: PropTypes.string.isRequired
    }).isRequired, onBackClick: PropTypes.func.isRequired
};