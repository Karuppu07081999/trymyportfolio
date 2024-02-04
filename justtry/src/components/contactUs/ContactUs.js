import React, { useRef } from "react";
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

function ContactUs() {
  const form = useRef();

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
      emailjs.sendForm('service_am5sj5v', 'template_00rs98i', form.current, '8ZiFFIzrEnLWqopQu')
      .then((result) => {
          console.log(result.text);
          reset()
      }, (error) => {
          console.log(error.text);
      });
  };

  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs.sendForm('service_am5sj5v', 'template_00rs98i', form.current, '8ZiFFIzrEnLWqopQu')
  //     .then((result) => {
  //         console.log(result.text);
  //     }, (error) => {
  //         console.log(error.text);
  //     });
  // };
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
              Contact <strong className="purple">US</strong>
            </h1>
            <div class="container">
            <div class="d-flex justify-content-center">

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
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </div>
      </form>
    </div>
          
            </div>
        </div>
  {/* <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="from_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form> */}
  
    
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
