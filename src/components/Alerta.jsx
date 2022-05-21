
const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'bg-red-600' : 
    'from-teal-600 to-teal-600'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10`}>
        {alerta.msg}
    </div>
  )

  }
export default Alerta