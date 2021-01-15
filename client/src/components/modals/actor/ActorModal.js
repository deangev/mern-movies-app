import React, { useState, useEffect } from 'react';
import { fetchPersonDetails, fetchActorMovies } from '../../../service/index';
import './actorModal.css';
import * as Ai from 'react-icons/ai';
import { Modal } from 'react-bootstrap';
import MovieModal from '../movie/MovieModal';

export default function ActorModal({ closeModal, chosenPersonId }) {
    const [actorDetail, setActorDetail] = useState();
    const [actorMovies, setActorMovies] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [chosenMovieId, setChosenMovieId] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            setActorDetail(await fetchPersonDetails(chosenPersonId))
            setActorMovies(await fetchActorMovies(chosenPersonId))
        }
        fetchApi()
    }, [chosenPersonId])

    function openModal(id) {
        setModalOpen(true)
        setChosenMovieId(id)
    }
    
    function closeModal2() {
        setModalOpen(false)
    }

    return (
        <div>
            {actorDetail &&
                <div className="actor-modal-wrapper" style={{display: `${modalOpen ? 'none' : 'block'}`}}>
                    <div className="actor-modal-container border-bottom pb-5">
                        <span className="close-button" onClick={closeModal} style={{ position: 'absolute', right: '4rem', zIndex: '1' }}><Ai.AiOutlineClose /></span>
                        <div className="actor-modal-img-container">
                            <img className="actor-modal-img" src={actorDetail.image} alt="actor-name" />
                        </div>
                        <div className="actor-details-modal-container">
                            <div className="actor-name-modal-container">
                                <h1 style={{ position: 'relative', right: '.3rem' }}>{actorDetail.name}</h1>
                            </div>

                            {actorDetail.birthday && actorDetail.placebirth &&
                                <p className="actor-details-modal-born" style={{ fontSize: '1.5rem' }}>
                                    <span>Born:</span>
                                    <span > {actorDetail.birthday.split('-').reverse().join('/')}, {actorDetail.placebirth}</span>
                                </p>
                            }
                            <div className="actor-biography-modal-container pt-5">
                                <h4 style={{ fontWeight: '600' }}>Biography</h4>
                                <p>{actorDetail.biography}</p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-5 actor-movies-container">
                        <h1>Filmography</h1>
                        {actorMovies && actorMovies && actorMovies.map((movie, index) => {
                            return (
                                <div key={index} className="actor-movie d-flex justify-content-between" style={{ backgroundColor: `${index % 2 ? 'white' : '#e9e9e9'}` }}>
                                    <div className="actor-movie-title-character">
                                        <div className="actor-movie-title" onClick={() => openModal(movie.id)}>{movie.title}</div>
                                        <div>{movie.character}</div>
                                    </div>
                                    <div className="actor-movie-year">{movie.date && movie.date.slice(0, 4)}</div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            }
            <Modal dialogClassName="my-modal" show={modalOpen} onHide={closeModal2} >
                <MovieModal openModal={openModal} closeModal={closeModal2} id={chosenMovieId} />
            </Modal>
        </div>
    )
}
