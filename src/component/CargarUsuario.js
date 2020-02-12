import { useState, useEffect } from 'react'


const CargarUsuario = () => {

    const [store, setStore] = useState(null)
    const [login, setLogin] = useState(false)

    useEffect(() => {
        let store = JSON.parse(localStorage.getItem('login'));
        setStore(store)
        if (store && store.login) {
            setLogin(true)
        }
    }, []);




    console.log(login)
    return { store, login }
}

export default CargarUsuario