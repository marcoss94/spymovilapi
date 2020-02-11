import React, { Component } from 'react'
import Loading from './Loading';
import useFetch from '../hooks/useFecth';
import FatalError from './FatalError';
import FormLogin from './FormLogin';

export default class Login extends Component {



    state = {
        username: "",
        password: "",
        refresh: "",
        access: "",
        detail: "",
        errorCredenciales: false,
        res: {},
        load: false,
        error: {},
        boolError: true,
        errorRefresh: false
    }




    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault()

        this.setState({ error: {} })
        this.setState({ boolError: true })

        this.setState({ load: true })
        // const { aux, error } = useFetch(this.state)

        // this.props.cargarError(error)
        // console.log("prueba" + error)



        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", this.state.username);
        urlencoded.append("password", this.state.password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://api.spymovil.com/auth/token/", requestOptions)
            .then(response => response.json())
            .then(result => {


                this.setState({ refresh: result.refresh })
                this.setState({ access: result.access })
                this.setState({ detail: result.detail })

                // console.log(result.detail)
                if (result.detail !== undefined || result.username !== undefined || result.password !== undefined) {
                    this.setState({ errorCredenciales: true })
                    this.setState({ error: result })
                    this.setState({ boolError: false })
                    console.log("primer fetch: " + this.state.error)


                    // this.props.cargarError(result)
                    // this.props.cargarBoolError(false)

                }
                this.setState({ load: false })
                this.consultaRefresh();

            })
            .catch(error => {
                this.setState({ error: "El servidor no responde" })
                this.setState({ boolError: false })
                this.consultaRefresh();
                console.log("despues de consulta()")
                // this.props.cargarError(error)
                // this.props.cargarBoolError(false)

            });

    }

    consultaRefresh = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("refresh", this.state.refresh);

        console.log("asdasdasdasd" + this.state.refresh)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://api.spymovil.com/auth/token/refresh/", requestOptions)
            .then(response => response.json())
            .then(result => {

                if (!this.state.errorCredenciales) {
                    this.setState({ access: result.access })
                    this.setState({ detail: result.detail })

                    console.log(this.state.access)
                    console.log(result)




                    if (result.detail !== undefined || result.refresh !== undefined) {
                        this.setState({ error: result })
                        this.setState({ boolError: false })
                        console.log("segundo fetch: " + this.state.error)
                        this.setState({ errorRefresh: true })
                        // this.props.cargarError(result)
                        // this.props.cargarBoolError(false)

                    }
                }
                // console.log(result.detail)


                this.setState({ load: false })
                this.consultaDatos();

            })
            .catch(error => {
                this.setState({ error: "El servidor no responde" })
                this.setState({ boolError: false })
                this.consultaDatos();
                console.log("despues de consulta()")
                // this.props.cargarError(error)
                // this.props.cargarBoolError(false)

            });
    }

    consultaDatos = () => {

        this.setState({ load: true })
        console.log("se ejecuto ")
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.state.access);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };


        fetch("http://api.spymovil.com/data/online/", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({ res: result })

                if (result.detail !== undefined && !this.state.errorCredenciales && !this.state.errorRefresh) {
                    this.setState({ error: result })
                    this.setState({ boolError: false })
                    console.log("tercer fetch: " + this.state.error)
                    // this.props.cargarError(result)
                    // this.props.cargarBoolError(false)

                } else {
                    this.props.cargarListado(result)


                }

                if (this.state.boolError) {
                    this.props.logeado(true)
                }
                this.setState({ load: false })
                // console.log(result)

                // this.props.cargarError(result)

            })
            .catch(error => {

                this.setState({ error: "El servidor no responde" })
                this.setState({ boolError: false })
                this.setState({ load: false })

            })

    }
    // prueba = () => {
    //     console.log("prueba")
    // }


    render() {

        // setInterval(this.prueba(), 6000);

        // const { aux, refresh } = useFetch(this.state)
        // console.log(aux)
        // console.log(refresh)

        return (
            <div>
                {/* <form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>

                    <label>Username</label>
                    <input
                        name='username'
                        placeholder='Username'
                        value={this.state.username}
                        onChange={this.handleChange}
                    /><br />

                    <label>Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.handleChange}
                    /><br />

                    <input type='submit' />
                </form> */}

                <FormLogin handleChange={this.handleChange} handleSubmit={this.handleSubmit} state={this.state}></FormLogin>

                <FatalError error={this.state.error} boolError={this.state.boolError}></FatalError>

                <Loading load={this.state.load}></Loading>



            </div >
        )
    }
}
