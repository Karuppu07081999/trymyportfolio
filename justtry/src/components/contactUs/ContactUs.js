import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
// import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import AOS from 'aos';


function ContactUs() {
  const form = useRef();

  const [loader, setLoader] = useState(false)

  useEffect(()=>{
    AOS.init();
  },[])

  const validationSchema = Yup.object().shape({

    from_name: Yup.string()
      .required('Name is required !')
      .trim(),
    user_email: Yup.string()
      .required('Email is required !')
      .email('Email is invalid !')
      .trim(),
    message: Yup.string()
      .required('Message is required !')
      .trim()
    
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode:"onChange"
  });

  const onSubmit = data => {
    console.log(JSON.stringify(data, null, 2));
    
    setLoader(true)
      emailjs.sendForm('service_am5sj5v', 'template_00rs98i', form.current, '8ZiFFIzrEnLWqopQu')
      .then((result) => {
          console.log(result.text);
          setLoader(false)
          Swal.fire({
            title: "Submitted Successfully !",
            text: "Thank you for your message ! We'll get back to you soon.",
            icon: "success"
          });
          reset()
      }, (error) => {
          Swal.fire({
            text: "Something went wrong ! Please try again later.",
            icon: "error"
          });
          console.log(error.text);
      });
  };

  
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              

              <div data-aos="fade-up" data-aos-duration="1000"	>
                Contact <strong className="purple">US</strong>
              </div>

            </h1>
            <div class="container">
            <div class="d-flex justify-content-center">

            <div data-aos="fade-right" data-aos-duration="1500"	>

            <div class="card" style={{width: "30rem"}}>
  
  <div class="card-body">
  <div className="card m-3">
            
            <div className="card-body">
                
                <div className="register-form">
      <form ref={form} onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group mb-3">
          <label className="float-start mb-2">Name</label>
          <input
            name="from_name"
            type="text"
            {...register('from_name')}
            className={`form-control ${errors.from_name ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.from_name?.message}</div>
        </div>

        <div className="form-group mb-3">
          <label className="float-start mb-2">Email</label>
          <input
            name="user_email"
            type="email"
            {...register('user_email')}
            className={`form-control ${errors.user_email ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.user_email?.message}</div>
        </div>

        <div className="form-group mb-3">
          <label className="float-start mb-2">Message</label>
          <textarea
            name="message"
            type="text"
            {...register('message')}
            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.message?.message}</div>
        </div>

        <div className="form-group">
          {loader ?         <button class="btn btn-primary" type="button" disabled>
  <span class="spinner-grow spinner-grow-sm " aria-hidden="true"></span>
  <span role="status" className="ms-2">Loading ...</span>
</button>:
          <button type="submit" className="btn btn-primary">
          Send Message
        </button> }



        
          
        </div>
      </form>
    </div>
          
            </div>
        </div>
    
  </div>
</div>
</div>
</div>
</div>
            
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>

      </Container>
    </Container>
  );
}

export default ContactUs;
