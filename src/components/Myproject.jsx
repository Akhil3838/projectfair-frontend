import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import EditProject from './EditProject'
import { faGlobe, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { removeUserProject, userProjectApi } from '../services/allApi'
import { addResponseContext, editResponseContext } from '../context/Contextshare'


function Myproject() {
  const {addResponse}= useContext(addResponseContext)
  const [userProject,setUserProject]=useState([])
  const [deleteStatus,setDeleteStatus]=useState(true)
  const {editResponse}=useContext(editResponseContext)

  const getuserProject=async()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
        "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result = await userProjectApi(reqHeader)
    setUserProject(result.data)
    

  }
  console.log(userProject);


  const handleDelete =async(id)=>{
 const result=await removeUserProject(id)
 if(result.status ==200){
  setDeleteStatus(true)
 }
 
 
  }
  
  
  useEffect(()=>{
    getuserProject()
    setDeleteStatus(false)
  },[addResponse,deleteStatus,editResponse])


  return (
    <>
    <div className='shadow p-3'>
      <div className='d-flex mt-4'>
        <h4 className='text-success me-auto'>My project</h4>
        <AddProject/>
      </div>
      {userProject?.length>0?
      userProject.map((item)=>(<div className='p-3 mt-4 d-flex rounded-2' style={{backgroundColor:'lightgrey'}}><h5>{item.title}</h5>
        <div className='d-flex ms-auto align-items-center'>
          <EditProject project={item}/>
          <FontAwesomeIcon  icon={faGithub} className='ms-3 text-warning'/>
          <FontAwesomeIcon  icon={faGlobe} className='ms-3 text-warning'/>
          <FontAwesomeIcon  icon={faTrash} className='ms-3 text-warning' onClick={()=>handleDelete(item._id)}/>
        </div>
  
        </div>)):
        <p>no show</p>
        }

    </div>
    </>
  )
}

export default Myproject