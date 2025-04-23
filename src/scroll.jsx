import React, { useEffect, useRef } from 'react';
// import anime from 'animejs';
// import * as anime from 'animejs'; 
// import anime from 'animejs/lib/anime.es.js';
import { animate, onScroll } from 'animejs'; 
import pokeballImage from './assets/pokeball-pokemon-svgrepo-com.svg'; // ✅ correct way

const PokeballScroll = () => {
  const pokeballRef = useRef(null);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const direction = scrollTop > lastScrollTop.current ? 'down' : 'up';

    //   anime({
    //     targets: pokeballRef.current,
    //     rotate: direction === 'down' ? '+=45' : '-=45',
    //     duration: 500,
    //     easing: 'easeInOutSine',
    //   });
    // anime.default({
    //     targets: pokeballRef.current,
    //     rotate: direction === 'down' ? '+=45' : '-=45',
    //     duration: 500,
    //     easing: 'easeInOutSine'
    //   });
    animate('.pokeball', {
      // targets: pokeballRef.current,
        rotate: direction === 'down' ? '+=45' : '-=45',
        duration: 500,
        easing: 'easeInOutSine'
      });
      

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pokeball">
      <img
        ref={pokeballRef}
        src={pokeballImage} // ✅ now correctly loaded
        alt="Pokeball"
        className="w-32 h-32"
      />
    </div>
  );
};

export default PokeballScroll;


// export function PokeballScroll() {
//     return (
//       <div style={{ background: "red", color: "white" }}>
//         Pokeball Scroll is working!
//       </div>
//     );
//   }
  