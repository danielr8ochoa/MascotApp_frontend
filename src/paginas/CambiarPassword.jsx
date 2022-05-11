import { useState } from "react";
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {

  const { guardarPassword } = useAuth()

  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState({
    pass_actual: '',
    pass_nuevo: '',
    pass_confirmar: ''
  })

  const handleSubmit = async e => {
    e.preventDefault();
    if( Object.values(password).some(campo => campo === '')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password.pass_confirmar !==  password.pass_nuevo) {
      setAlerta({ msg: 'Las contraseñas no son iguales', error: true});
      return;
    }

    if(password.pass_nuevo.length < 6 ) {
      setAlerta({ msg: 'El password es muy corto, agrega al menos 6 caracteres', error: true});
      return;
    }

    const respuesta = await guardarPassword(password)

    setAlerta(respuesta)
  }

  const { msg } = alerta

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">
        Cambiar contraseña
      </h2>

      <p className="text-xl mt-5 mb-10 text-center">
        Actualiza tu {''} 
        <span className="text-teal-600 font-bold">contraseña</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

          <form
            onSubmit={handleSubmit}
          >
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600"> Contraseña actual</label>
              <input type="password"
                     className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                     name="pass_actual"
                     placeholder="Ingresa tu contraseña actual"
                     onChange={e => setPassword({
                       ...password,
                       [e.target.name] : e.target.value
                     })}
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600"> Nueva contraseña </label>
              <input type="password"
                     className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                     name="pass_nuevo"
                     placeholder="Ingresa tu nueva contraseña"
                     onChange={e => setPassword({
                      ...password,
                      [e.target.name] : e.target.value
                    })}
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600"> Confirmar contraseña </label>
              <input type="password"
                     className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                     name="pass_confirmar"
                     placeholder="Repite la nueva contraseña"
                     onChange={e => setPassword({
                      ...password,
                      [e.target.name] : e.target.value
                    })}
              />
            </div>

            <input 
                type="submit"
                value="Actualizar contraseña"
                className="bg-teal-500 hover:bg-teal-400 text-white uppercase font-bold mt-5 mb-5 py-3 px-10 w-full border-b-4 border-teal-600 hover:border-teal-500 hover:cursor-pointer rounded-xl transition-colors"
            />
          </form>
          {msg && <Alerta alerta={alerta}/>}

        </div>
      </div>
    </>
  )
}

export default CambiarPassword