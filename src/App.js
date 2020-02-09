import React, { useState } from 'react';
import './App.css';
import Login from './component/Login';
import List from './component/List';

import FatalError from './component/FatalError';



function App() {

  const [listado, setListado] = useState([])
  const [login, setLogin] = useState(false)
  const [error, setError] = useState({})
  const [bool, setBool] = useState(true)
  const [direccion, setDireccion] = useState({
    nombre: 'asc',
    cloro: 'asc',
    ph: 'asc',
    turbidez: 'asc',
    fecha: 'asc',
    tipo: 'asc'
  })


  const cargarError = (isError) => {
    setError(isError)
  }
  const cargarBool = (isBool) => {
    setBool(isBool)
  }

  const logeado = (isLogin) => {
    setLogin(isLogin)
  }
  const cargarListado = (lista) => {
    setListado(lista)
  }

  const sortBy = (key) => {
    console.log(direccion[key])

    if (key === "nombre") {

    } else if (key === "cloro") {
      setListado(listado.sort((a, b) => (direccion[key] === 'asc' ? parseFloat(a[key]) - parseFloat(b[key]) : parseFloat(b[key]) - parseFloat(a[key]))))
    } else if (key === "ph") {

    } else if (key === "turbidez") {

    } else if (key === "fecha") {

    } else if (key === "tipo") {

    }
    // setListado(listado.sort((a, b) => (direccion[key] === 'asc' ? a[key] - b[key] : b[key] - a[key])))
    setDireccion(direccion[key] === 'asc' ? 'desc' : 'asc')
    console.log(direccion[key])

  }



  if (!login) {
    return <Login cargarListado={cargarListado} logeado={logeado} cargarError={cargarError} cargarBool={cargarBool} ></Login>
  }

  console.log(error)
  console.log(bool)
  if (!bool) {
    return <FatalError error={error} />
  }


  return (
    <div className="App">
      <header className="App-header">

        <h1>SPYmovil</h1>

        {/* {console.log(listado.sort((a, b) => parseFloat(a["cloro"]) - parseFloat(b["cloro"])))} */}
        {/* {console.log(listado[0]["nombre"])} */}
        <List listado={listado} sortBy={sortBy}  ></List>
      </header>
    </div>
  );
}

export default App;
