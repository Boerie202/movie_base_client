import React from 'react';
import axios from 'axios';//Axios should be imported

import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';


import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
//import { MovieCard } from '../movie-card/movie-card'; Removed for now
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavView } from '../nav-view/nav-view';


import { Row, Col, Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";


class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            //movies: [], removed for now
            selectedMovie: null,
            user: null,

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

    // When a user is able to successfully register
    // onRegistration(register) {
    //     this.setState({ register, });
    // }

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

        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
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
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {

        let { movies } = this.props;
        let { user } = this.state;

        return (
            //TODO : see later 
            <Router>
                <Row>
                    <NavView user={user} />
                </Row>
                {/* <Container> */}
                <Row className="main-view justify-content-md-center">

                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;



                        return <MoviesList movies={movies} />;
                    }} />


                    {/* return movies.map(m => (
                             <Col md={4} key={m._id} className='movie-cards'>
                                <MovieCard movie={m} />

                            </Col> */}



                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />


                    <Route exact path="/movies/:movieId" render={({ match, history }) => {

                        return (<Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                        )
                    }} />

                </Row>

                {/* Profile View */}
                <Route exact path="/profile" render={({ history }) => {
                    if (!user) {
                        return (
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                        );
                    }

                    return (
                        <Col md={8}>
                            <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                        </Col>
                    );
                }} />

                {/* Genre View */}

                <Route path="/genre/:name" render={({ match, history }) => {
                    if (!user) {
                        return (
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                        );
                    }

                    if (movies.length === 0) {
                        return <div className="movie-view" />;
                    }

                    return (
                        <Col md={8}>
                            <GenreView
                                genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                                onBackClick={() => history.goBack()}
                                movies={movies.filter(movie => movie.Genre.Name === match.params.name)} />
                        </Col>
                    );
                }} />

                {/* Director View */}
                <Route exact path="/director/:name" render={({ match, history }) => {
                    if (!user) {
                        return (
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                        );
                    }

                    if (movies.length === 0) {
                        return <div className="movie-view" />;
                    }

                    return (
                        <Col md={8}>
                            <DirectorView
                                director={movies.find(m => m.Director.Name === match.params.name).Director}
                                onBackClick={() => history.goBack()}
                                movies={movies.filter(movie => movie.Director.Name === match.params.name)} />
                        </Col>
                    );
                }} />


                <Route path={`/users/${user}`} render={({ history }) => {
                    if (!user)
                        return <Redirect to="/" />
                    return <Col>
                        <ProfileView user={user}
                            onBackClick={() => history.goBack()} />
                    </Col>
                }} />
                <Row>
                    <button id="logout-button" onClick={() => { this.onLoggedOut() }}>Logout</button>
                </Row>
                {/* </Container> */}
            </Router>
        );
    }
}

let mapStateToProps = state => {
    return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);