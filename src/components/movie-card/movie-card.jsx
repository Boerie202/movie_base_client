import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './movie-card.scss';



export class MovieCard extends React.Component {

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
        const { movie } = this.props;


        <button id="logout-button" onClick={() => { this.onLoggedOut() }}>Logout</button>
        return (
            <Card className='movie-cards'>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="link">Open</Button>
                    </Link>
                </Card.Body>
            </Card>

        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string
    })
};