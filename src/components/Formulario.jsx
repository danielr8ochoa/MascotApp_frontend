import { useState, useEffect } from 'react'
import Alerta from './Alerta'
import usePacientes from '../hooks/usePacientes';
import { HiPencilAlt } from "react-icons/hi";

const Formulario = () => {
    const [nombre, setNombre ] = useState('')
    const [propietario, setPropietario ] = useState('')
    const [telefono, setTelefono ] = useState('')
    const [fecha, setFecha ] = useState('')
    const [sintomas, setSintomas ] = useState('')
    const [id, setId ] = useState(null)

    const [alerta, setAlerta] = useState({})

    const { guardarPaciente, paciente } = usePacientes()

    useEffect( () => {
        if(paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setTelefono(paciente.telefono)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])

    const handleSubmit = e  => {
       e.preventDefault()

       // Validar el formulario 
       if ([nombre, propietario, telefono, fecha, sintomas].includes('')) {
        setAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true
        })
        return;
       }

       guardarPaciente({ nombre, propietario, telefono, fecha, sintomas, id })
       setAlerta({
           msg: '¡Guardado correctamente!'
       })
       setNombre('')
       setPropietario('')
       setTelefono('')
       setFecha('')
       setSintomas('')
       setId('')
    }
    
    const { msg } = alerta

  return (
    <>
          <h2 className="font-black text-3xl text-center">Registrar cita</h2>

            <p className="text-xl mt-5 mb-10 text-center">
            Añade tus {''} <span className="text-teal-600 font-bold"> Pacientes y Adminístralos </span>
            </p>

        <form 
            className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
            onSubmit={handleSubmit}
        >
            <div className="mb-5">
                <label htmlFor="nombre"
                className="text-gray-700 uppercase font-bold">
                    Nombre mascota: </label>

                <input
                id="nombre"
                type="text"
                placeholder="Nombre de la mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="propietario"
                className="text-gray-700 uppercase font-bold">
                    Nombre propietario: </label>

                <input
                id="propietario"
                type="text"
                placeholder="Nombre del propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={propietario}
                onChange={e => setPropietario(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="telefono"
                className="text-gray-700 uppercase font-bold">
                    Tel&eacute;fono del propietario: </label>

                <input
                id="telefono"
                type="number"
                placeholder="Tel&eacute;fono del propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
                />
            </div>


            <div className="mb-5">
                <label htmlFor="fecha"
                className="text-gray-700 uppercase font-bold">
                    Fecha de la cita: </label>

                <input
                id="fecha"
                type="date"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="sintomas"
                className="text-gray-700 uppercase font-bold">
                    Motivo de la consulta: </label>

                <textarea
                id="sintomas"
                placeholder="Describe los s&iacute;ntomas"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={sintomas}
                onChange={e => setSintomas(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                className="bg-teal-500 hover:bg-teal-400 text-white uppercase font-bold mt-5 py-3 px-10 w-full border-b-4 border-teal-700 hover:border-teal-500 hover:cursor-pointer rounded-xl transition-colors"

                value={ id ? 'Guardar cambios' : 'Agregar paciente' }
                
            />
            
        </form>
        {msg && <Alerta alerta={alerta} />}


    </>
  )
};

export default Formulario;