import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { allProjectApi } from '../services/allApi'




function Project() {
  const [isToken ,setIsToken]=useState()
 const [allProject,setAllProject]=useState([])
 const [searchKey,setSearchKey]=useState("")

  const getAllProject = async(searchKey)=>{
    const result = await allProjectApi(searchKey)
    setAllProject(result.data)
   
    
  }
  console.log(allProject);
  useEffect(()=>{
    getAllProject(searchKey)
  },[searchKey])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsToken(sessionStorage.getItem("token"))
    }
   
  },[])
  return (
    <>
    <Header/>
    <div className="container-fluid">
      <h2 className='text-center mt-5'>All projects</h2>

{isToken?<div>
        <div className="row my-4">
          <div className="col-md-4 my-5"></div>
          <div className="col-md-4 my-5 d-flex">
            <input type="text" className='form-control' placeholder='Technologies'  onChange={(e)=>setSearchKey(e.target.value)}/>
            <FontAwesomeIcon icon={faMagnifyingGlass} rotation={90}  style={{marginTop:"12px",marginLeft:'-30px',color:'lightgray'}}/>
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row my-5">
       { allProject?.length>0?
       allProject?.map((item)=>(<div className="col-md-4 p-4">
        <ProjectCard project={item}/>
      </div>)):
      <p className='text-danger ms-5'>no project to show</p>
      }
      
      </div>


 </div>


:<div className="row mt-5 w-100">
  <div className="col-md-4"></div>
  <div className="col-md-4 p-4 d-flex justify-content-center align-items-center flex-column">
    <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="" width={'70%'} height={'300px'} />
    <h4 className='mt-5 text-center'>Please <Link to={'/login'}>Login</Link>Explore more projects</h4>
  </div>
  <div className="col-md-4"></div>
</div>
}      
    
</div>  
  </>
  )
}

export default Project