import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth"
import{ useEffect, useState } from 'react'
import Alerta from '../components/Alerta'

const EditarPerfil = () => {

  const { auth, actualizarPerfil } = useAuth()
  const [perfil, setPerfil] = useState({})
  const [alerta, setAlerta] = useState({})

  useEffect ( () => {
    setPerfil(auth)
  }, [auth])

  const handleSubmit = async e => {
    e.preventDefault();

    const { nombre, email } = perfil

    if([nombre, email].includes('')){
      setAlerta({
        msg: 'Nombre y Correo son obligatorios',
        error: true
      })
      return
    }

    const resultado = await actualizarPerfil(perfil)

    setAlerta(resultado)
  }

  const {msg} = alerta;
  
  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">
        Editar perfil
      </h2>

      <p className="text-xl mt-5 mb-10 text-center">
        Actualiza tu {''} 
        <span className="text-teal-600 font-bold">informaci&oacute;n</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

          <form
            onSubmit={handleSubmit}
          >
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600"> Nombre</label>
              <input type="text"
                     className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                     name="nombre"
                     value={perfil.nombre || ''}
                     onChange={e => setPerfil({
                       ...perfil,
                       [e.target.name] : e.target.value
                     })}
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600"> Sitio web</label>
              <input type="text"
                     className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                     name="web"
                     value={perfil.web || ''}
                     onChange={e => setPerfil({
                       ...perfil,
                       [e.target.name] : e.target.value
                     })}
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600"> Tel&eacute;fono</label>
              <input type="number"
                     className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                     name="telefono"
                     value={perfil.telefono || ''}
                     onChange={e => setPerfil({
                       ...perfil,
                       [e.target.name] : e.target.value
                     })}
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600"> Correo electr&oacute;nico</label>
              <input type="email"
                     className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                     name="email"
                     value={perfil.email || ''}
                     onChange={e => setPerfil({
                       ...perfil,
                       [e.target.name] : e.target.value
                     })}
              />
            </div>

            <input 
                type="submit"
                value="Guardar cambios"
                className="bg-teal-600 hover:bg-teal-500 text-white uppercase font-bold mt-5 mb-5 py-3 px-10 w-full border-b-4 border-teal-700 hover:border-teal-600 hover:cursor-pointer rounded-xl transition-colors"
            />
          </form>
          {msg && <Alerta alerta={alerta}/>}

        </div>
      </div>
    </>
  )
}

export default EditarPerfil