import React, { useState, useEffect, useContext } from 'react';
import { fetchMostPopularMovies, genresList } from '../../../../service/index';
import { Card, Modal, OverlayTrigger, Popover } from 'react-bootstrap';
import './mostPopular.css';
import * as Ai from 'react-icons/ai'
import MovieModal from '../../../modals/movie/MovieModal';
import Top20PopularModal from '../../../modals/top/Top20PopularModal';
import Axios from 'axios';
import UserContext from '../../../../context/UserContext';
import watchlistContext from '../../../../context/watchlistContext';
import { url } from '../../../../context/urlProvider';

export default function MostPopular() {
    const [mostPopularMovies, setMostPopularMovies] = useState()
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [chosenMovieId, setChosenMovieId] = useState();
    const { userData } = useContext(UserContext);
    const { userWatchlist, setUserWatchlist } = useContext(watchlistContext);

    useEffect(() => {
        const fetchApi = async () => {
            setMostPopularMovies(await fetchMostPopularMovies())
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

    const getMovieGenre = (idArr) => {
        const genresArray = []
        idArr.forEach((sId) => {
            const genreName = genresList.filter(genre => genre.id === sId)
            genresArray.push(genreName[0].name)
        })
        return (
            <span>
                {genresArray.map((genre, index) => {
                    return <p className="movie-sGenre">{genre}</p>
                })}
            </span>
        )
    }

    return (
        <div className="most-popular-wrapper">
            <div className="most-popular-header justify-content-between">
                <h1>Most popular</h1>
                <h2 onClick={() => setModalOpen2(true)}>Top 20 <span><Ai.AiOutlineRight /></span></h2>
            </div>
            <div className="row most-popular-container m-0 justify-content-center">
                {mostPopularMovies && mostPopularMovies.map((movie, index) => {
                    return (
                        index < 5 &&
                        <Card key={movie.id} className="most-popular-5-div col-lg col-md-3 col-sm-5 box m-3">
                            <Card.Img className="most-popular-img" variant="most" onClick={() => openModal(movie.id)} src={movie.poster} />
                            <Card.Body className="most-popular-body">
                                <Card.Text className="most-popular-title" onClick={() => openModal(movie.id)}>{movie.title} ({movie.year})</Card.Text>
                                <Card.Text><span className="most-popular-rating"><Ai.AiFillStar /></span> <span className="most-popular-rating-text">{movie.rating}</span></Card.Text>
                                <Card.Text className="genre-rext">{getMovieGenre(movie.genres)}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <div className="text-muted most-popular-footer d-flex justify-content-between">
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
                                    <span className="most-popular-info-icon" onClick={() => openModal(movie.id)}><Ai.AiOutlineInfoCircle /></span>
                                </div>
                            </Card.Footer>
                        </Card>
                    )
                })}
                <Modal dialogClassName="my-modal" show={modalOpen} onHide={closeModal} >
                    <MovieModal openModal={openModal} closeModal={closeModal} id={chosenMovieId} />
                </Modal>
                <Modal dialogClassName="my-modal2" show={modalOpen2} onHide={closeModal2}>
                    <Top20PopularModal openModal={openModal} closeModal2={closeModal2} mostPopularMovies={mostPopularMovies} />
                </Modal>
            </div>
        </div >
    )
}
