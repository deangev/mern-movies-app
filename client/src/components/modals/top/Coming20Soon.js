import React, { useState } from 'react';
import { Card, CardDeck, Modal } from 'react-bootstrap';
import * as Ai from 'react-icons/ai';
import MovieModal from '../movie/MovieModal';
import './coming20Soon.css'

export default function Top20PopularModal({ upcoming, closeModal2, openModal }) {
    const [modalOpen, setModalOpen] = useState(false);

    function closeModal() {
        setModalOpen(false)
    }


    return (
        <div className="upcoming-20-rated-wrapper">
            <div className="upcoming-20-rated-header-container d-flex justify-content-between">
                <h1 className="upcoming-20-rated-header">COMING SOON</h1>
                <span className="close-button-top" onClick={closeModal2}><Ai.AiOutlineClose /></span>
            </div>
            <CardDeck className="most-20-rated-container d-block">
                {upcoming && upcoming.map((movie) => {
                    return (
                        <Card key={movie.id} className="upcoming-20-div d-flex flex-row">
                            <Card.Img className="upcoming-20-img" variant="most" onClick={() => openModal(movie.id)} src={movie.poster} />
                            <Card.Body className="upcoming-20-body">
                                <Card.Text style={{ margin: '0' }}><span className="upcoming-20-rating"><Ai.AiFillStar /></span> <span className="upcoming-20-rating-text">{movie.rating}</span></Card.Text>
                                <Card.Text className="upcoming-20-title" onClick={() => openModal(movie.id)}>{movie.title} ({movie.year})</Card.Text>
                                <Card.Text className="upcoming-20-overview">{movie.overview}</Card.Text>
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
