import React, { useEffect, useState } from 'react';
import './trendingPerson.css';
import { fetchPersons } from '../../../../service/index'
import * as Ai from 'react-icons/ai'
import { Modal } from 'react-bootstrap';
import ActorModal from '../../../modals/actor/ActorModal';
import Top20Actors from '../../../modals/top/Top20Actors'

export default function TrendingPerson() {
    const [mostPopularPeople, setMostPopularPeople] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [chosenPersonId, setChosenPersonId] = useState()

    useEffect(() => {
        const fetchApi = async () => {
            setMostPopularPeople(await fetchPersons())
        }
        fetchApi()
    }, [])

    function closeModal() {
        setModalOpen(false)
    }

    function openModal(id) {
        setModalOpen(true)
        setChosenPersonId(id)
    }

    function closeModal2() {
        setModalOpen2(false)
    }

    return (
        <div className="trending-people-wrapper">
            <div className="trending-people-header justify-content-between">
                <h1>Trending actors and directors this week</h1>
                <h2 onClick={() => setModalOpen2(true)}>Top 20 <span><Ai.AiOutlineRight /></span></h2>
            </div>
            <div className="row trending-people-container justify-content-center">
                {mostPopularPeople && mostPopularPeople.map((actor, index) => {
                    return (
                        index < 8 &&
                        <div key={actor.id} className="trending-people-div col-lg col-md-3 col-12 box m-3">
                            <img className="trending-people-img" onClick={() => openModal(actor.id)} variant="most" src={actor.profileImg} alt="actor-img" />
                            <h2 className="trending-people-name" onClick={() => openModal(actor.id)}>{actor.name}</h2>
                        </div>
                    )
                })}
            </div>
            <Modal dialogClassName="my-modal" show={modalOpen} onHide={closeModal} >
                <ActorModal openModal={openModal} closeModal={closeModal} chosenPersonId={chosenPersonId} />
            </Modal>
            <Modal dialogClassName="my-modal2" show={modalOpen2} onHide={closeModal2}>
                <Top20Actors openModal={openModal} closeModal2={closeModal2} mostPopularPeople={mostPopularPeople} />
            </Modal>
        </div>
    )
}
