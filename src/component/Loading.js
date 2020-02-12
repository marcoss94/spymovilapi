import React from 'react'
import '../styles/Loading.css'

const Loading = (props) => {

    if (props.load) {
        return <div className="loader">Loading...</div>
    }
    return null
}

export default Loading

