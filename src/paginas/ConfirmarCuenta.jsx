import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})

    const params = useParams()
    const { id } = params

    useEffect(() => {
      const confirmarCuenta = async () => {
        try {
          const url = `/veterinarios/confirmar/${id}`
          const { data } = await clienteAxios(url)
          setCuentaConfirmada(true)
          setAlerta({
            msg: data.msg
          })

        } catch (error) {
           setAlerta({
            msg: error.response.data.msg,
            error: true
           })
           
        }

        setCargando(false)
      }
      confirmarCuenta();
    }, [])

    return (
      <> 
        <div>
          <div className="flex justify-center">
          <a title="logo" href="/"><img src="../src/assets/MascotApp.PNG"></img></a>
          </div>          
          <h1 className="text-teal-600 font-black text-6xl mt-12">Confirma tu Cuenta y Comienza a Administrar tus <span className="text-black">Pacientes</span></h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          {!cargando && 
            <Alerta 
            alerta={alerta}
            />}

            {cuentaConfirmada && (
            <Link className="block text-center my-5 text-gray-500 hover:text-slate-800" to="/">Iniciar sesión</Link>
            )}
        </div>
      </>
    )
  }
  
  export default ConfirmarCuenta;