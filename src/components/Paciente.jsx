import { FaTrashAlt, FaEdit } from "react-icons/fa";
import usePacientes from "../hooks/usePacientes";

const Paciente = ({paciente}) => {

  const { setEdicion, eliminarPaciente } = usePacientes()

  const { telefono, fecha, nombre, propietario, sintomas, _id} = paciente;

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha)
    return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha)
  }

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold uppercase text-teal-700 my-2">Nombre: {''}
        <span className="font-normal normal-case text-black">{nombre}</span>
      </p>
      <p className="font-bold uppercase text-teal-700 my-2">propietario: {''}
        <span className="font-normal normal-case text-black">{propietario}</span>
      </p>
      <p className="font-bold uppercase text-teal-700 my-2">Tel&eacute;fono: {''}
        <span className="font-normal normal-case text-black">{telefono}</span>
      </p>
      <p className="font-bold uppercase text-teal-700 my-2">Fecha: {''}
        <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span>
      </p>
      <p className="font-bold uppercase text-teal-700 my-2">Motivo: {''}
        <span className="font-normal normal-case text-black">{sintomas}</span>
      </p>

      <div className="flex justify-between my-5">
        <button 
        type="button"
        className="bg-blue-500 hover:bg-blue-400 text-white uppercase font-bold mt-5 py-2 px-10 border-b-4 border-blue-700 hover:border-blue-500 hover:cursor-pointer rounded-xl transition-colors" 
        onClick={() => setEdicion(paciente)}
        >
          Editar <FaEdit/>
        </button> 

        <button 
        type="button" 
        className="bg-red-600 hover:bg-red-500 text-white uppercase font-bold mt-5 py-3 px-10 border-b-4 border-red-700 hover:border-red-600 hover:cursor-pointer rounded-xl transition-colors" 

        // className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg" 
        onClick={() => eliminarPaciente(_id)}
        >
          Eliminar <FaTrashAlt/>
        </button>
      </div>
    </div>
  )
}

export default Paciente