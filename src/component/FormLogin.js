import React from 'react'
import { Form, Button } from 'react-bootstrap';


const FormLogin = props => {

    return (

        <Form onSubmit={props.handleSubmit}>

            <Form.Group controlId="formBasicEmail">
                <h1>Login</h1>
                <Form.Label>Usuario</Form.Label>
                <Form.Control type="text" value={props.username} name='username' placeholder="Ingrese nombre de usuario" onChange={props.handleChange} />

            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name='password' placeholder="Contraseña" value={props.password} onChange={props.handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Enviar
            </Button>

        </Form>

    )
}

export default FormLogin