import React, { useRef, useState } from 'react';
import Axios from 'axios';
import Results from './search/Results';
import { searchMovies, searchPeople } from '../service/index';
import './searchComp.css'

export default function SearchComp() {
  const inputText = useRef()
  const [results, setResults] = useState([])
  const [displayDiv, setDisplayDiv] = useState(false)

  const handleInput = async () => {
    inputText.current && inputText.current.value.length > 2 && await Axios(searchMovies + inputText.current.value).then(({ data }) => {
      let result = data.results
      setResults(result)
    })
    inputText.current.value.length > 2 && await Axios(searchPeople + inputText.current.value).then(({ data }) => {
      let result = data.results
      results && setResults(prevValues => {
        return prevValues && [...prevValues, result[0]]
      })
    })
    inputText.current && inputText.current.value.length <= 2 && setResults()
  }

  const handleFocus = () => {
    document.getElementById('results').style.display = 'block'
  }

  const handleBlur = () => {
    setTimeout(() => {
      const element = document.getElementById('results')
      let isFocused = (document.activeElement === element)
      if (isFocused) {
        document.getElementById('results').style.display = 'block'
      } else {
        document.getElementById('results').style.display = 'none'
      }
    }, 100)
  }

  return (
    <div className="search-comp-wrapper">
      <input
        type="text"
        ref={inputText}
        onChange={handleInput}
        placeholder="Search for a movie, person"
        className="searchbox"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Results displayDiv={displayDiv} setDisplayDiv={setDisplayDiv} results={results} />
    </div>
  )
}
