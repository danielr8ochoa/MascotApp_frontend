import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'
import clienteAxios from '../config/axios'
import { FaApple, FaGooglePlay, FaGoogle } from "react-icons/fa";

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
                <div className="flex justify-center">
            <a title="logo" href="/"><img src="../assets/MascotApp.PNG"></img></a>
        </div>
      <div>
          <h1 className="text-teal-600 font-black text-6xl mt-5 text-center">Iniciar <span className="text-black">Sesión</span></h1>
      </div>
        <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center">
                <div className="flex justify-center">
                    <video autoPlay preload muted width="400" height="280" loop>
                        <source src="../assets/perro.mp4" type="video/mp4"></source>
                    </video>
                </div>


                <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                    {msg && <Alerta 
                        alerta={alerta}
                    />}

                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label
                                className="uppercase text-gray-600 block text-xl font-bold"
                            >
                                Email
                            </label>
                            <input 
                                type="email"
                                placeholder="Email de Registro"
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="my-5">
                            <label
                                className="uppercase text-gray-600 block text-xl font-bold"
                            >
                                Password
                            </label>
                            <input 
                                type="password"
                                placeholder="Tu Password"
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-center">
                        <input
                            type="submit"
                            value="Iniciar sesión"
                            className="bg-teal-500 hover:bg-teal-400 text-white uppercase font-bold mt-5 mb-2 py-3 px-10 w-full border-b-4 border-teal-700 hover:border-teal-500 hover:cursor-pointer rounded-xl md:w-auto"
                        />
                    </div>

                    <div className="flex justify-center">
                        
                        <button type="button" className="bg-red-500 hover:bg-red-400 text-white uppercase font-bold mt-2 mb-3 py-3 px-10 w-full border-b-4 border-red-700 hover:border-red-500 hover:cursor-pointer rounded-xl md:w-auto inline-flex justify-center">
                        <FaGoogle size={22} className="mr-2"/>
                        Entrar con Google
                    </button>
                    </div>

                        <div className="flex justify-between">
                            <button type="button" className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-4 py-4 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                            <FaApple size={25}/>
                            Disponible en AppStore
                            </button>

                            <button type="button" className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-4 py-4 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                            <FaGooglePlay size={25}/>
                            Disponible en PlayStore
                            </button>
                        </div>

                    </form> 

                    <nav className='mt-10 lg:flex lg:justify-between'>
                        <Link 
                            className='block text-center my-5 text-gray-500'
                            to="/registrar">¿No tienes una cuenta? Regístrate</Link >
                        <Link 
                            className='block text-center my-5 text-gray-500'
                            to="/olvide-password">Olvide mi Password</Link >
                    </nav>
                </div>
                </main>
        </>
    );
};

export default Login;