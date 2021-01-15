import React, { useState } from 'react';
import { Card, CardDeck, Modal } from 'react-bootstrap';
import * as Ai from 'react-icons/ai';
import MovieModal from '../movie/MovieModal';
import './top20PopularModal.css'

export default function Top20PopularModal({ mostPopularMovies, closeModal2, openModal }) {
    const [modalOpen, setModalOpen] = useState(false);

    function closeModal() {
        setModalOpen(false)
    }

    return (
        <div className="top-20-most-popular-wrapper">
            <div className="top-20-most-popular-header-container d-flex justify-content-between">
                <h1 className="top-20-most-popular-header">MOST POPULAR</h1>
                <span className="close-button-top" onClick={closeModal2}><Ai.AiOutlineClose /></span>
            </div>
            <CardDeck className="most-20-popular-container d-block">
                {mostPopularMovies && mostPopularMovies.map((movie) => {
                    return (
                        <Card key={movie.id} className="most-popular-20-div flex-row">
                            <Card.Img className="most-popular-20-img" variant="most" onClick={() => openModal(movie.id)} src={movie.poster} />
                            <Card.Body className="most-popular-20-body">
                                <Card.Text style={{ margin: '0' }}><span className="most-popular-20-rating"><Ai.AiFillStar /></span> <span className="most-popular-20-rating-text">{movie.rating}</span></Card.Text>
                                <Card.Text className="most-popular-20-title" onClick={() => openModal(movie.id)}>{movie.title} ({movie.year})</Card.Text>
                                <Card.Text className="most-popular-20-overview">{movie.overview}</Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })}
                <Modal dialogClassName="my-modal" show={modalOpen} onHide={closeModal} >
                    <MovieModal closeModal={closeModal} />
                </Modal>
            </CardDeck>
        </div>
    )
}
