import React, { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import css from './ScrollArrow.module.css';

const ScrollArrow = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (typeof window !== 'undefined') {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    }
  };

  const scrollTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', checkScrollTop);
  }

  return (
    <FaArrowCircleUp
      className={css.scroll}
      onClick={scrollTop}
      style={{ height: 40, display: showScroll ? 'flex' : 'none' }}
    />
  );
};

export default ScrollArrow;
