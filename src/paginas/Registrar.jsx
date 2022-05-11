import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios'

const Registrar = () => {
   const [ nombre, setNombre] = useState('')
   const [ email, setEmail] = useState('')
   const [ password, setPassword] = useState('')
   const [ repetirPassword, setRepetirPassword] = useState('')

   const [alerta, setAlerta] = useState({})
   
   const handleSubmit = async e => {
      e.preventDefault();

      if([nombre, email, password, repetirPassword].includes('')) {
        setAlerta({ msg: 'Hay campos vacíos', error: true});
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
        await clienteAxios.post('/veterinarios', { nombre, email, password })

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
        <div>
          <a title="logo" href="/"><img src="../images/MascotApp.PNG"></img></a>
          <h1 className="text-teal-600 font-black text-6xl mt-12">Crea tu Cuenta y Pruebra <span className="text-black">Gratis por 30 Días </span></h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          
          { msg && <Alerta 
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

            <input
                type="submit"
                value="Crear cuenta"
                className="bg-teal-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-teal-700 md:w-auto "
            />

          </form>

          <nav className="mt-10 lg:flex lg:justify-between">
            <Link className="block text-center my-5 text-gray-500 hover:text-slate-800" to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
            <Link className="block text-center my-5 text-gray-500 hover:text-slate-800"  to="/olvide-password">Olvidé mi contraseña.</Link>
        </nav>

        </div>

      </>
    )
  }
  
  export default Registrar;