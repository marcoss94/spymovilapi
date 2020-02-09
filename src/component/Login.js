import React, { Component } from 'react'







export default class Login extends Component {


    state = {
        username: "",
        password: "",
        refresh: "",
        access: "",
        detail: "",
        errorCredenciales: false,
        res: {}
    }



    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault()



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
                    this.props.cargarError(result)
                    this.props.cargarBool(false)

                }
                this.consulta();



            })
            .catch(error => console.log("erer"));

    }

    consulta = () => {
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

                if (result.detail !== undefined && !this.state.errorCredenciales) {
                    this.props.cargarError(result)
                    this.props.cargarBool(false)

                }

                this.props.cargarListado(result)
                this.props.logeado(true)
                // console.log(result)

                // this.props.cargarError(result)

            })
            .catch(error => console.log(error));

    }


    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
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
                </form>




            </div >
        )
    }
}
