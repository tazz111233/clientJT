import React, { useRef } from 'react';
import Slider from 'react-slick';
import '../styles/Carousel.css'; // Import the CSS file for styling
import 'slick-carousel/slick/slick.css'; // Import slick CSS
import 'slick-carousel/slick/slick-theme.css'; // Import slick theme CSS
import image1 from '../img/pexels-jmendezrf-1536619.jpg';
import image2 from '../img/35809804_8338565.jpg';
import image3 from '../img/pexels-brandandpalms-768975.jpg';
import image4 from '../img/pexels-lum3n-44775-322207.jpg';
import image5 from '../img/pexels-solliefoto-298863.jpg';

const Carousel = () => {
  const sliderRef = useRef(null); // Create a ref for the slider

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="carousel-container">
      <Slider ref={sliderRef} {...settings}>
        <div className="carousel-item">
          <img src={image1} alt="Image1" />
        </div>
        <div className="carousel-item">
          <img src={image2} alt="Image2" />
        </div>
        <div className="carousel-item">
          <img src={image3} alt="Image3" />
        </div>
        <div className="carousel-item">
          <img src={image4} alt="Image4" />
        </div>
        <div className="carousel-item">
          <img src={image5} alt="Image5" />
        </div>
      </Slider>
      <div className="carousel-buttons">
        <button className="slick-prev" onClick={() => sliderRef.current.slickPrev()}>&lt;</button>
        <button className="slick-next" onClick={() => sliderRef.current.slickNext()}>&gt;</button>
      </div>
    </div>
  );
};

export default Carousel;
