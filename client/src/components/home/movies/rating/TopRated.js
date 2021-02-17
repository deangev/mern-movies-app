import React, { useContext, useEffect, useState } from 'react';
import { fetchTopratedMovie, genresList } from '../../../../service/index'
import './topRated.css';
import { Card, OverlayTrigger, Popover } from 'react-bootstrap';
import * as Ai from 'react-icons/ai';
import { Modal } from 'react-bootstrap';
import MovieModal from '../../../modals/movie/MovieModal';
import Top20Rated from '../../../modals/top/Top20Rated'
import UserContext from '../../../../context/UserContext';
import Axios from 'axios';
import watchlistContext from '../../../../context/watchlistContext';
import { url } from '../../../../context/urlProvider';

export default function TopRated() {
  const [topMovies, setTopMovies] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [chosenMovieId, setChosenMovieId] = useState();
  const { userData } = useContext(UserContext);
  const { userWatchlist, setUserWatchlist } = useContext(watchlistContext);

  useEffect(() => {
    const fetchApi = async () => {
      setTopMovies(await fetchTopratedMovie())
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
    <div className="top-rated-wrapper">
      <div className="top-rated-header justify-content-between">
        <h1>Top rated</h1>
        <h2 onClick={() => setModalOpen2(true)}>Top 20 <span><Ai.AiOutlineRight /></span></h2>
      </div>
      <div className="row top-rated-container justify-content-center">
        {topMovies && topMovies.map((movie, index) => {
          return (
            index < 5 &&
            <Card key={movie.id} className="col-lg col-md-3 col-5 box m-3 top-rated-5-div" style={{ width: '20rem' }}>
              <Card.Img className="top-rated-img" onClick={() => openModal(movie.id)} variant="top" src={movie.poster} />
              <Card.Body className="top-rated-body">
                <Card.Text className="top-rated-title" onClick={() => openModal(movie.id)}>{movie.title} ({movie.year})</Card.Text>
                <Card.Text><span className="top-rated-rating"><Ai.AiFillStar /></span> <span className="top-rated-rating-text">{movie.rating}</span></Card.Text>
                <Card.Text className="genre-rext">{getMovieGenre(movie.genres)}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <div className="text-muted top-rated-footer d-flex justify-content-between">
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
        <Top20Rated openModal={openModal} closeModal2={closeModal2} topMovies={topMovies} />
      </Modal>
    </div>
  )
}
