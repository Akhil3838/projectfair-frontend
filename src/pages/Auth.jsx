import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Await, Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { isLoginAuthContext } from '../context/Contextshare'



function Auth({register}) {
  const {setIsLoginStatus}=useContext(isLoginAuthContext)
  const navigate=useNavigate()
  const [userDetails,setUserDetails] = useState({
    username:"",
    email:"",
    password:""
  })
  const handleRegister = async (e)=>{
    e.preventDefault()
const {username, email,password}=userDetails
    if (!username || !email || !password) {
      toast.info("please fill the form completely")
      
    } else {
      const result = await registerApi(userDetails)
   
      console.log(result);
      if (result.status == 200) {
       toast.success("registration suceessfully")
       setUserDetails({
         username:"",
         email:"",
         password:""
       })
       navigate('/login')
       
      } else {
       toast.error("something went wrong")
       setUserDetails({
         username:"",
         email:"",
         password:""
       })
       
      }
   
   
    }
  }
  const handleLogin = async(e)=>{
    e.preventDefault()
    const {email ,password} = userDetails

    if (!email || !password) {
      toast.info("please fill the form completely")
      
    } else {
      const result = await loginApi({email,password})
      console.log(result);
      if (result.status==200) {
        toast.success("login successfull")
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
        setIsLoginStatus(true)
        navigate('/')
        
      }
      else{
        toast.error("something went wrong")
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
      }
      
      
    }
  }
  
  return (
    <>
    <div style={{width:"100%",height:"100vh",display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div  className="container w-75">
       <h4 className='text-warning'> <FontAwesomeIcon icon={faArrowLeft} className='me-2'/>Back to home</h4>
       <div className='bg-success p-3'>
                     <div className="row">
          <div className="col-md-6 p-4 d-flex justify-content-center align-items-center">
            <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="" width={'50%'} />
          </div>
          <div className="col-md-6  p-4 d-flex justify-content-center align-items-center text-light">
         
         <form className='w-100'>
            <h4 className='text-light text-center'>  <FontAwesomeIcon icon={faStackOverflow}/>Project Fair</h4>

           { register ? <h5 className='text-center'>sign in to your account</h5>
           : <h5 className='text-center'>sign up to your account</h5>}

{ register&&   <div className='mb-4'>
            <input type="text" className='form-control rounded-0' value={userDetails.username} placeholder='Username' onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})}/>

            </div>
}            <div className='mb-4'>
            <input type="text" className='form-control rounded-0' value={userDetails.email} placeholder='Email id'  onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}/>
  
            </div>
            <div className='mb-4'>
            <input type="text" className='form-control rounded-0' value={userDetails.password} placeholder='Password'  onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}/>
  
            </div>
{  register?         <div>
             <button type='button' className='w-100 bg-danger' onClick={handleRegister}>register </button>
             <p>Allready a user? Click here to<Link to={'/login'}>Login</Link></p>

           </div>
           :
           <div>
             <button className='w-100 bg-danger' type='button' onClick={handleLogin}>Login </button>
             <p>new user ? Click here to <Link to={'/register'}>Register</Link></p>

           </div>
}           
         </form>
          </div>
        </div>

       </div>
      </div>
    </div>
    <ToastContainer autoClose={2000} theme="colored" position='top-center' />
    </>
  )
}

export default Auth