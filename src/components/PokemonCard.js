function PokemonCard({ name, types, id, sprite, onCardClick }) {
  const handleClick = () => {
    onCardClick({ name, types, id, sprite });
  };

  return (
    <div
      className="bg-white border border-gray-300 rounded-md shadow-md p-4 m-4 text-center w-48 cursor-pointer"
      onClick={handleClick}
    >
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <img className="mx-auto mb-2" src={sprite} alt={name} />
      <div className="text-gray-600">
        <p>PokeDex: {id}</p>
        <p>Types: {types.join(', ')}</p>
      </div>
    </div>
  );
}

export default PokemonCard;
