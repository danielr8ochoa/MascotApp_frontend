import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const NuevoPassword = () => {
  const[password, setPassword] = useState('')
  const[alerta, setAlerta] = useState({})
  const[tokenValido, setTokenValido] = useState(false)
  const[passwordModificado, setPasswordModificado] = useState(false)
  const [repetirPassword, setRepetirPassword] = useState('')

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const comprobarToken = async() => {

      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`)
        setAlerta({
          msg: 'Coloca tu nueva contraseña'
        })
        setTokenValido(true)

      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace',
          error: true
        })
      }
    }
    comprobarToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(password.length < 6 ) {
      setAlerta({
        msg: 'La contraseña debe contener al menos 6 caracteres',
        error: true
      })
      return
    }

    if(password !== repetirPassword) {
      setAlerta({ msg: 'Los password no son iguales', error: true});
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`
      const { data } = await clienteAxios.post(url, { password })
      setAlerta({
        msg: data.msg
      })
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  }
  
  const { msg } = alerta
  return (
    <>
      <div>
          <a title="logo" href="/"><img src="../images/MascotApp.PNG"></img></a>
          <h1 className="text-teal-600 font-black text-6xl mt-12">Restablece tu Contraseña y no Pierdas Acceso a tus <span className="text-black">Pacientes</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

          { msg && <Alerta 
            alerta={alerta}
          />}

          {tokenValido && (
            <>
            <form onSubmit={handleSubmit}>

        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
              Establece tu nueva contraseña
          </label>
          <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                    Repetir contraseña*
                </label>
                <input
                    type="password"
                    placeholder="Repite tu contraseña"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={repetirPassword}
                    onChange={e => setRepetirPassword(e.target.value)}
                />
            </div>

        <input
          type="submit"
          value="Restablecer contraseña"
          className="bg-teal-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-teal-700 md:w-auto "
        />
        </form>

          </>
          )}

          {passwordModificado && 
            <Link className="block text-center my-5 text-gray-500 hover:text-slate-800" to="/"> Iniciar sesión</Link>
          }
      </div>
    </>
  )
}

export default NuevoPassword