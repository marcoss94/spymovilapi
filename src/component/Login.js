import React, { Component } from 'react'
import Loading from './Loading';
import FatalError from './FatalError';
import FormLogin from './FormLogin';
import '../App.css';
import '../styles/Login.css';


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            errorRefresh: false,
            contador: 1,
            idInterval: null

        }

    }

    handleChange = async event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ error: {} });
        this.setState({ boolError: true });
        this.setState({ load: true });

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

        try {
            const reqAuth = await fetch("http://api.spymovil.com/auth/token/", requestOptions);
            const result = await reqAuth.json();

            this.setState({ refresh: result.refresh });
            this.setState({ access: result.access });
            this.setState({ detail: result.detail });

            if (result.detail !== undefined || result.username !== undefined || result.password !== undefined) {
                this.setState({ errorCredenciales: true });
                this.setState({ error: result });
                this.setState({ boolError: false });
                this.setState({ load: false });
            }

            this.consultaDatos();

        } catch (error) {
            this.setState({ error: "El servidor no responde" });
            this.setState({ boolError: false });
            this.setState({ load: false });
            this.consultaDatos();
        }

    }

    consultaRefresh = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("refresh", this.state.refresh);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        try {

            const reqRefresh = await fetch("http://api.spymovil.com/auth/token/refresh/", requestOptions);
            const result = await reqRefresh.json();

            if (!this.state.errorCredenciales) {
                this.setState({ access: "" });
                this.setState({ access: result.access });
                this.setState({ detail: result.detail });

                if (result.detail !== undefined || result.refresh !== undefined) {
                    this.setState({ error: result });
                    this.setState({ boolError: false });
                    this.setState({ errorRefresh: true });
                }
            }

            this.setState({ load: false, contador: 0 });

        } catch (error) {
            this.setState({ error: "El servidor no responde" });
            this.setState({ boolError: false });
        }
    }

    consultaDatos = async () => {
        this.setState({ load: true });

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.state.access);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const reqData = await fetch("http://api.spymovil.com/data/online/", requestOptions);
            const resData = await reqData.json();

            this.setState({ res: {} });
            this.setState({ res: resData });

            if (resData.detail !== undefined && !this.state.errorCredenciales && !this.state.errorRefresh) {
                this.setState({ error: resData });
                this.setState({ boolError: false });

            } else {
                this.props.cargarListado(this.state.res);
            }

            this.myInterval = setInterval(async () => {
                const { contador } = this.state

                if (contador < 4) {

                    /** Bloque que se repite */

                    const reqData2 = await fetch("http://api.spymovil.com/data/online/", requestOptions);
                    const resData2 = await reqData2.json();

                    this.setState({ res: {} });
                    this.setState({ res: resData2 });

                    if (resData2.detail !== undefined && !this.state.errorCredenciales && !this.state.errorRefresh) {
                        this.setState({ error: resData2 });
                        this.setState({ boolError: false });

                    } else {
                        this.props.cargarListado(this.state.res);
                    }

                    /** Bloque que se repite */
                    this.setState(({ contador }) => ({
                        contador: contador + 1
                    }))
                }
                if (contador === 4) {
                    this.consultaRefresh();
                    this.setState(({ contador }) => ({
                        contador: 0
                    }))
                }
            }, 1000)

            if (this.state.boolError) {
                this.props.logeado(true);

            }
            this.setState({ load: false });

        } catch (error) {
            this.setState({ error: "El servidor no responde" });
            this.setState({ boolError: false });
            this.setState({ load: false });
        }

    }

    render() {

        return (
            <div className="App">
                <header className="App-header">

                    <div className="login">
                        <FormLogin handleChange={this.handleChange} handleSubmit={this.handleSubmit} state={this.state}></FormLogin>

                        <div className="error">
                            <FatalError error={this.state.error} boolError={this.state.boolError}></FatalError>
                        </div>
                        <div className="load">
                            <Loading load={this.state.load}></Loading>
                        </div>
                    </div >

                </header>
            </div >
        )

    }
}
