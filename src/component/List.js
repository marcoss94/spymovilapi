import React, { Component } from 'react'
import { TiFilter } from "react-icons/ti";
import { CardColumns, Card, Button } from 'react-bootstrap';

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
                <Card style={{ width: '18rem', color: "black" }}>
                    <Card.Body>
                        <Card.Title>Nombre: {nombre}</Card.Title>
                        <Card.Text>
                            Cloro: {cloro}
                        </Card.Text>
                        <Card.Text>
                            Ph: {ph} {mostrarPh()}
                        </Card.Text>
                        <Card.Text>
                            Turbidez: {turbidez} {mostrarTurbidez()}
                        </Card.Text>
                        <Card.Text>
                            Fecha: {fecha}
                        </Card.Text>
                        <Card.Text>
                            {tipo.nombre}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </React.Fragment>
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
                    <Button onClick={() => this.props.sortBy('nombre')} variant="outline-light"><span><TiFilter /></span>Nombre</Button>
                    <Button onClick={() => this.props.sortBy('cloro')} variant="outline-light"><span><TiFilter /></span>Cloro</Button>
                    <Button onClick={() => this.props.sortBy('ph')} variant="outline-light"><span><TiFilter /></span>pH</Button>
                    <Button onClick={() => this.props.sortBy('turbidez')} variant="outline-light"><span><TiFilter /></span>Turbidez</Button>
                    <Button onClick={() => this.props.sortBy('fecha')} variant="outline-light"><span><TiFilter /></span>Fecha</Button>
                    <Button onClick={() => this.props.sortBy('tipo')} variant="outline-light"><span><TiFilter /></span>Tipo</Button>
                </div>
                <CardColumns>
                    {

                        this.state.listado.map(ficha => {

                            return this.mostrarFichas(ficha)

                        })
                    }
                </CardColumns>
            </React.Fragment>

        )
    }
}
