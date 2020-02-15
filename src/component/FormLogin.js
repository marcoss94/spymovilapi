import React from 'react'

import '../styles/FormLogin.css';
import logo from '../images/logo.png';

const FormLogin = props => {

    return (

        <div className="form-login">
            <img className="avatar" src={logo} alt="logo de SPYmovil" />
            <h1>Login</h1>
            <form onSubmit={props.handleSubmit}>

                <label htmlFor="username">Usuario:</label>
                <input type="text" value={props.username} name='username' placeholder="Ingrese nombre de usuario" onChange={props.handleChange} />

                <label htmlFor="password">Contraseña:</label>
                <input type="password" name='password' placeholder="Contraseña" value={props.password} onChange={props.handleChange} />

                <input type="submit" value="Enviar" />
            </form>
        </div>

        // <Form onSubmit={props.handleSubmit}>
        //     <Form.Group controlId="formBasicEmail">
        //         <h1>Login</h1>
        //         <Form.Label>Usuario</Form.Label>
        //         <Form.Control type="text" value={props.username} name='username' placeholder="Ingrese nombre de usuario" onChange={props.handleChange} />
        //     </Form.Group>
        //     <Form.Group controlId="formBasicPassword">
        //         <Form.Label>Contraseña</Form.Label>
        //         <Form.Control type="password" name='password' placeholder="Contraseña" value={props.password} onChange={props.handleChange} />
        //     </Form.Group>
        //     <Button variant="primary" type="submit">
        //         Enviar
        //     </Button>
        // </Form>
    )
}
export default FormLogin