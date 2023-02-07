import React from 'react'
import '../styles/loading.css'

const Loading = () => {
    return (
        <section className='loading flex'>
            <section className='loading__circle flex'>
                <img src='/loading.gif' alt="" />
            </section>
            <section>
                <h2>Loading...</h2>
            </section>
        </section>
    )
}

export default Loading