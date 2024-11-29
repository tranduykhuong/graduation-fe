import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';
import './WishersSlider.css';

const WishesSlider = ({reviews}) => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const { name, img_url, wisher } = reviews[index];

  useEffect(() => {
    setShow(true);
  }, [index]);

  const checkNumber = (number) => {
    if (number > reviews.length - 1) {
      return 0;
    } else if (number < 0) {
      return reviews.length - 1;
    }
    return number;
  };

  const nextPerson = () => {
    setIndex((index) => checkNumber(index + 1));
  };

  const prevPerson = () => {
    setIndex((index) => checkNumber(index - 1));
  };

  const randomPerson = () => {
    const key = window.location.pathname.replaceAll('/', '') || localStorage.getItem('key').replace('/', '')

    reviews.forEach((item, idx) => {
      if (item.key === key) {
        setIndex(idx)
      }
    })
  };

  // Auto-slide after 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextPerson();
    }, 5000); // Change slide every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [index, nextPerson]);

  return (
    <article className={`review mt-12 min-h-[430px] ${show ? 'show' : ''}`}>
      <div className="button-container flex justify-center pb-10">
        <button className="prev-btn" onClick={prevPerson}>
          <FaChevronLeft />
        </button>
        <button className="random-btn" onClick={randomPerson}>
          Của bạn
        </button>
        <button className="next-btn" onClick={nextPerson}>
          <FaChevronRight />
        </button>
      </div>
      <div className="img-container">
        <img src={img_url || "https://png.pngtree.com/png-vector/20240407/ourmid/pngtree-cute-graduation-boy-clipart-png-image_12270621.png"} alt={name} className="person-img" />
        <span className="quote-icon">
          <FaQuoteRight />
        </span>
      </div>
      <h4 className="author font-worksans text-2xl pb-2 font-semibold">{name}</h4>
      <p className="info font-stylescript pb-2 text-xl">{wisher}</p>
    </article>
  );
};

export default WishesSlider;
