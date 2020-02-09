import React, { useState } from 'react';
import './App.css';
import Login from './component/Login';
import List from './component/List';

import FatalError from './component/FatalError';



function App() {

  const [listado, setListado] = useState([])
  const [login, setLogin] = useState(false)
  const [error, setError] = useState("")


  const cargarError = (isError) => {
    setError(isError)
  }

  const logeado = (isLogin) => {
    setLogin(isLogin)
  }
  const cargarListado = (lista) => {
    setListado(lista)
  }




  if (!login) {
    return <Login cargarListado={cargarListado} logeado={logeado} cargarError={cargarError} ></Login>
  }

  // if (!error) {
  //   return <FatalError />
  // }


  return (
    <div className="App">
      <header className="App-header">

        <h1>SPYmovil</h1>
        <p>{error}</p>
        <List listado={listado}  ></List>
      </header>
    </div>
  );
}

export default App;
