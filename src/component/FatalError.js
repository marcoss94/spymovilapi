import React from 'react'

const FatalError = (props) => {

    if (props.boolError) {
        return null
    }

    if (props.error.username !== undefined) {
        return <h1>{"Usuario: " + props.error.username}</h1>
    }
    if (props.error.password !== undefined) {
        return <h1>{"Contraseña: " + props.error.password}</h1>
    }
    if (props.error.detail !== undefined) {
        return <h1>{props.error.detail}</h1>
    }
    if (props.error.refresh !== undefined) {
        return <h1>{"Refresh: " + props.error.refresh}</h1>
    }
    return (
        <div>
            <h1>{props.error}</h1>
        </div>
    )
}

export default FatalError