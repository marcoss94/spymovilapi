import React, { useState } from 'react';
import './App.css';
import Login from './component/Login';
import List from './component/List';


function App() {

  const [listado, setListado] = useState([])
  const [login, setLogin] = useState(false)


  const [direccion, setDireccion] = useState({
    nombre: 'asc',
    cloro: 'asc',
    ph: 'asc',
    turbidez: 'asc',
    fecha: 'asc',
    tipo: 'asc'
  })


  const logeado = (isLogin) => {
    setLogin(isLogin)
  }
  const cargarListado = (lista) => {
    setListado([])
    console.log("se limpio la lista")
    setListado(lista)
  }

  const sortBy = (key) => {
    console.log(direccion[key])

    if (key === "nombre" || key === "fecha") {
      setListado(listado.sort((a, b) => {
        var x = a[key].toLowerCase();
        var y = b[key].toLowerCase();
        if (direccion[key] === 'asc') {
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        } else {
          if (y < x) { return -1; }
          if (y > x) { return 1; }
          return 0;
        }
      }))

    } else if (key === "cloro" || key === "ph" || key === "turbidez") {
      setListado(listado.sort((a, b) => (direccion[key] === 'asc' ? parseFloat(a[key]) - parseFloat(b[key]) : parseFloat(b[key]) - parseFloat(a[key]))))
    } else if (key === "tipo") {
      setListado(listado.sort((a, b) => (direccion[key] === 'asc' ? parseFloat(a[key].id) - parseFloat(b[key].id) : parseFloat(b[key].id) - parseFloat(a[key].id))))
    }
    setDireccion(direccion[key] === 'asc' ? { [key]: 'desc' } : { [key]: 'asc' })
    console.log(direccion[key])

  }



  if (!login) {
    return <Login cargarListado={cargarListado} logeado={logeado} ></Login>
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="container-fluid">
          <h1>SPYmovil</h1>
          <List listado={listado} sortBy={sortBy}  ></List>
        </div>
      </header>
    </div>
  );
}

export default App;
