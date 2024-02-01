import { useState, useEffect, useCallback } from 'react';
import PokemonCard from './PokemonCard';
import TypeDropdown from './Dropdown';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import Skeleton from './Skeleton';
import PokemonModal from './PokemonModal';
import axios from 'axios';

function CardDisplay() {
  const [pokemonInfo, setPokemonInfo] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [typeSelected, setTypeSelected] = useState('');
  const [pokemonSearched, setPokemonSearched] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(24);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const openModal = (pokemon) => {
    setIsModalOpen(true);
    setSelectedPokemon(pokemon);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
      );

      const pokemonDetails = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const detailedResponse = await axios.get(pokemon.url);
          return {
            id: detailedResponse.data.id,
            name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            types: detailedResponse.data.types.map(
              (type) =>
                type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
            ),
            sprite: detailedResponse.data.sprites.front_default,
            weight: detailedResponse.data.weight,
            height: detailedResponse.data.height,
          };
        })
      );

      setPokemonInfo(pokemonDetails);
      setIsLoading(false);
    };

    fetchPokemon();
  }, []);

  const handleFilter = useCallback(() => {
    let filteredData = pokemonInfo;

    if (typeSelected !== '') {
      filteredData = filteredData.filter((pokemon) =>
        pokemon.types.includes(typeSelected)
      );
    }

    if (pokemonSearched !== '') {
      filteredData = filteredData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(pokemonSearched.toLowerCase())
      );
    }

    setFilteredPokemon(filteredData);
  }, [typeSelected, pokemonSearched, pokemonInfo]);

  const onSelectType = (type) => {
    setTypeSelected(type);
    setCurrentPage(1);
  };

  const onSearch = (value) => {
    setPokemonSearched(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleFilter();
  }, [typeSelected, pokemonSearched, pokemonInfo, handleFilter]);

  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const renderedPokemon = isLoading ? (
    <Skeleton
      times={24}
      className="bg-white border border-gray-300 rounded-md shadow-md p-4 m-4 text-center w-48 h-48"
    ></Skeleton>
  ) : filteredPokemon.length > 0 ? (
    currentPokemon.map((pokemon) => (
      <PokemonCard
        key={pokemon.name}
        name={pokemon.name}
        types={pokemon.types}
        id={pokemon.id}
        sprite={pokemon.sprite}
        onCardClick={() => openModal(pokemon)}
      />
    ))
  ) : (
    <p>No matching Pokemon found.</p>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-8 ">
      <div className="flex">
        <div className="mr-4">
          <SearchBar onSearch={onSearch} />
        </div>
        <div>
          <TypeDropdown onSelectType={onSelectType} />
        </div>
      </div>
      <div className="border p-4 mt-4">
        <div className="flex flex-wrap justify-center">{renderedPokemon}</div>
        <Pagination
          currentPage={currentPage}
          totalItems={filteredPokemon.length}
          itemsPerPage={pokemonPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <PokemonModal
        isOpen={isModalOpen}
        onClose={closeModal}
        pokemon={selectedPokemon}
      />
    </div>
  );
}

export default CardDisplay;
