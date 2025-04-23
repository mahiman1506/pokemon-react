import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { animate } from 'animejs';
import './index.css';
import Header from "./assets/Header";
import Footer from "./assets/Footer";
import { PokemonCard } from "./PokemonCards";
import PokeballBackground from "./background";

const PokemonFullDetails = () => {
  const { name } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const loading = !pokemonData;
  const [relatedPokemons, setRelatedPokemons] = useState([]);

  useEffect(() => {
    if (!pokemonData) return;
  
    const fetchSimilarTypePokemon = async () => {
      const types = pokemonData.types.map(t => t.type.name);
      const promises = types.map(type =>
        fetch(`https://pokeapi.co/api/v2/type/${type}`).then(res => res.json())
      );
  
      try {
        const results = await Promise.all(promises);
        const allPokemon = results.flatMap(result => result.pokemon.map(p => p.pokemon));
        const uniquePokemon = Array.from(new Map(allPokemon.map(p => [p.name, p])).values());
  
        // Remove the current Pokémon from suggestions
        const filtered = uniquePokemon.filter(p => p.name !== pokemonData.name).slice(0, 10); // limit to 10
  
        // Fetch basic data for each suggestion
        const detailed = await Promise.all(
          filtered.map(p =>
            fetch(p.url).then(res => res.json())
          )
        );
  
        setRelatedPokemons(detailed);
      } catch (err) {
        console.error("Error fetching related Pokémon:", err);
      }
    };
  
    fetchSimilarTypePokemon();
  }, [pokemonData]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => {
        setPokemonData(data);
        setMainImage(data.sprites.other.dream_world.front_default); // Set initial image
      })
      .catch(err => console.error("Error fetching Pokémon details:", err));
  }, [name]);

  useEffect(() => {
    if (loading) {
      animate('span.loading-dot', {
        y: [
          { to: '-2.75rem', ease: 'outExpo', duration: 600 },
          { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
        ],
        rotate: {
          from: '-1turn',
          delay: 0
        },
        delay: (_, i) => i * 50,
        ease: 'inOutCirc',
        loopDelay: 1000,
        loop: true
      });
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-dots">
          <span className="loading-dot">P</span>
          <span className="loading-dot">O</span>
          <span className="loading-dot">K</span>
          <span className="loading-dot">E</span>
          <span className="loading-dot">M</span>
          <span className="loading-dot">O</span>
          <span className="loading-dot">N</span>
          <span className="loading-dot">•</span>
          <span className="loading-dot">•</span>
          <span className="loading-dot">•</span>
        </div>
      </div>
    );
  }

  return (
    <>
    <Header />
    <div className="background-wrapper">
      <PokeballBackground/>
    </div>
    <div className="pokemon-container">
      <div className="image-gallery">
        <div className="thumbnails">
          <img src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} onClick={() => setMainImage(pokemonData.sprites.other.dream_world.front_default)} />
          <img src={pokemonData.sprites.other.home.front_default} alt={pokemonData.name} onClick={() => setMainImage(pokemonData.sprites.other.home.front_default)} />
          <img src={pokemonData.sprites.other.home.front_shiny} alt={pokemonData.name} onClick={() => setMainImage(pokemonData.sprites.other.home.front_shiny)} />
          <img src={pokemonData.sprites.other["official-artwork"].front_default} alt={pokemonData.name} onClick={() => setMainImage(pokemonData.sprites.other["official-artwork"].front_default)} />
          <img src={pokemonData.sprites.other["official-artwork"].front_shiny} alt={pokemonData.name} onClick={() => setMainImage(pokemonData.sprites.other["official-artwork"].front_shiny)} />
        </div>
        <div className="main-image">
          <img id='main-img' src={mainImage} alt={pokemonData.name} />
        </div>
      </div>
      <div className="product-details">
      <h1 className='pokemonId'>{pokemonData.id}</h1>
      <h1 className='pokemonName'>{pokemonData.name}</h1>
      <span className="price">{pokemonData.types.map((curType)=> curType.type.name).join(", ")}</span><br /><br /><br />
        <h2>All Details:</h2>
        <table>
  <thead>
    <tr>
      <th>Height:</th>
      <th>Weight:</th>
      <th>Base Experience:</th>
      <th>Ability:</th>
      <th>Attack:</th>
      <th>HP:</th>
      <th>Defense:</th>
      <th>Spacial Attack:</th>
      <th>Spacial Defense:</th>
      <th>Speed:</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{pokemonData.height} decimetres</td>
      <td>{pokemonData.weight} hectograms</td>
      <td>{pokemonData.base_experience} points</td>
      <td>{pokemonData.abilities.map((abilityInfo) => abilityInfo.ability.name).join(", ")}</td>
      <td>{pokemonData.stats[1].base_stat}</td>
      <td>{pokemonData.stats[0].base_stat}</td>
      <td>{pokemonData.stats[2].base_stat}</td>
      <td>{pokemonData.stats[3].base_stat}</td>
      <td>{pokemonData.stats[4].base_stat}</td>
      <td>{pokemonData.stats[5].base_stat}</td>
    </tr>
  </tbody>
</table>

        <table>
          <tr>
            <th>Moves:</th>
          </tr>
          <tr>
            <td>{pokemonData.moves.map((move) => move.move.name).join(", ")}</td>
          </tr>
        </table>

      </div>
    </div>
    <div className="suggestion">
        <h1>Suggested Pokémon of the Same Type</h1>
        <ul className="cards"> {relatedPokemons.map((curPokemon) => (<PokemonCard key={curPokemon.id} pokemonData={curPokemon} />))}</ul>
    </div>
    <div className="homeButton">
      <button onClick={() => window.location.href = '/'}>Go Home</button>
    </div>
    <Footer />
    </>
  );
};

export default PokemonFullDetails;
