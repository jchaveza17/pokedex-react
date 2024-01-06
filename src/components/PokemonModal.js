import { useEffect } from 'react';

function PokemonModal({ isOpen, onClose, pokemon }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !pokemon) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white border border-gray-300 rounded-md shadow-md p-8 w-1/2 h-5/6 flex flex-col justify-between">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-2">{pokemon.name}</h2>
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              className="w-60 h-60 mb-4 object-cover rounded-full"
            />
            <p>Types: {pokemon.types.join(', ')}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Height: {pokemon.height}</p>
            <p>Pokedex: {pokemon.id}</p>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;
