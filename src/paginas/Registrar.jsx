import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios'
import Footer from '../components/Footer'
import { FaGoogle } from "react-icons/fa";


const Registrar = () => {
   const [ nombre, setNombre] = useState('')
   const [ email, setEmail] = useState('')
   const [ password, setPassword] = useState('')
   const [ repetirPassword, setRepetirPassword] = useState('')
   const [ pais, setPais] = useState('')

   const [alerta, setAlerta] = useState({})
   
   const handleSubmit = async e => {
      e.preventDefault();    
      
      const regEx = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g


      if([nombre, email, password, repetirPassword, pais].includes('')) {
        setAlerta({ msg: 'Hay campos vacíos', error: true});
        return;
      } else if(!regEx.test(email)) {
        setAlerta({ msg: 'Correo inválido', error: true});
        return;
      }

      if(password !== repetirPassword) {
        setAlerta({ msg: 'Los password no son iguales', error: true});
        return;
      }

      if(password.length <6 ) {
        setAlerta({ msg: 'El password es muy corto, agrega al menos 6 caracteres', error: true});
        return;
      }

      setAlerta({})

      // Crear el usuario en la API
      try {
        await clienteAxios.post('/veterinarios', { nombre, email, password, pais })

        setAlerta({
          msg: '¡Creado correctamente! Revisa tu e-mail.',
          error: false
        })
        
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }
   }

   const { msg } = alerta;


   return (
    <>
        <div className="flex justify-center">
            <a title="logo" href="/"><img src="src/assets/MascotApp.PNG"></img></a>
        </div>
        <div>
            <h1 className="text-black font-black text-6xl mt-5 text-center">Regístrate y Prueba <span className="text-teal-600">Gratis 30 Días</span></h1>
        </div>

        <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center">

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {msg && <Alerta 
                    alerta={alerta}
                />}

                <form
          onSubmit={handleSubmit}
        >
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                    Nombre*
                </label>
                <input
                    type="text"
                    placeholder="Ingresa tu nombre"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                    Correo electrónico*
                </label>
                <input
                    type="email"
                    placeholder="Ingresa tu correo"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                    País*
                </label>
                <select id="countries" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={pais}
                onChange={e => setPais(e.target.value)}
                >
                  <option value="México">México</option>
                  <option value="Alemania">Alemania</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Brasil">Brasil</option>
                  <option value="Belice">Belice</option>
                  <option value="Canadá">Canadá</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Estados Unidos">Estados Unidos</option>
                  <option value="Perú">Perú</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Venezuela">Venezuela</option>
                </select>
            </div>

            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                  Contraseña*
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

          <div>
            <p className="uppercase text-gray-700 block text-sm font-bold"> * Campos obligatorios</p>
          </div>

          { msg && <Alerta 
            alerta={alerta}
          /> }

          <div className="flex justify-center">
              <input
                  type="submit"
                  value="Crear cuenta"
                  className="bg-teal-500 hover:bg-teal-400 text-white uppercase font-bold mt-5 py-3 px-10 w-full border-b-4 border-teal-700 hover:border-teal-500 hover:cursor-pointer rounded-xl md:w-auto"
              />
          </div>

          <div className="flex justify-center">
                
                <button type="button" className="bg-red-500 hover:bg-red-400 text-white uppercase font-bold mt-2 mb-3 py-3 px-10 w-full border-b-4 border-red-700 hover:border-red-500 hover:cursor-pointer rounded-xl md:w-auto inline-flex">
                <FaGoogle size={22} className="mr-2"/>
                Entrar con Google
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
            <div className="flex justify-center">
                <video autoPlay preload muted width="400" height="280" loop className="rounded-lg">
                    <source src="src/assets/gato.mp4" type="video/mp4"></source>
                </video>
            </div>
            <Footer />
        </main>
    </>
);
  }
  
  export default Registrar;