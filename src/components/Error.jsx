import React from 'react'
import '../styles/error.css'

const Error = () => {
    return (
        <div className='container__err'>
            <h2 className='container__err__text'>❌ Hey! you must provide an id from 1 to 126 🥺</h2>
            <img src="/error-rick-and-morty.jpg" alt="Error" />
        </div>
    )
}

export default Error