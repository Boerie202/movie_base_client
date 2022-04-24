import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');



    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');

    // validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 2) {
            setUsernameErr('Username must be at least 2 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 6) {
            setPasswordErr('Password must be at least 6 characters long');
            isReq = false;
        }
        if (!email) {
            setEmailErr('Please enter a email address');
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setEmailErr('Please enter a valid email address');
        }
        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {

            axios.post('https://movie-base-og.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
                })
                .catch(e => {
                    console.log('error registering the user')
                });

        };

        return (
            <Container>
                <Row>
                    <Col>
                        <CardGroup>
                            <Card className="registerCard">
                                <Card.Body>
                                    <Card.Title className="text-center">New User Registration.</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted text-center">Please Register</Card.Subtitle>

                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                                            {usernameErr && <p>{usernameErr}</p>}
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                                            {passwordErr && <p>{passwordErr}</p>}
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                                            {emailErr && <p>{emailErr}</p>}
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Birthday</Form.Label>
                                            <Form.Control className="mb-3" type="date" value={Birthday} onChange={e => setBirthday(e.target.value)} />
                                        </Form.Group>

                                        <Button className="registerButton" variant="secondary" size="lg" type="submit" onClick={handleSubmit}>Register</Button>

                                    </Form>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        );
    }


    RegistrationView.propTypes = {
        register: PropTypes.shape({
            Username: PropTypes.string.isRequired,
            Password: PropTypes.string.isRequired,
            Email: PropTypes.string.isRequired,
            Birthday: PropTypes.string.isRequired,
        })

    }
}