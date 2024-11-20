import React, { useEffect } from 'react';
import testimonialPic1 from './testimonialPic1.png';
import testimonialPic2 from './testimonialPic2.png';
import testimonialPic3 from './testimonialPic3.png';
import './testimonials.css';
import { Carousel } from 'react-responsive-carousel';

function Testimonials() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('react-responsive-carousel/lib/styles/carousel.min.css');
    }
  }, []);

  return (
    <Carousel
      showArrows={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      autoPlay={true}
      interval={6100}
    >
      <div>
        <img alt="testimonio" src={testimonialPic1} />
        <div className="myCarousel">
          <h3>Andreea V.</h3>
          <h4>All-star Host</h4>
          <p>
            Great car rental experience. Andreea makes it very easy by picking you up from the
            airport and taking you...
          </p>
        </div>
      </div>

      <div>
        <img alt="testimonio" src={testimonialPic2} />
        <div className="myCarousel">
          <h3>Adrian M.</h3>
          <h4>All-star Host</h4>
          <p>
            Adrian was very helpful and adjusted to my schedule when I needed to pick up the car
            early. He also has so many cool...
          </p>
        </div>
      </div>

      <div>
        <img alt="testimonio" src={testimonialPic3} />
        <div className="myCarousel">
          <h3>Jesse R.</h3>
          <h4>All-star Host</h4>
          <p>
            Just the kind of standard car with a good price I was looking for. Car has good
            acceleration and brakes. A little...
          </p>
        </div>
      </div>
    </Carousel>
  );
}

export default Testimonials;
