import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { FaSignOutAlt, FaEdit } from "react-icons/fa";

const Header = () => {

    const { cerrarSesion} = useAuth()

  return (
    <header className="py-10 bg-teal-600">
        
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">

            <h1 className="font-bold text-2xl text-white text-center">Administrador de {''}
            <span className=" font-black text-black">Pacientes</span> </h1>

            <nav className="flex flex-col items-center lg:flex-row gap-6 mt-5 lg:mt-0">
                <Link to="/admin" className="text-white text-md uppercase font-bold hover:text-slate-800">Pacientes</Link>
                
                <Link to="/admin/perfil" className="text-white text-md uppercase font-bold hover:text-slate-800 ">Perfil  <FaEdit/></Link>
                
                <button 
                    type="button" 
                    className="text-white text-md uppercase font-bold hover:text-slate-800"
                    onClick={cerrarSesion}
                    >Cerrar sesi&oacute;n
                    <FaSignOutAlt />
                </button>
            </nav>
        </div>

    </header>
  )
}

export default Header