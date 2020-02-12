import React, { Component } from 'react'
import { TiFilter } from "react-icons/ti";
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
                <div class="col-sm-6 col-md-4 col-lg-3 mt-4">
                    <div class="card" style={{ width: '18rem', color: "black" }}>
                        <div class="card-block">
                            <h4 class="card-title">Nombre: {nombre}</h4>
                            <div class="card-text">
                                Cloro: {cloro}
                            </div>
                            <div class="card-text">
                                Ph: {ph} {mostrarPh()}
                            </div>
                            <div class="card-text">
                                Turbidez: {turbidez} {mostrarTurbidez()}
                            </div>
                            <div class="card-text">
                                Fecha: {fecha}
                            </div>
                            <div class="card-text">
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
                            <Button onClick={() => this.props.sortBy('nombre')} variant="outline-light"><span><TiFilter /></span>Nombre</Button>
                            <Button onClick={() => this.props.sortBy('cloro')} variant="outline-light"><span><TiFilter /></span>Cloro</Button>
                            <Button onClick={() => this.props.sortBy('ph')} variant="outline-light"><span><TiFilter /></span>pH</Button>
                            <Button onClick={() => this.props.sortBy('turbidez')} variant="outline-light"><span><TiFilter /></span>Turbidez</Button>
                            <Button onClick={() => this.props.sortBy('fecha')} variant="outline-light"><span><TiFilter /></span>Fecha</Button>
                            <Button onClick={() => this.props.sortBy('tipo')} variant="outline-light"><span><TiFilter /></span>Tipo</Button>
                        </ButtonGroup>
                    </div>
                </div>
                <div class="row">
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
