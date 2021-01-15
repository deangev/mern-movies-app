import React, { useState, useEffect, useContext } from "react";
import { fetchGenre, fetchMovieByGenre, } from "../../../../service/index";
import { Card, Modal } from 'react-bootstrap';
import * as Ai from 'react-icons/ai';
import UserContext from '../../../../context/UserContext';
import Axios from "axios";
import watchlistContext from "../../../../context/watchlistContext";
import MovieModal from "../../../modals/movie/MovieModal";
import {url} from '../../../../context/urlProvider';
import './genre.css';

export default function Genre() {
    const [genres, setGenres] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieByGenre, setMovieByGenre] = useState([]);
    const [chosenMovieId, setChosenMovieId] = useState()
    const { userData } = useContext(UserContext);
    const { userWatchlist, setUserWatchlist } = useContext(watchlistContext);
    const [checked, setChecked] = useState(0);


    useEffect(() => {
        const fetchAPI = async () => {
            setGenres(await fetchGenre());
            setMovieByGenre(await fetchMovieByGenre(12));
        };

        fetchAPI();
    }, []);

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

    function openModal(id) {
        setModalOpen(true)
        setChosenMovieId(id)
    }

    function closeModal() {
        setModalOpen(false)
    }

    const handleGenreClick = async (genre_id) => {
        setMovieByGenre(await fetchMovieByGenre(genre_id));
    };

    return (
        <div className="genre-wrapper">
            <div className="genre-header d-flex justify-content-between">
                <h1>Search by genre</h1>
            </div>
            <div className="row genres-list-wrapper">
                {genres && genres.map((item, index) => {
                    return (
                        <li className='list-inline-item' key={index}>
                            <button
                                type="button"
                                className={`btn ${checked === index && 'active'}`}
                                onClick={() => {
                                    handleGenreClick(item.id);
                                    setChecked(index)
                                }}
                            >
                                {item.name}
                            </button>
                        </li>
                    );
                })}
            </div>
            <div className="genre-wrapper-1">
                <div className="row genre-container2 justify-content-center">
                    {movieByGenre && movieByGenre.map((movie, index) => {
                        return (
                            index < 6 &&
                            <Card key={movie.id} className="col-lg col-md-3 col-5 box m-3 genre-5-div">
                                <Card.Img className="genre-img" onClick={() => openModal(movie.id)} variant="top" src={movie.poster} />
                                <Card.Body className="genre-body">
                                    <Card.Text><span className="genre-rating"><Ai.AiFillStar /></span> <span className="genre-rating-text">{movie.rating}</span></Card.Text>
                                    <Card.Text className="genre-title" onClick={() => openModal(movie.id)}>{movie.title}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <div className="text-muted genre-footer d-flex justify-content-between">
                                        <span className="most-popular-minus-icon">
                                            {userWatchlist && userWatchlist.some(watchlistMovie => watchlistMovie.id === movie.id) ?
                                                <Ai.AiOutlineMinusCircle onClick={() => handleWatchList(movie)} /> :
                                                <Ai.AiOutlinePlusCircle onClick={() => handleWatchList(movie)} />
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
            </div>
        </div >

    )
}
