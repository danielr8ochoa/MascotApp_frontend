import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
import Footer from '../components/Footer'

const OlvidePassword = () => {

  const [email, setEmail]  = useState('')
  const [alerta, setAlerta] = useState({})


  const handleSubmit = async e => {
    e.preventDefault()

    if (email === '' || email.length < 5 ) {
      setAlerta({msg: 'El correo es obligatorio', error: true})
      return;
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email })

      console.log(data);

      setAlerta({msg: data.msg})
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <> 
        <div>
          <div className="flex justify-center">
          <a title="logo" href="/"><img src="../images/MascotApp.PNG"></img></a>
          </div>          
          <h1 className="text-teal-600 font-black text-6xl mt-12 text-center">Recupera tu <span className="text-black">Cuenta</span></h1>
        </div>

        <div className="flex justify-center">
          <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

          { msg && <Alerta 
            alerta={alerta}
          />}
          <form
            onSubmit={handleSubmit}
          >
              <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">
                      Correo electrónico*
                  </label>
                  <input
                      type="email"
                      placeholder="Ingresa tu correo electrónico"
                      className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                      value={email}
                      onChange={ e => setEmail(e.target.value)}
                  />
              </div>

              <div>
              <p className="uppercase text-gray-700 block text-sm font-bold"> * Campos obligatorios</p>
            </div>
            
            <div className="flex justify-center">
            <input
                type="submit"
                value="Enviar instrucciones"
                className="bg-teal-500 hover:bg-teal-400 text-white uppercase font-bold mt-5 py-3 px-10 w-full border-b-4 border-teal-700 hover:border-teal-500 hover:cursor-pointer rounded-xl md:w-auto"
              />
            </div>

            </form>

              <nav className="mt-5 lg:flex lg:justify-between">
              <Link className="block text-center my-5 text-gray-500 hover:text-slate-800" to="/registrar">¿Aún no tienes una cuenta? ¡Regístrate!</Link>
              <Link className="block text-center my-5 text-gray-500 hover:text-slate-800" to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
              </nav>
          </div>
        </div>
        <Footer />
    </>
  )
}

export default OlvidePassword;