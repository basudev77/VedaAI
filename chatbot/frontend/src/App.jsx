import React from 'react'
import Login from './pages/login'
import Home from './pages/home'
import Register from './pages/Register'
import { Route, Routes, Link } from 'react-router-dom'

function App() {
  return (
    <div className='h-screen w-screen'>
      <header className='h-[10%] w-screen bg-sky-300 flex items-center justify-between px-8'>
        <h1 className='bg-blue-600 h-10 w-20 text-white rounded-2xl flex justify-center items-center'>LOGO</h1>
        <div className='flex justify-center items-center gap-16'>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </div>
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>


  )
}

export default App