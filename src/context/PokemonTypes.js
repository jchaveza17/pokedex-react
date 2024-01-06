import { createContext } from 'react';

const PokemonTypes = createContext();

function Provider({ children }) {
  const types = [
    'Normal',
    'Fire',
    'Water',
    'Grass',
    'Electric',
    'Ice',
    'Fighting',
    'Poison',
    'Ground',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dark',
    'Dragon',
    'Steel',
    'Fairy',
  ];

  return (
    <PokemonTypes.Provider value={types}>{children}</PokemonTypes.Provider>
  );
}

export { Provider };
export default PokemonTypes;
