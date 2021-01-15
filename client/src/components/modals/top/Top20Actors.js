import React, { useState } from 'react';
import { Card, CardDeck, Modal } from 'react-bootstrap';
import * as Ai from 'react-icons/ai';
import MovieModal from '../movie/MovieModal';
import ActorModal from '../actor/ActorModal';
import './top20Actors.css';

export default function Top20PopularModal({ mostPopularPeople, closeModal2, openModal }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [chosenMovieId, setChosenMovieId] = useState();

    function closeModal() {
        setModalOpen(false)
    }

    function openMovieModal(id) {
        setModalOpen(true)
        setChosenMovieId(id)
    }

    return (
        <div className="top-20-actors-wrapper">
            <div className="top-20-actors-header-container d-flex justify-content-between">
                <h1 className="top-20-actors-header">TRENDING PEOPLE</h1>
                <span className="close-button-top" onClick={closeModal2}><Ai.AiOutlineClose /></span>
            </div>
            <CardDeck className="most-20-popular-container d-block">
                {mostPopularPeople && mostPopularPeople.map((actor) => {
                    return (
                        <Card key={actor.id} className="actors-20-div d-flex flex-row">
                            <Card.Img className="actors-20-img" variant="most" onClick={() => openModal(actor.id)} src={actor.profileImg} />
                            <Card.Body className="actors-20-body">
                                <Card.Text className="actors-20-title" onClick={() => openModal(actor.id)}>{actor.name} </Card.Text>
                                <Card.Text><span className="actors-rating"> <Ai.AiFillStar /></span> <span className="actors-rating-text">{actor.popularity}</span></Card.Text>
                                {actor.known &&
                                    <div className="known-for-container">
                                        <h3>Known for:</h3>
                                        <div className="d-flex">{actor.knownFor.map((movie, index) => {
                                            return (
                                                <div key={index}>
                                                    {index < actor.knownFor.length - 1 ?
                                                        <h4><span className="know-for-movies-title" onClick={() => openMovieModal(movie.id)}>{movie.title}</span>,&nbsp;</h4> :
                                                        <h4><span className="know-for-movies-title" onClick={() => openMovieModal(movie.id)}>{movie.title}</span></h4>
                                                    }
                                                </div>
                                            )
                                        })}</div>
                                    </div>
                                }
                            </Card.Body>
                        </Card>
                    )
                })}
                <Modal dialogClassName="my-modal" show={modalOpen} onHide={closeModal} >
                    <ActorModal closeModal={closeModal} />
                </Modal>
                <Modal dialogClassName="my-modal" show={modalOpen} onHide={closeModal} >
                    <MovieModal openModal={openMovieModal} closeModal={closeModal} id={chosenMovieId} />
                </Modal>
            </CardDeck>
        </div>
    )
}
