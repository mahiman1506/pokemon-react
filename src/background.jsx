import React, { useEffect, useRef } from "react";
import { animate } from 'animejs'; 
import pokeballImage from './assets/pokeball-pokemon-svgrepo-com.svg';

const PokeballBackground = () => {
  const pokeballRef = useRef(null);

  useEffect(() => {
    animate('.pokeball', {
    //   targets: pokeballRef.current,
      rotate: 360,
      duration: 10000,
      easing: 'linear',
      loop: true
    });
  }, []);

  return (
    <div className="pokeball fixed inset-0 z-0 overflow-hidden">
      <div
        ref={pokeballRef}
        className="absolute w-64 h-64 opacity-10"
        style={{ top: '20%', left: '20%' }}
      >
        <img
          src={pokeballImage}
          alt="Rotating Pokéball"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default PokeballBackground;
