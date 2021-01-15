import React, { useState } from 'react';
import { Card, CardDeck, Modal } from 'react-bootstrap';
import * as Ai from 'react-icons/ai';
import MovieModal from '../movie/MovieModal';
import './top20rated.css'

export default function Top20PopularModal({ topMovies, closeModal2, openModal }) {
    const [modalOpen, setModalOpen] = useState(false);

    function closeModal() {
        setModalOpen(false)
    }

    return (
        <div className="top-20-rated-wrapper">
            <div className="top-20-rated-header-container d-flex justify-content-between">
                <h1 className="top-20-rated-header">TOP RATED</h1>
                <span className="close-button-top" onClick={closeModal2}><Ai.AiOutlineClose /></span>
            </div>
            <CardDeck className="most-20-rated-container d-block">
                {topMovies && topMovies.map((movie) => {
                    return (
                        <Card key={movie.id} className="rated-20-div d-flex flex-row">
                            <Card.Img className="rated-20-img" variant="most" onClick={() => openModal(movie.id)} src={movie.poster} />
                            <Card.Body className="rated-20-body">
                                <Card.Text style={{ margin: '0' }}><span className="rated-20-rating"><Ai.AiFillStar /></span> <span className="rated-20-rating-text">{movie.rating}</span></Card.Text>
                                <Card.Text className="rated-20-title" onClick={() => openModal(movie.id)}>{movie.title} ({movie.year})</Card.Text>
                                <Card.Text className="rated-20-overview">{movie.overview}</Card.Text>
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
