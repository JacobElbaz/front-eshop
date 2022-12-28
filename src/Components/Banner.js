import React from "react";
import Slider from "react-slick";
import im1 from '../images/assassin.jpg'
import im2 from '../images/avengers.jpg'
import im3 from '../images/doom.jpg'
import im4 from '../images/kingdom.jpg'
import im5 from '../images/monster.jpg'
import im6 from '../images/super.jpg'
import im7 from '../images/vrally.jpg'
import Product from './Product';

export default function MultipleItems({name, products}) {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4
    };
    let product = null
    if(products)
     product = products[0]

    return (
      <div className="banner">
        <h2> {name} </h2>
        <Slider {...settings}>
          <div>
          </div>
          <div>
          <img src={im2} alt="" />
          </div>
          <div>
          <img src={im3} alt="" />
          </div>
          <div>
          <img src={im4} alt="" />
          </div>
          <div>
          <img src={im5} alt="" />
          </div>
          <div>
          <img src={im6} alt="" />
          </div>
          <div>
          <img src={im7} alt="" />
          </div>
        </Slider>
      </div>
    );
}