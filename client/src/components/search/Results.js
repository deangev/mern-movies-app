import React from 'react'
import Result from './Result'
import './results.css'

export default function Results({ results, setDisplayDiv, displayDiv }) {

    return (
        <div id="results"
            className="results" style={{ display: `${displayDiv ? 'block' : 'none'}` }} tabIndex="0" onFocus={() => setDisplayDiv(true)} onBlur={() => setDisplayDiv(false)}>
            {results && results.map((result, index) => {
                return <Result key={index} result={result} />
            })}
        </div>
    )
}
