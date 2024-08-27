import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/serverUrl';
import { editUserProjectApi } from '../services/allApi';
import { editResponseContext } from '../context/Contextshare';



function EditProject({project}) {
  const {setEditResponse} = useContext(editResponseContext)
  const [projectDetails,setprojectDetails]=useState({
    title:project.title,
    language:project.language,
    github:project.github,
    website:project.website,
    overview:project.overview,
    projectImg:""
  })
  const [show, setShow] = useState(false);
  const [preview,setPreview] =useState("")
  const [key ,setkey]=useState(false)

  //.........................
  const handleClose1 = ()=>{
    setprojectDetails({
     title:project.title,
    language:project.language,
    github:project.github,
    website:project.website,
    overview:project.overview,
    projectImg:""
    })
    setPreview("")
    if (key==false) {
      setkey(true)
    } else {
      setkey(false)
    }
  }
  
  


  const handleClose = () => {setShow(false);
    handleClose1()
  }
  const handleShow = () => setShow(true);
  const handlefile = (e)=>{
    // console.log(e.target.files[0]);
    setprojectDetails({...projectDetails,projectImg:e.target.files[0]})
    
  }
  useEffect(()=>{
    if (projectDetails.projectImg) {
      setPreview(URL.createObjectURL(projectDetails.projectImg))
      
  }
    
  },[projectDetails.projectImg])

  const handleEdit = async()=>{
    const {title,language,github,website,overview,projectImg}=projectDetails
    if (!title || !language || !website || !overview  || !github) {
       alert("Please fill the form completetly")
    } else {
      const reqBody = new FormData()

      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      preview?reqBody.append("projectImg",projectImg):reqBody.append("projectImg",project.projectImage)

      const token = sessionStorage.getItem("token")
      if (token) {
        if (preview) {
          const  reqHeader = {
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          const result =await editUserProjectApi(project._id,reqBody,reqHeader)
          if (result.status==200) {
            alert("edited successfully")
            handleClose()
            setEditResponse(result.data)
          }
          else{
            alert("something went wrong")
            handleClose()
          }
          
        } else {
          const  reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
          const result =await editUserProjectApi(project._id ,reqBody,reqHeader)
          if (result.status==200) {
            alert("edited successfully")
            handleClose()
            setEditResponse(result.data)
          }
          else{
            alert("something went wrong")
            handleClose()
          }
        }
        
      } 


      
    }

    
  }
  

  return (
    <>
<FontAwesomeIcon icon={faPenToSquare} onClick={handleShow} />

<Modal show={show} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor='projimg'>
                <input type="file" id='projimg' style={{display:'none'}} key={preview} onChange={(e)=>handlefile(e)} />
                <img src={preview?preview:`${serverUrl}/uploads/${project?.projectImage}`} alt="" className='w-100' />
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3 mt-3">
                <input type="text" placeholder='title' className='form-control' value={projectDetails.title} onChange={(e)=>setprojectDetails({...projectDetails,title:e.target.value})}/>
              </div>
              <div className="mb-3">
              <input type="text" placeholder='Language' className='form-control'value={projectDetails.language} onChange={(e)=>setprojectDetails({...projectDetails,language:e.target.value})}/>
              </div>
              <div className="mb-3">
              <input type="text" placeholder='GitHub' className='form-control' value={projectDetails.github} onChange={(e)=>setprojectDetails({...projectDetails,github:e.target.value})}/>
              </div>
              <div className="mb-3">
              <input type="text" placeholder='Website' className='form-control' value={projectDetails.website} onChange={(e)=>setprojectDetails({...projectDetails,website:e.target.value})} />
              </div>
              <div className="mb-3">
                <textarea placeholder='Overview' className='form-control' rows={4} value={projectDetails.overview} onChange={(e)=>setprojectDetails({...projectDetails,overview:e.target.value})}></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleEdit}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default EditProject