import { PokemonCard } from "./PokemonCards";
import { useEffect, useState } from "react";
import "./index.css";
import { animate } from 'animejs';
import Header from "./assets/Header";
import Footer from "./assets/Footer";
import PokeballScroll from "./scroll";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pokemonPerPage = 20;

  const fetchPokemon = async () => {
    setLoading(true);
    setError(null);
    try {
      const offset = (currentPage - 1) * pokemonPerPage;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pokemonPerPage}`);
      const data = await res.json();

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });

      const detailedResponses = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponses);
      setLoading(false);

      if (!totalCount) {
        setTotalCount(data.count);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [currentPage]);

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

  // Filter after data is loaded (search by name or id on current page)
  const searchData = pokemon.filter((curPokemon) => {
    const isSearchById = !isNaN(search) && search.trim() !== "";

    if (isSearchById) {
      return curPokemon.id.toString().includes(search);
    } else {
      return curPokemon.name.toLowerCase().includes(search.toLowerCase());
    }
  });

  const totalPages = Math.ceil(totalCount / pokemonPerPage);

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);
  const goToPrevPage = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);

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

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <>
      <Header />
      <div className="background-wrapper">
        <PokeballScroll />
      </div>
      <section className="container">
        <header>
          <h1>Let's Catch Pokémon</h1>
        </header>

        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <ul className="cards">
            {searchData.map((curPokemon) => (
              <PokemonCard key={curPokemon.id} pokemonData={curPokemon} />
            ))}
          </ul>
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <button onClick={goToFirstPage} disabled={currentPage === 1}>
            ⏮ First
          </button>
          <button onClick={goToPrevPage} disabled={currentPage === 1}>
            ◀ Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next ▶
          </button>
          <button onClick={goToLastPage} disabled={currentPage === totalPages}>
            Last ⏭
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};
