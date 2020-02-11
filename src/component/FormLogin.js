import React, { useState, useEffect } from 'react'


const FormLogin = props => {

    return (
        <form onSubmit={props.handleSubmit}>
            <h1>Login</h1>

            <label>Username</label>
            <input
                name='username'
                placeholder='Username'
                value={props.username}
                onChange={props.handleChange}
            /><br />

            <label>Password</label>
            <input
                type='password'
                name='password'
                placeholder='Password'
                value={props.password}
                onChange={props.handleChange}
            /><br />

            <input type='submit' />
        </form>
    )
}

export default FormLogin