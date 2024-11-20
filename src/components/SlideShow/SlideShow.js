import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import crew from './A_SL5789.png';
import crew2 from './A_SL5790.jpeg';


function SimpleSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <Carousel {...settings}>
      <Wrap>
        <img src={crew2} alt="img" />
      </Wrap>
      <Wrap>
        <img src={crew} alt="img" />
      </Wrap>
    </Carousel>
  );
}

export default SimpleSlider;

const Carousel = styled(Slider)`
  margin-top: 90px;
  max-width: 450px;
  width: 100%;
  padding-left: 20px;

  @media screen and (max-width: 768px) {
    /* margin: 0 auto !important; */
    padding: 0;
    margin-top: 30px;
  }

  .slick-slider {
    margin: 0 auto !important;
  }
`;
const Wrap = styled.div`
  cursor: pointer;
  img {
    max-width: 450px;
    width: 100%;
  }
`;
