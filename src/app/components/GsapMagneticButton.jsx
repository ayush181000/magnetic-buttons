'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const GsapMagneticButton = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const current = ref.current;
    const xTo = gsap.quickTo(current, 'x', {
      duration: 1,
      ease: 'elastic.out(1,0.3)',
    });
    const yTo = gsap.quickTo(current, 'y', {
      duration: 1,
      ease: 'elastic.out(1,0.3)',
    });

    const mouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = ref.current.getBoundingClientRect();

      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      xTo(x);
      yTo(y);
    };

    const mouseLeave = (e) => {
      xTo(0);
      yTo(0);
    };

    current.addEventListener('mousemove', mouseMove);
    current.addEventListener('mouseleave', mouseLeave);

    return () => {
      current.removeEventListener('mousemove', mouseMove);
      current.removeEventListener('mouseleave', mouseLeave);
    };
  }, []);

  return React.cloneElement(children, { ref });
};

export default GsapMagneticButton;
