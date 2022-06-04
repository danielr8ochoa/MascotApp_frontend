import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { FaSignOutAlt, FaEdit, FaDog } from "react-icons/fa";

const Header = () => {

    const { cerrarSesion} = useAuth()

  return (
    <header className="py-10 bg-teal-600">
        
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">

            <h1 className="font-bold text-5xl text-black text-center">MascotApp  </h1>

            <nav className="flex flex-col items-center lg:flex-row gap-6 mt-5 lg:mt-0">
                <Link to="/admin" className="text-white text-md uppercase font-bold inline-flex items-center hover:text-slate-800">Citas <FaDog className="ml-2" size={20}/></Link>
                
                <Link to="/admin/perfil" className="text-white text-center px-10 text-md uppercase ml font-bold hover:text-slate-800 inline-flex items-center">Ver Perfil {''} <FaEdit className="ml-2" size={20}/></Link>
                
                <button 
                    type="button" 
                    className="text-white text-md uppercase font-bold hover:text-slate-800 inline-flex items-center"
                    onClick={cerrarSesion}
                    >Cerrar sesi&oacute;n
                    <FaSignOutAlt className="ml-2"/>
                </button>
            </nav>
        </div>

    </header>
  )
}

export default Header