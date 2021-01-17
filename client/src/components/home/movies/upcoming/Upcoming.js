import React, { useContext, useEffect, useState } from 'react';
import { fetchUpcomingMovie } from '../../../../service/index'
import './upcoming.css';
import { Card, Modal, OverlayTrigger, Popover } from 'react-bootstrap';
import * as Ai from 'react-icons/ai';
import MovieModal from '../../../modals/movie/MovieModal';
import Coming20Soon from '../../../modals/top/Coming20Soon';
import UserContext from '../../../../context/UserContext';
import Axios from 'axios';
import watchlistContext from '../../../../context/watchlistContext';
import { url } from '../../../../context/urlProvider';

export default function Upcoming() {
    const [upcoming, setUpcoming] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [chosenMovieId, setChosenMovieId] = useState()
    const { userData } = useContext(UserContext);
    const { userWatchlist, setUserWatchlist } = useContext(watchlistContext);


    useEffect(() => {
        const fetchApi = async () => {
            setUpcoming(await fetchUpcomingMovie())
        }
        fetchApi()
    }, [])

    const handleWatchList = async (movieObj) => {
        try {
            await Axios.post(`${url}/watchlist/add`, {
                userId: userData.id,
                id: movieObj.id,
                poster: movieObj.poster,
                rating: movieObj.rating,
                title: movieObj.title,
                year: movieObj.year
            })

            const exist = userWatchlist.some(user => user.id === parseInt(movieObj.id));
            if (exist) {
                const remove = userWatchlist.filter(user => user.id !== parseInt(movieObj.id));
                setUserWatchlist(remove)
            } else {
                setUserWatchlist(prevValues => {
                    return prevValues && [...prevValues, {
                        id: movieObj.id,
                        poster: movieObj.poster,
                        rating: movieObj.rating,
                        title: movieObj.title,
                        year: movieObj.year
                    }]
                })
            }

        } catch (err) {
            console.log(err);
        }
    }

    function closeModal() {
        setModalOpen(false)
    }

    function openModal(id) {
        setModalOpen(true)
        setChosenMovieId(id)
    }

    function closeModal2() {
        setModalOpen2(false)
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Content id="popasa" style={{ fontSize: '1.4rem', fontWeight: '600' }}>
                You must sign in first
          </Popover.Content>
        </Popover>
    );

    return (
        <div className="upcoming-wrapper">
            <div className="upcoming-header justify-content-between">
                <h1>Coming Soon</h1>
                <h2 onClick={() => setModalOpen2(true)}>View 20 <span><Ai.AiOutlineRight /></span></h2>
            </div>
            <div className="row upcoming-container justify-content-center">
                {upcoming && upcoming.map((movie, index) => {
                    return (
                        index < 6 &&
                        <Card key={movie.id} className="col-lg col-md-3 col-5 box m-3 upcoming-5-div" style={{ width: '20rem' }}>
                            <Card.Img className="upcoming-img" onClick={() => openModal(movie.id)} variant="top" src={movie.poster} />
                            <Card.Body className="upcoming-body">
                                <Card.Text><span className="upcoming-rating"><Ai.AiFillStar /></span> <span className="upcoming-rating-text">{movie.rating}</span></Card.Text>
                                <Card.Text className="upcoming-title" onClick={() => openModal(movie.id)}>{movie.title}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <div className="text-muted upcoming-footer d-flex justify-content-between">
                                    <span className="most-popular-minus-icon">
                                        {userData.id ?
                                            (
                                                userWatchlist && userWatchlist.some(watchlistMovie => watchlistMovie.id === movie.id) ?
                                                    <Ai.AiOutlineMinusCircle onClick={() => handleWatchList(movie)} /> :
                                                    <Ai.AiOutlinePlusCircle onClick={() => handleWatchList(movie)} />
                                            ) :
                                            <div>
                                                <OverlayTrigger trigger="click" rootClose placement="right" overlay={popover}>
                                                    <Ai.AiOutlinePlusCircle />
                                                </OverlayTrigger>
                                            </div>

                                        }
                                    </span>
                                    <span className="most-popular-info-icon"><Ai.AiOutlineInfoCircle onClick={() => openModal(movie.id)} /></span>
                                </div>
                            </Card.Footer>
                        </Card>
                    )

                })}
            </div>
            <Modal dialogClassName="my-modal" show={modalOpen} onHide={closeModal} >
                <MovieModal openModal={openModal} closeModal={closeModal} id={chosenMovieId} />
            </Modal>
            <Modal dialogClassName="my-modal2" show={modalOpen2} onHide={closeModal2}>
                <Coming20Soon openModal={openModal} closeModal2={closeModal2} upcoming={upcoming} />
            </Modal>
        </div>
    )
}