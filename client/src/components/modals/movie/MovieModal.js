import React, { useState, useEffect, useContext } from 'react';
import { fetchMovieDetail, fetchSimilarMovies, fetchCasts, posterUrl, genresList } from '../../../service/index';
import './movieModal.css';
import image from '../../../images/image_not_found.png';
import * as Ai from 'react-icons/ai';
import { Modal, OverlayTrigger, Popover } from 'react-bootstrap';
import ActorModal from '../actor/ActorModal';
import UserContext from '../../../context/UserContext';
import watchlistContext from '../../../context/watchlistContext';
import Axios from 'axios';
import { url } from '../../../context/urlProvider';

export default function MovieModal({ openModal, closeModal, id }) {
    const [movieDetail, setMovieDetail] = useState();
    const [cast, setCast] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [similarMovies, setSimilarMovies] = useState();
    const [chosenPersonId, setChosenPersonId] = useState();
    const { userData } = useContext(UserContext);
    const { userWatchlist, setUserWatchlist } = useContext(watchlistContext);
    
    useEffect(() => {
        const fetchApi = async () => {
            setMovieDetail(await fetchMovieDetail(id))
            setCast(await fetchCasts(id))
            setSimilarMovies(await fetchSimilarMovies(id))
        }
        fetchApi()
    }, [id])

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

    function closeActorModal() {
        setModalOpen(false)
    }

    function openActorModal(id) {
        setChosenPersonId(id)
        setModalOpen(true)
    }

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

    const popover = (
        <Popover id="popover-basic">
            <Popover.Content id="popasa" style={{ fontSize: '1.4rem', fontWeight: '600' }}>
                You must sign in first
          </Popover.Content>
        </Popover>
    );

    return (
        <div className="movie-modal" style={{ display: `${modalOpen ? 'none' : 'block'}` }}>
            {movieDetail && movieDetail.id && movieDetail.poster_path && movieDetail.release_date && cast &&
                <div>
                    <div className="movie-detail-wrapper">
                        <div style={{ height: '100%', width: '100%' }}>
                            <div className="background-img-container" style={{ backgroundImage: `url(${movieDetail.backdrop_path ? posterUrl + (movieDetail.backdrop_path) : image})` }}></div>
                            <span className="close-button" onClick={closeModal}><Ai.AiOutlineClose /></span>
                            <div className="movie-detail-container row">
                                <div className="movie-detail-img-div col-8 col-md-3">
                                    <img className="movie-detail-img col-12" src={(movieDetail.poster_path === null || movieDetail.poster_path.slice(-4) === 'null') ? image : posterUrl + movieDetail.poster_path} alt="background-img" />
                                </div>
                                <div className="movie-detail-header col-10 col-md-8">
                                    <h1>{movieDetail.title} ({movieDetail.release_date.slice(0, 4)})</h1>
                                    <div className="d-flex movie-detail-sub-header border-bottom">
                                        <p>
                                            <span style={{ paddingLeft: '0' }}>{movieDetail.release_date.split('-').reverse().join('/')} ({movieDetail.production_countries[0] && movieDetail.production_countries[0].iso_3166_1})</span>
                                            <span>{movieDetail.runtime} min</span>
                                            <span style={{ borderRight: '0' }}>{movieDetail.genres.map((genre, index) => {
                                                return (
                                                    (index !== movieDetail.genres.length - 1) ? (<span key={index}>{genre.name}, </span>) : (<span key={index}>&nbsp;{genre.name}</span>)
                                                )
                                            })}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="movie-detail-overview">
                                        <h2 className="movie-detail-overview-header">Overview</h2>
                                        <div className="movie-detail-overview-text">{movieDetail.overview}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {similarMovies && similarMovies.length > 0 &&
                        <div>
                            <div className="similar-movies-header-1">
                                <h1>Similar movies</h1>
                            </div>
                            <div className="row similar-movies-wrapper d-flex">
                                {similarMovies.map((movie, index) => {
                                    return (
                                        index < 5 &&
                                        <div key={movie.id} className="col-sm col-5 box m-3 similar-movies-5-div">
                                            <img className="similar-movies-img" onClick={() => openModal(movie.id)} variant="top" alt="movie-img" src={(movie.poster && movie.poster.slice(-4) === 'null') ? image : movie.poster} />
                                            <div className="similar-movies-body pr-3 pl-3">
                                                <div className="mt-3 similar-movies-title" onClick={() => openModal(movie.id)}>{movie.title} ({movie.year})</div>
                                                <div><span className="similar-movies-rating"><Ai.AiFillStar /></span> <span className="similar-movies-rating-text">{movie.rating}</span></div>
                                                <div className="mt-3 genre-rext">{getMovieGenre(movie.genres)}</div>
                                            </div>
                                            <div className="footer-container-modal pr-3 pl-3">
                                                <div className="text-muted similar-movies-footer d-flex justify-content-between">
                                                    <span>
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
                                                    <span><Ai.AiOutlineInfoCircle onClick={() => openModal(movie.id)} /></span>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                })}
                            </div>
                        </div>
                    }
                    {cast && cast.length > 0 &&
                        <div className="movie-cast">
                            <h1>Cast</h1>
                            {cast.map((actor, index) => {
                                return (
                                    index < 30 &&
                                    <div key={actor.id} className="actor-wrapper d-flex" style={{ background: `${index % 2 === 0 && '#f6f6f5'}` }}>
                                        <div className="movie-actor-image-container">
                                            <img className="movie-actor-image" onClick={() => openActorModal(actor.id)} src={(actor.img && actor.img.slice(-4) === 'null') ? image : actor.img} alt="actor" />
                                        </div>
                                        <div className="movie-actor-name-container">
                                            <div>
                                                <h2 className="movie-actor-name" onClick={() => openActorModal(actor.id)}>{actor.name}</h2>
                                            </div>
                                            <h5 className="movie-actor-character-name">{actor.character}</h5>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            }
            <Modal dialogClassName="my-modal" show={modalOpen} onHide={closeActorModal} >
                <ActorModal openModal={openActorModal} closeModal={closeActorModal} chosenPersonId={chosenPersonId} />
            </Modal>
        </div>
    )
}