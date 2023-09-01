import React, { useState } from 'react';

const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (direction === 'right') {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, components.length - 1));
    }
  };

  return (
    <div
      className="w-screen h-screen flex overflow-hidden"
      onTouchStart={(e) => {
        const touchStartX = e.touches[0].clientX;

        e.target.addEventListener('touchend', function touchEndListener(event) {
          const touchEndX = event.changedTouches[0].clientX;
          const deltaX = touchStartX - touchEndX;

          if (deltaX > 50) {
            handleSwipe('right'); // Swiped right, go to the previous component
          } else if (deltaX < -50) {
            handleSwipe('left'); // Swiped left, go to the next component
          }

          e.target.removeEventListener('touchend', touchEndListener);
        });
      }}
    >
      <div
        className="w-full h-full flex transition-transform ease-in-out duration-300"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        
      </div>
    </div>
  );
};

export default Slide;
