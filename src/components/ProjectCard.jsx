import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { serverUrl } from '../services/serverUrl';



function ProjectCard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
       <Card style={{ width: '100%' }} className='shadow-lg border-0 rounded-0' onClick={handleShow}>
      <Card.Img variant="top" src={`${serverUrl}/uploads/${project?.projectImage}`} style={{width:'100%',height:'300px'}} />
      <Card.Body>
        <Card.Title className='text-center'>{project?.title}</Card.Title>
       
       
      </Card.Body>
    </Card>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
            <img src={`${serverUrl}/uploads/${project?.projectImage}`} alt=""  width={'100%'}/>
            </Col>
            <Col md={6}>
            <h4>Discription</h4>
            <p>{project?.overview}</p>
            <h4 className='mt-3'>Technologies</h4>
            <p>{project?.language}</p>
            </Col>
            
          </Row>
        </Modal.Body>
        <Modal.Footer>
       <Link to={project.github}> <FontAwesomeIcon icon={faGithub} className='fa-2x text-info' /></Link>
        <Link to={project.website}><FontAwesomeIcon icon={faLink} className='fa-2x text-info ms-3' /></Link>

        
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default ProjectCard