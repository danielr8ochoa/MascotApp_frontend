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

          
    const regEx = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    const regExTel = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    
    const { nombre, email, telefono } = perfil

    if([nombre, email].includes('')){
      setAlerta({
        msg: 'Nombre y Correo son obligatorios',
        error: true
      })
      return
    } else if(!regEx.test(email)) {
      setAlerta({ msg: 'Correo inválido', error: true});
      return;
    } 

    if(telefono.length > 0) {
      if(!regExTel.test(telefono) || telefono.length < 10) {
        setAlerta({ msg: 'El teléfono debe incluir 10 dígitos', error: true});
        return;
      }
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
              <label className="uppercase font-bold text-gray-600"> Nombre completo*</label>
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
                     placeholder="Ingresa la URL de tu sitio web"
                     value={perfil.web || ''}
                     onChange={e => setPerfil({
                       ...perfil,
                       [e.target.name] : e.target.value
                     })}
              />
            </div>

            <div className="my-3">
            <label className="uppercase font-bold text-gray-600">
                        País*
                    </label>
                    <select                                   
                      className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                      name="pais"
                      value={perfil.pais || ''}
                      onChange={e => setPerfil({
                        ...perfil,
                        [e.target.name] : e.target.value
                      })}
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


            <div className="my-3">
              <label className="uppercase font-bold text-gray-600"> Tel&eacute;fono</label>
              <input type="telephone"
                     className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                     name="telefono"
                     placeholder="Ej. (646)123-45-67"
                     value={perfil.telefono || ''}
                     onChange={e => setPerfil({
                       ...perfil,
                       [e.target.name] : e.target.value
                     })}
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600"> Correo electr&oacute;nico*</label>
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
            
            <p className="uppercase font-bold text-gray-600">* Campos obligatorios</p>

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