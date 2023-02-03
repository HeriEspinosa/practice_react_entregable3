import React from 'react'
import '../styles/locationInfo.css'

const LocationInfo = ({ infoAPI }) => {
    return (
        <article className='locationInfo'>
            <h2>{infoAPI?.name}</h2>
            <ul className='locationInfo__info'>
                <li><span>Type <br /></span>{infoAPI?.type}</li>
                <li><span>Dimension <br /></span>{infoAPI?.dimension}</li>
                <li><span>Population <br /></span>{infoAPI?.residents.length}</li>
            </ul>
        </article >
    )
}

export default LocationInfo