import React from 'react'
import Genre from './home/movies/genre/Genre'
import TrendingPerson from './home/movies/person/TrendingPerson'
import MostPopular from './home/movies/popular/MostPopular'
import TopRated from './home/movies/rating/TopRated'
import Upcoming from './home/movies/upcoming/Upcoming'

export default function Home() {
    return (
        <div>
            <Genre />
            <MostPopular />
            <TopRated />
            <Upcoming />
            <TrendingPerson />
        </div>
    )
}
