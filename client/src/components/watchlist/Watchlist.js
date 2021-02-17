import React, { useContext, useState } from 'react';
import MovieModal from '../modals/movie/MovieModal';
import { Modal } from 'react-bootstrap';
import watchlistContext from '../../context/watchlistContext';
import * as Ai from 'react-icons/ai'
import './watchlist.css'
import Axios from 'axios';
import UserContext from '../../context/UserContext';
import { url } from '../../context/urlProvider';

export default function Watchlist() {
    const { userWatchlist, setUserWatchlist } = useContext(watchlistContext);
    const { userData } = useContext(UserContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [chosenMovieId, setChosenMovieId] = useState();

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

            setUserWatchlist(userWatchlist.filter(element => element.id !== movieObj.id))

        } catch (err) {
            console.log(err);
        }
    }

    function openModal(id) {
        setChosenMovieId(id)
        setModalOpen(true)
    }

    function closeModal() {
        setModalOpen(false)
    }

    return (
        <div className="watchlist-container">
            <div className="watchlist-header-container">
                <h1>Watchlist</h1>
            </div>
            <div className="watchlist-movies-wrapper container d-flex justify-content-center">
                <div className="row">
                    {userWatchlist && userWatchlist.map((movie, index) => {
                        return (
                            <div key={index} className="col-lg-2 col-md-4 col-6"> 
                                {movie.id &&
                                    <div id={movie.id} key={movie.id} className="col box watchlist-div">
                                        <img className="watchlist-img" variant="most" onClick={() => openModal(movie.id)} src={movie.poster} alt="wishlist-img" />
                                        <div className="watchlist-body mt-3">
                                            <div className="watchlist-title" onClick={() => openModal(movie.id)}>{movie.title} {movie.year && `(${movie.year.slice(0, 4)})`}</div>
                                            <div><span className="watchlist-rating"><Ai.AiFillStar /></span> <span className="watchlist-rating-text">{movie.rating}</span></div>
                                        </div>
                                        <div className="footer-container-modal row m-0 pr-2 pl-2">
                                            <div className="text-muted watchlist-footer d-flex justify-content-between">
                                                <span className="watchlist-minus-icon"><Ai.AiOutlineMinusCircle onClick={() => handleWatchList(movie)} /></span>
                                                <span className="watchlist-info-icon" onClick={() => openModal(movie.id)}><Ai.AiOutlineInfoCircle /></span>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>)

                    })}
                </div>
            </div>
            <Modal dialogClassName="my-modal" show={modalOpen} onHide={closeModal} >
                <MovieModal openModal={openModal} closeModal={closeModal} id={chosenMovieId} />
            </Modal>
        </div>
    )
}
