import { faInstagram, faLinkedin, faStackOverflow, faTwitter, faWhatsapp,faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <>
    <div className="container-fluid bg-success p-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className='text-light'><FontAwesomeIcon icon={faStackOverflow} className='me-2' />Project Fair</h3>
          <p className='mt-3' style={{textAlign:"justify"}}>Lorem ipsum dolor sit, amet conseclit. Magni rerum sed, pariatur magnam laudantium placeat aperiam, eius a voluptatibus voluptatum labore laboriosam suscipit quo. Aliquam aliquid aut alias dicta vitae.</p>
        </div>
        <div className="col-md-2 d-flex justify-content-center flex-column">
          <div>
            <h4 className='text-light'>Links</h4>
           <Link to={'/'} className='text-black'> <p className='mt-3'>Home</p></Link>
            <Link to={'/project'} className='text-black'><p>Projects</p></Link>
           <Link to={'/dashboard'}className='text-black'> <p>DashBoard</p></Link>
          </div>
        </div>
        <div className="col-md-2 d-flex justify-content-center flex-column">
        <div>
            <h4 className='text-light'>Links</h4>
            <p className='mt-3'>React</p>
            <p>Bootstrap</p>
            <p>Bootswatch</p>
          </div>
        </div>
        <div className="col-md-4">
          <h4 className='text-light'>Contact Us</h4>
          <div className='d-flex mt-3'>
            <input type="text" placeholder='email Id' className='form-control rounded-0' />
            <button className='btn btn-warning rounded-0'>Subscribe</button>
          </div>
          <div className='d-flex mt-3 justify-content-between text-light'>
          <FontAwesomeIcon icon={faFacebook} className='fa-2x' />
          <FontAwesomeIcon icon={faInstagram} className='fa-2x' />
          <FontAwesomeIcon icon={faLinkedin}  className='fa-2x'/>
          <FontAwesomeIcon icon={faWhatsapp} className='fa-2x'/>
          <FontAwesomeIcon icon={faTwitter}className='fa-2x' />

          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default Footer