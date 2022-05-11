import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'
import clienteAxios from '../config/axios'
import Footer from '../components/Footer'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const { setAuth } = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/login', {email, password})
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/admin')
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
          <a title="logo" href="/"><img src="../images/MascotApp.PNG"></img></a>
          <h1 className="text-teal-600 font-black text-6xl mt-12">Iniciar <span className="text-black">Sesión</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

            {msg && <Alerta 
            alerta={alerta}
            />}

        <form onSubmit={handleSubmit}>
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                    Correo electrónico
                </label>
                <input
                    type="email"
                    placeholder="Ingresa tu correo"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value = {email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                    Contraseña
                </label>
                <input
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value = {password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <input
                type="submit"
                value="Iniciar sesión"
                className="bg-teal-500 hover:bg-teal-400 text-white uppercase font-bold mt-5 py-3 px-10 w-full border-b-4 border-teal-700 hover:border-teal-500 hover:cursor-pointer rounded-xl md:w-auto"
                // " font-bold mt-5  hover:bg-teal-700  "
            />

        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
            <Link className="block text-center my-5 text-gray-500 hover:text-slate-800" to="/registrar">¿Aún no tienes una cuenta? ¡Regístrate!</Link>
            <Link className="block text-center my-5 text-gray-500 hover:text-slate-800"  to="/olvide-password">Olvidé mi contraseña.</Link>
        </nav>
        <Footer />
      </div>

      </>
    )
  }
  
  export default Login;