import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
        <main className="container mx-auto md:grid mt-12 p-5 items-center">
          <Outlet />
        </main>
    </>
  )
}

export default AuthLayout