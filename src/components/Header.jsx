import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isLoginAuthContext } from '../context/Contextshare';


function Header() {
  const navigate =useNavigate()
  const [token,settToken] =useState("")
  const {setIsLoginStatus}=useContext(isLoginAuthContext)
  const logout =()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setIsLoginStatus(false)
    navigate('/')
  }
  useEffect(()=>{
    if(sessionStorage.getItem("token"))
      settToken(sessionStorage.getItem("token"))
  },[])
  return (
    <>
    
      <Navbar className="bg-success">
        <Container>
          <Navbar.Brand className='text-light'>
           
           <Link to={'/'} className='text-light' style={{textDecoration:'none'}}> <h5 > <FontAwesomeIcon icon={faStackOverflow} className='fa-2x' />Project Fair</h5></Link>
{ token &&          <button className='btn btn-warning rounded-0' type='button' onClick={logout}> <FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>
}          </Navbar.Brand>
        </Container>
      </Navbar>

    </>
  )
}

export default Header