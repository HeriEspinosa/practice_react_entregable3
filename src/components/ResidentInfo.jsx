import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../styles/residentInfo.css'

const ResidentInfo = ({ url }) => {

    const [character, setCharacter] = useState()

    useEffect(() => {

        axios.get(url)
            .then(res => setCharacter(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <article className='resident'>
            <header>
                <img className='resident__img' src={character?.image} alt="" />
                <div className='resident__status'>
                    <span className='resident__circule'></span>
                    <span>{character?.status}</span>
                </div>
            </header>
            <section className='resident__info'>
                <h3>{character?.name}</h3>
                <hr className='resident__hr' />
                <ul>
                    <li><span>Specie: </span>{character?.species}</li>
                    <li><span>Origin: </span>{character?.origin.name}</li>
                    <li><span>Episodes where appear: </span>{character?.episode.length}</li>
                </ul>
            </section>
        </article>
    )
}

export default ResidentInfo