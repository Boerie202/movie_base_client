import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button } from 'react-bootstrap';

export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick } = this.props;
        return (
            <><Row>
                <Col med={4} className="genre-view bg-light text-black" style={{ marginTop: 150 }}>
                    <div className="genre-name" />
                    <span className="label">Genre: </span>
                    <span className="value">{genre.Name}</span>
                </Col>
            </Row>
                <Row>
                    <Col med={4} className="genre-view bg-light text-black">
                        <div className="genre-description" />
                        <span className="label">Description: </span>
                        <span className="value">{genre.Description}</span>
                    </Col>
                </Row>
                <Row>
                    <Col>

                        <Button onClick={() => { onBackClick(null); }} variant="danger" style={{ marginTop: 50, }}>Back</Button>

                    </Col>
                </Row>
            </>
        );
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};