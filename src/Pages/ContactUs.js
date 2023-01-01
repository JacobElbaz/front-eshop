import React from 'react';
import { FaGithub, FaLinkedinIn } from "react-icons/fa"
import img1 from '../images/Elie.jpeg';
import img2 from '../images/Jacob.jpeg';
import './ContactUs.css'

function ContactUs() {
  return (
    <>
      <div className="i">
        <div className="i-left">
          <div className="i-left-wrapper">
            <h2 className="i-intro">Hello, My name is</h2>
            <h1 className="i-name">Jacob <span className='family'>Elbaz</span></h1>
            <div className="i-title-item">Software Engineer Student</div>
            <div className="i-title-item">FullStack</div>
            <p className="i-desc">
              I design and develop services for customers of all sizes,
              specializing in creating stylish, modern websites, web services and
              online stores. Welcome to our Project Game Zone
            </p>
            <div>
              <ul className='social'>
                <li>
                  <a href='https://www.linkedin.com/in/jacob-elbaz/' className='link' target="_blank"><FaLinkedinIn></FaLinkedinIn></a>
                </li>
                <li>
                  <a href='https://github.com/JacobElbaz' className='link' target="_blank"><FaGithub></FaGithub></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="i-right">
          <div className="i-bg"></div>
          <img src={img2} alt="" className="i-img" />
        </div>
      </div>
      <div className="i">
        <div className="i-left">
          <div className="i-left-wrapper">
            <h2 className="i-intro">Hello, My name is</h2>
            <h1 className="i-name">Elie <span className='family'>Bracha</span></h1>
            <div className="i-title-item">Software Engineer Student</div>
            <div className="i-title-item">FullStack</div>
            <p className="i-desc">
              I design and develop services for customers of all sizes,
              specializing in creating stylish, modern websites, web services and
              online stores. Welcome to our Project Game Zone
            </p>
            <div>
              <ul className='social'>
                <li>
                  <a href='https://www.linkedin.com/in/bracha-elie-7776b9208/' className='link' target="_blank"><FaLinkedinIn></FaLinkedinIn></a>
                </li>
                <li>
                  <a href='https://github.com/ElieB-1012' className='link' target="_blank"><FaGithub></FaGithub></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="i-right">
          <div className="i-bg"></div>
          <img src={img1} alt="" className="i-img" />
        </div>
      </div>
    </>
  );
}

export default ContactUs;
