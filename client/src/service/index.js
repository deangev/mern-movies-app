import Axios from 'axios';

export const apiKey = 'a4999a28333d1147dbac0d104526337a';
export const url = 'https://api.themoviedb.org/3';
export const posterUrl = 'https://image.tmdb.org/t/p/original/';
export const nowPlayingUrl = `${url}/movie/now_playing`;
export const topRatedUrl = `${url}/movie/top_rated`;
export const mostPopularUrl = `${url}/movie/popular`;
export const upcomingUrl = `${url}/movie/upcoming`;
export const personUrl = `${url}/trending/person/week`;
export const actorUrl = `${url}/person`;
export const actorMoviesUrl = `${url}/person`
export const movieUrl = `${url}/movie`;
export const genreUrl = `${url}/genre/movie/list`;
export const moviesUrl = `${url}/discover/movie`;
export const searchMovies = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&query=`
export const searchPeople = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&language=en-US&page=1&query=`

export const fetchWatchlist = async (watchlistMovie) => {
    try {
        const movieDetail = await fetchMovieDetail(watchlistMovie.movie)
        return movieDetail;
    } catch (error) {

    }
}

export const fetchActorMovies = async (id) => {
    try {
        const { data } = await Axios.get(`${actorMoviesUrl}/${id}/movie_credits`, {
            params: {
                api_key: apiKey,
                language: 'en_US'
            }
        })

        const modifiedData = data.cast.map(m => ({
            id: m['id'],
            title: m['title'],
            character: m['character'],
            date: m['release_date']
        }))

        modifiedData.sort(function (a, b) {
            return a.date && b.date && a.date.slice(0, 4) - b.date.slice(0, 4);
        }).reverse()

        return modifiedData;
    } catch (error) {

    }
}

export const fetchPersonDetails = async (id) => {
    try {
        const { data } = await Axios.get(`${actorUrl}/${id}`, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })

        const modifiedData = {
            id: data['id'],
            biography: data['biography'],
            birthday: data['birthday'],
            deathday: data['deathday'],
            image: posterUrl + data['profile_path'],
            name: data['name'],
            placebirth: data['place_of_birth']
        }
        return modifiedData;
    } catch (error) {

    }
}

export const fetchMostPopularMovies = async () => {
    try {
        const { data } = await Axios.get(mostPopularUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })

        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
            year: m['release_date'].slice(0, 4),
            genre: m['genre_ids']
        }))
        return modifiedData;
    } catch (error) { }
}

export const fetchTopratedMovie = async () => {
    try {
        const { data } = await Axios.get(topRatedUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
            year: m['release_date'].slice(0, 4),
            genre: m['genre_ids']
        }))

        return modifiedData;
    } catch (error) {

    }
}

export const fetchUpcomingMovie = async () => {
    try {
        const { data } = await Axios.get(upcomingUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
            year: m['release_date'].slice(0, 4),
            genre: m['genre_ids']
        }))

        return modifiedData;
    } catch (error) {

    }
}

export const fetchSimilarMovies = async (id) => {
    try {
        const { data } = await Axios.get(`${movieUrl}/${id}/similar`, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })

        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
            year: m['release_date'].slice(0, 4),
            genre: m['genre_ids']
        }))
        return modifiedData;
    } catch (error) { }
}

export const fetchPersons = async () => {
    try {
        const { data } = await Axios.get(personUrl, {
            params: {
                api_key: apiKey
            }
        })

        const modifiedData = data['results'].map((p) => ({
            id: p['id'],
            popularity: p['popularity'],
            name: p['name'],
            profileImg: 'https://image.tmdb.org/t/p/w200' + p['profile_path'],
            known: p['known_for_department'],
            knownFor: p['known_for']
        }))

        return modifiedData;
    } catch (error) { }
}

export const fetchMovies = async () => {
    try {
        const { data } = await Axios.get(nowPlayingUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })

        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
            year: m['release_date'].slice(0, 4)
        }))

        return modifiedData;
    } catch (error) { }
}

export const fetchGenre = async () => {
    try {
        const { data } = await Axios.get(genreUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        const modifiedData = data['genres'].map((g) => ({
            id: g['id'],
            name: g['name']
        }))
        return modifiedData;
    } catch (error) { }
}

export const fetchMovieByGenre = async (genre_id) => {
    try {
        const { data } = await Axios.get(moviesUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1,
                with_genres: genre_id
            }
        })
        
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data && data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))

        return modifiedData;
    } catch (error) { }
}



export const fetchMovieDetail = async (id) => {
    try {
        const { data } = await Axios.get(`${movieUrl}/${id}`, {
            params: {
                api_key: apiKey,
                language: 'en_US'
            }
        });
        
        return data;
    } catch (error) { }
}

export const fetchCasts = async (id) => {
    try {
        const { data } = await Axios.get(`${movieUrl}/${id}/credits`, {
            params: {
                api_key: apiKey,
            }
        });
        const modifiedData = data['cast'].map((c) => ({
            id: c['id'],
            character: c['character'],
            name: c['name'],
            img: 'https://image.tmdb.org/t/p/w200' + c['profile_path'],
        }))

        return modifiedData;
    } catch (error) { }
}

export const fetchSimilarMovie = async (id) => {
    try {
        const { data } = await Axios.get(`${movieUrl}/${id}/similar`, {
            params: {
                api_key: apiKey,
                language: 'en_US'
            }
        });
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
            year: m['release_date'].slice(0, 4)
        }))

        return modifiedData;
    } catch (error) { }
}
