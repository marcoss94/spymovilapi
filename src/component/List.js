import React, { Component } from 'react'
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Button, ButtonGroup } from 'react-bootstrap';
import '../styles/List.css';

export default class List extends Component {

    state = {
        listado: this.props.listado,
        termino: ""
    }

    onChange = e => {
        this.setState({ termino: e.target.value });
    }

    mostrarFichas = (ficha) => {
        const { id, nombre, cloro, ph, turbidez, fecha, tipo } = ficha;

        const mostrarPh = () => {
            if (ph <= 1) {
                return "Muy ácido"
            } else if (ph > 1 && ph <= 4) {
                return "Moderadamente ácido"
            } else if (ph > 4 && ph <= 6) {
                return "Ligeramente ácido"
            } else if (ph > 6 && ph <= 7) {
                return "Neutro"
            } else if (ph > 7 && ph <= 9) {
                return "Ligeramente alcalino"
            } else if (ph > 9 && ph <= 12) {
                return "Moderadamente alcalino"
            } else if (ph > 12 && ph <= 14) {
                return "Muy alcalino"
            } else return "Error en PH"

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
                <div className="col-sm-6 col-md-4 col-lg-3 mt-4">
                    <div className="card" style={{ width: '18rem', color: "black" }}>
                        <div className="card-block">
                            <h4 className="card-title">Nombre: {nombre}</h4>
                            <div className="card-text">
                                Cloro: {cloro}
                            </div>
                            <div className="card-text">
                                Ph: {ph} {mostrarPh()}
                            </div>
                            <div className="card-text">
                                Turbidez: {turbidez} {mostrarTurbidez()}
                            </div>
                            <div className="card-text">
                                Fecha: {fecha}
                            </div>
                            <div className="card-text">
                                {tipo.nombre}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }

    render() {

        return (
            <React.Fragment>
                <div className="form-group col-12">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Buscar"
                        icon="search"
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group col-12">
                    <div className="d-flex flex-column">
                        <ButtonGroup size="sm" className="mt-3">
                            <Button onClick={() => this.props.sortBy('nombre')} variant="outline-light">
                                {
                                    this.props.direccion.nombre === 'asc' ? <span><TiArrowSortedDown /></span> : <span><TiArrowSortedUp /></span>
                                }
                                Nombre
                                </Button>
                            <Button onClick={() => this.props.sortBy('cloro')} variant="outline-light">
                                {
                                    this.props.direccion.cloro === 'asc' ? <span><TiArrowSortedDown /></span> : <span><TiArrowSortedUp /></span>
                                }
                                Cloro
                                </Button>
                            <Button onClick={() => this.props.sortBy('ph')} variant="outline-light">
                                {
                                    this.props.direccion.ph === 'asc' ? <span><TiArrowSortedDown /></span> : <span><TiArrowSortedUp /></span>
                                }
                                pH
                                </Button>
                            <Button onClick={() => this.props.sortBy('turbidez')} variant="outline-light">
                                {
                                    this.props.direccion.turbidez === 'asc' ? <span><TiArrowSortedDown /></span> : <span><TiArrowSortedUp /></span>
                                }
                                Turbidez
                                </Button>
                            <Button onClick={() => this.props.sortBy('fecha')} variant="outline-light">
                                {
                                    this.props.direccion.fecha === 'asc' ? <span><TiArrowSortedDown /></span> : <span><TiArrowSortedUp /></span>
                                }
                                Fecha
                                </Button>
                            <Button onClick={() => this.props.sortBy('tipo')} variant="outline-light">
                                {
                                    this.props.direccion.tipo === 'asc' ? <span><TiArrowSortedDown /></span> : <span><TiArrowSortedUp /></span>
                                }
                                Tipo
                                </Button>
                        </ButtonGroup>
                    </div>
                </div>
                <div className="row">
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
