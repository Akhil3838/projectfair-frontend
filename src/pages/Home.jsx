import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import tittle from '../assets/title.png'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectApi } from '../services/allApi'


function Home() {
  const [token , setToken]=useState("")
  const [homeProject,setHomeProject]=useState([])


  const gethomeProject = async()=>{
    const result= await homeProjectApi()
    setHomeProject(result.data)
    
  }


  useEffect(()=>{
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
      
    }
    gethomeProject()
  },[])


  return (
    <>
    <div className='container-fluid bg-success p-4 mb-4' style={{width:'100%',height:'100vh'}}>
      <Row>
        <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
       <div className='mt-5'>
          <h1 className='text-light' style={{fontSize:'76px'}}>Project Fair</h1>
          <h6>One stop destination for all software development projects</h6>
{ !token? <Link to={'/login'}>
            <button className='btn btn-outline-light  my-4'>Get started <FontAwesomeIcon icon={faArrowRight} className='ms-2' /></button>
  
</Link>  :      
<Link to={'/dashboard'}>
    <button className='btn btn-outline-light  my-4'>Manage project <FontAwesomeIcon icon={faArrowRight}  className='ms-2' /></button>
  
</Link>    
}  
 </div>

        </Col>
        <Col md={6} className='mt-5 d-flex justify-content-center align-items-center flex-column p-2' >
        <img src={tittle} alt=""  />
        </Col>
      </Row>
    </div>
    <div className="containter-fluid">
      <h1 className='text-center my-5'>Explore Our Projects</h1>
      <div className="row mb-4">
        {homeProject?.length>0?
        homeProject?.map((item)=>(<div className="col-md-4 justify-content-center d-flex p-4">
          <ProjectCard project={item}/>
        </div>))
        :null}
      
      </div>
     <Link to={'/project'}> <h5 className='text-center my-5'>See more Projects</h5></Link>
    </div>
    </>
  )
}

export default Home