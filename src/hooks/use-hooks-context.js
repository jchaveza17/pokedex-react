import { useContext } from 'react';
import PokemonTypes from '../context/PokemonTypes';

function usePokemonTypes() {
  return useContext(PokemonTypes);
}

export default usePokemonTypes;
