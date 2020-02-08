import { useState, useEffect } from 'react';
// import Config from './../config/Config';



const useHooks = () => {


    const [usuario, setUsuario] = useState("")
    const [password, setPassword] = useState("")
    const [refresh, setRefresh] = useState("")
    const [access, setAccess] = useState("")
    const [access2, setAccess2] = useState("")
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)



    useEffect(() => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", "desarrollo");
        urlencoded.append("password", "spymovil2020 ");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        // // poner el refresh en la consulta dos y el resultado que es el access 2 va en la tercera consulta.

        var myHeaders2 = new Headers();
        myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded2 = new URLSearchParams();
        urlencoded2.append("refresh", refresh);


        var requestOptions2 = {
            method: 'POST',
            headers: myHeaders2,
            body: urlencoded2,
            redirect: 'follow'
        };


        // var myHeaders3 = new Headers();
        // myHeaders3.append("Authorization", "Bearer " + access);
        // myHeaders3.append("Content-Type", "application/x-www-form-urlencoded");

        // var urlencoded3 = new URLSearchParams();

        // var requestOptions3 = {
        //     method: 'GET',
        //     headers: myHeaders3,
        //     body: urlencoded3,
        //     redirect: 'follow'
        // };




        const fetchResourse = async () => {


            try {

                let res = await fetch("http://api.spymovil.com/auth/token/", requestOptions)
                let data = await res.json()
                setRefresh(data.refresh)
                setAccess(data.access)

                setLoading(false)


            } catch (error) {
                setLoading(false)
                setError(error)

            }
        }

        const fetchResourse2 = async () => {

            try {
                let aux = await fetch("http://api.spymovil.com/auth/token/refresh/", requestOptions2)
                let data2 = await aux.json()
                setAccess2(data2.access)



                // let aux1 = await fetch("http://api.spymovil.com/data/online/", requestOptions)
                // let data3 = await aux1.json()
                // setResult(data3)
            } catch (error) {
                setLoading(false)
                setError(error)

            }

        }

        fetchResourse();
        fetchResourse2();

    }, [])






    return { result, refresh, access, access2, loading, error }
}

export default useHooks