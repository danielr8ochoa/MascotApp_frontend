import {Link} from 'react-router-dom'

const AdminNav = () => {
  return (
    <nav className="ml-3 flex gap-3">
      <Link to="/admin/perfil"
            className="font-bold uppercase text-gray-500 hover:text-slate-800"
      >Perfil
      </Link>
      
      <Link to="/admin/cambiar-password"
            className="font-bold uppercase text-gray-500 hover:text-slate-800"
      >Cambiar contraseña
      </Link>
    </nav>
  )
}

export default AdminNav;