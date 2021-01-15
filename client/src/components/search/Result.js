import React, { useState } from 'react';
import './result.css';
import image from '../../images/image_not_found.png'
import { posterUrl } from '../../service/index'
import { Modal } from 'react-bootstrap';
import MovieModal from '../modals/movie/MovieModal';
import ActorModal from '../modals/actor/ActorModal';

export default function Result({ result }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalActorOpen, setModalActorOpen] = useState(false);
    const [chosenMovieId, setChosenMovieId] = useState();
    const [chosenPersonId, setChosenPersonId] = useState();

    function closeModal() {
        setModalOpen(false)
    }

    function openModal(id) {
        setModalOpen(true)
        setChosenMovieId(id)
    }

    function closeActorModal() {
        setModalActorOpen(false)
    }

    function openActorModal(id) {
        setChosenPersonId(id)
        setModalActorOpen(true)
    }
    

    return (
        <div>
            {result &&
                <div className="result-wrapper">
                    <div className="result border-bottom d-flex" onClick={() => {result.title ? openModal(result.id) : openActorModal(result.id)}}>
                        {result.poster_path && <img className="result-img" onClick={() => openModal(result.id)} src={result.poster_path ? `${posterUrl}${result.poster_path}` : image} alt="title img" />}
                        {result.profile_path && <img className="result-img" onClick={() => openActorModal(result.id)} src={result.profile_path ? `${posterUrl}${result.profile_path}` : image} alt="title img" />}
                        <div className="result-title-container">
                            {result.title && <h3 className="result-title" onClick={() => openModal(result.id)}>{result.title}</h3>}
                            {result.name && <h3 className="result-title" onClick={() => openActorModal(result.id)}>{result.name}</h3>}
                            {result.release_date && <h2 className="result-title-year">{result.release_date.slice(0, 4)}</h2>}
                            {result.first_air_date && <h2 className="result-title-year">{result.first_air_date.slice(0, 4)}</h2>}
                        </div>
                    </div>
                    <Modal dialogClassName="my-modal" show={modalOpen} onHide={closeModal} >
                        <MovieModal openModal={openModal} closeModal={closeModal} id={chosenMovieId} />
                    </Modal>
                    <Modal dialogClassName="my-modal" show={modalActorOpen} onHide={closeActorModal} >
                        <ActorModal openModal={openActorModal} closeModal={closeActorModal} chosenPersonId={chosenPersonId} />
                    </Modal>
                </div>
            }
        </div>
    )
}
