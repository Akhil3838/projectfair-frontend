import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Project from './pages/Project'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import PagenotFound from './pages/PagenotFound'
import Footer from './components/Footer'
import { useContext } from 'react'
import { isLoginAuthContext } from './context/Contextshare'

function App() {
  const {isLoginStatus} = useContext(isLoginAuthContext)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/project' element={<Project/>} />
      <Route path='/register' element={<Auth  register/> }  />
      <Route path='/login' element={<Auth/>} />
      <Route path='/dashboard' element={isLoginStatus?<Dashboard/>:<PagenotFound/>} />
      <Route path='*' element={<PagenotFound/>} />

    </Routes>
    <Footer/>
    </>
  )
}

export default App
