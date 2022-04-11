import React from 'react';
import axios from 'axios';//Axios should be imported
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Row, Col, Container } from 'react-bootstrap'




export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],// set to an empty array to be fetched using axios library
            selectedMovie: null,
            user: null,
            register: false
        }
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username,
            register: false
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    //When a user is able to successfully register
    onRegistration(register) {
        this.setState({ register, });
    }

    componentDidMount() {
        if (this.state.user) {
            axios.get('https://movie-base-og.herokuapp.com/movies')
                .then(response => {
                    this.setState({
                        movies: response.data
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    getMovies(token) {
        axios.get('https://movie-base-og.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { movies, selectedMovie, user, register } = this.state;

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (!user && !register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)} />);


        if (movies.length === 0) return <div className="main-view" />;


        return (
            //TODO : see later 
            <Container>
                <Row className="main-view justify-content-md-center">

                    {selectedMovie
                        ? (
                            <Col md={8}>
                                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                            </Col>
                        )
                        : movies.map(movie => (
                            <Col md={3}>
                                <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        );
    }
}

