import React, { Component } from 'react'
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import logo from '../images/logo.png'
import userAvatar from '../images/silueta.jpg'
import '../styles/List.css';

export default class List extends Component {

    state = {
        listado: this.props.listado,
        termino: "",
        phGradient: ""
    }

    onChange = e => {
        this.setState({ termino: e.target.value });
    }

    mostrarFichas = (ficha) => {
        const { id, nombre, cloro, ph, turbidez, fecha, tipo } = ficha;

        const mostrarGradientePH = () => {
            if (ph <= 1) {
                return "linear-gradient(0deg, rgba(180,58,58,1) 0%, rgba(253,29,29,0.8323529240797882) 50%, rgba(252,176,69,0.6866946607744661) 100%)";
            } else if (ph > 1 && ph <= 4) {
                return "linear-gradient(0deg, rgba(230,63,7,1) 0%, rgba(252,247,69,0.7427170697380514) 100%)";
            } else if (ph > 4 && ph <= 6) {
                return "linear-gradient(0deg, rgba(252,247,69,1) 0%, rgba(26,176,12,0.767927153771665) 100%)";
            } else if (ph > 6 && ph <= 7) {
                return "linear-gradient(0deg, rgba(26,176,12,1) 0%, rgba(26,176,12,0.767927153771665) 100%)";
            } else if (ph > 7 && ph <= 9) {
                return "linear-gradient(0deg, rgba(26,176,12,1) 0%, rgba(27,146,53,0.9247898988697041) 28%, rgba(21,64,128,0.8547618876652223) 69%, rgba(17,12,176,0.767927153771665) 100%)";
            } else if (ph > 9 && ph <= 12) {
                return "linear-gradient(0deg, rgba(17,12,176,1) 0%, rgba(176,12,170,0.767927153771665) 100%)";
            } else if (ph > 12 && ph <= 14) {
                return "linear-gradient(0deg, rgba(108,12,176,1) 0%, rgba(176,12,112,0.7959383582534576) 100%)";
            }
        }

        const mostrarGradienteCloro = () => {
            if (cloro <= 2) {
                return "linear-gradient(0deg, rgba(51,216,255,1) 0%, rgba(254,255,225,0.7651260333234856) 100%)";
            } else if (cloro > 2 && cloro <= 4) {
                return "linear-gradient(0deg, rgba(51,216,255,1) 0%, rgba(253,255,185,0.7651260333234856) 100%)";
            } else if (cloro > 4 && cloro <= 5) {
                return "linear-gradient(0deg, rgba(93,224,255,1) 0%, rgba(251,255,122,0.7651260333234856) 100%)";
            } else if (cloro > 5 && cloro <= 7) {
                return "linear-gradient(0deg, rgba(93,224,255,1) 0%, rgba(247,255,57,0.779131635564382) 61%)";
            } else if (cloro > 7 && cloro <= 9) {
                return "linear-gradient(0deg, rgba(62,218,255,1) 0%, rgba(245,255,0,0.779131635564382) 57%)";
            }
        }
        const mostrarGradienteTurbiadez = () => {
            if (turbidez <= 3) {
                return "linear-gradient(0deg, rgba(62,218,255,0.9415966215587798) 34%, rgba(255,255,255,0.8043417195979954) 100%)";
            } else if (turbidez > 3 && turbidez <= 5) {
                return "linear-gradient(0deg, rgba(62,218,255,1) 0%, rgba(255,231,135,0.8043417195979954) 100%)";
            } else if (turbidez > 5 && turbidez <= 7) {
                return "linear-gradient(0deg, rgba(62,218,255,1) 0%, rgba(255,217,63,0.8043417195979954) 100%)";
            } else if (turbidez > 7 && turbidez <= 10) {
                return "linear-gradient(0deg, rgba(62,218,255,1) 0%, rgba(255,204,0,0.8043417195979954) 83%)";
            }
        }

        const mostrarPh = () => {
            if (ph <= 1) {
                return "Muy ácido";
            } else if (ph > 1 && ph <= 4) {
                return "Moderadamente ácido";
            } else if (ph > 4 && ph <= 6) {
                return "Ligeramente ácido";
            } else if (ph > 6 && ph <= 7) {
                return "Neutro";
            } else if (ph > 7 && ph <= 9) {
                return "Ligeramente alcalino";
            } else if (ph > 9 && ph <= 12) {
                return "Moderadamente alcalino";
            } else if (ph > 12 && ph <= 14) {
                return "Muy alcalino";
            } else return "Error en PH";
        }

        const mostrarTurbidez = () => {
            if (turbidez >= 0 && turbidez <= 3) {
                return "Limpio"
            } else if (turbidez > 3 && turbidez <= 10) {
                return "Sucio"
            } else return "Error en Turbidez"
        }

        if (this.state.termino !== "" && nombre.toLowerCase().indexOf(this.state.termino.toLowerCase()) === -1) {
            return null
        }

        return (
            <React.Fragment key={id}>
                <div className="grid-card">
                    <div className="card" style={{ color: "black" }}>
                        <div className="card-block">
                            <div className="card-nombreFecha">
                                <h4 className="card-title">{nombre}</h4>
                                <h5> {fecha}</h5>
                            </div>
                            <div className="propiedades">
                                <div className="card-text">Cloro</div>
                                <div className="card-text">Ph</div>
                                <div className="card-text">Turbidez</div>
                                <div className="prop prop-cloro" >
                                    <div className="liquido-cloro" style={{ background: `${mostrarGradienteCloro()}` }}></div>
                                    {/* <div className="liquido-silueta"></div> */}
                                    <p><strong>{cloro} <br />ppm</strong></p>
                                </div>
                                <div className="prop prop-ph" >
                                    <div className="liquido-ph " style={{ background: `${mostrarGradientePH()}` }}></div>
                                    {/* <div className="liquido-silueta"></div> */}
                                    <p><strong>{ph} </strong></p>
                                </div>
                                <div className="prop prop-turbidez" >
                                    <div className="liquido-turbidez" style={{ background: `${mostrarGradienteTurbiadez()}` }}></div>
                                    {/* <div className="liquido-silueta"></div> */}
                                    <p><strong> {turbidez} <br />ntu </strong></p>
                                </div>
                                <div className="card-text"></div>
                                <div className="card-text"><p>{mostrarPh()}</p></div>
                                <div className="card-text"><p>{mostrarTurbidez()}</p></div>
                            </div>
                            <div className="tipo"><h5>{tipo.nombre}</h5></div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }

    render() {

        return (
            <React.Fragment>

                <div className="cabecera">
                    <div className="titulo">
                        <img className="avatar" src={logo} alt="logo de SPYmovil" />
                    </div>
                    <div className="buscar">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Buscar"
                            icon="search"
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="logout">
                        <div className="user-avatar-box">
                            <img className="user-avatar" src={userAvatar} alt="avatar del usuario" />
                        </div>

                    </div>
                    <div className="buscarResponsive">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Buscar"
                            icon="search"
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="filtro">
                        <button onClick={() => this.props.sortBy('nombre')}>
                            Nombre
                            {
                                this.props.direccion.nombre === 'asc' ? <span><TiArrowSortedDown /></span> : <span><TiArrowSortedUp /></span>
                            }
                        </button>
                        <button onClick={() => this.props.sortBy('cloro')}>
                            Cloro
                            {
                                this.props.direccion.cloro === 'asc' ? <span><TiArrowSortedDown /></span> : <span><TiArrowSortedUp /></span>
                            }
                        </button>
                        <button onClick={() => this.props.sortBy('ph')}>
                            pH
                            {
                                this.props.direccion.ph === 'asc' ? <span><TiArrowSortedDown /></span> : <span><TiArrowSortedUp /></span>
                            }
                        </button>
                        <button onClick={() => this.props.sortBy('turbidez')}>
                            Turbidez
                            {
                                this.props.direccion.turbidez === 'asc' ? <span><TiArrowSortedDown /></span> : <span><TiArrowSortedUp /></span>
                            }
                        </button>
                        <button onClick={() => this.props.sortBy('fecha')}>
                            Fecha
                            {
                                this.props.direccion.fecha === 'asc' ? <span><TiArrowSortedDown /></span> : <span><TiArrowSortedUp /></span>
                            }
                        </button>
                        <button onClick={() => this.props.sortBy('tipo')}>
                            Tipo
                            {
                                this.props.direccion.tipo === 'asc' ? <span><TiArrowSortedDown /></span> : <span><TiArrowSortedUp /></span>
                            }
                        </button>
                    </div>
                    <div className="wave" style={{ height: "225px", overflow: "hidden" }} ><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}><path d="M-7.63,104.90 C103.55,235.15 416.20,-111.23 546.55,95.02 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: "none", fill: "#022446" }}></path></svg></div>
                </div>
                <div className="grid-lista">
                    {
                        this.state.listado.map(ficha => {
                            return this.mostrarFichas(ficha)
                        })
                    }
                </div>
            </React.Fragment>
        )
    }
}
