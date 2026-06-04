import { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  const getpokemon=async() =>{
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
      const response = await axios.get(url);
      
      setPokemonData(response.data);
      setErrormessge("");
    }catch(error){
      setErrorMessage("Pokemon not found! Try 'pikachu' or 'charizard'");
      setPokemonData(null);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark min-vh-100 p-3">
    <div className="bg-white  p-5 rounded shadow-lg text-center" style={{ width: "400px" }}>
    <h1 className="text-danger fw-bold mb-4">pokedex 🔴</h1>
      
      <input
        type="text"
        placeholder="Enter Pokemon Name (e.g., ditto, mew)"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />
      <button className="btn btn-danger w-100 fw-bold mb-4" onClick={getpokemon}>
      search
      </button>
      
      {error&& (
      <div className="alert alert-warning">{error}</div>
      )}
      {pokemonData && (
      <div className="mt-4 p-3 bg-light rounded border border-danger">
      <h2 className="text-capitalize fw-bold">{pokemonData.name}</h2>
<img
src={pokemonData.sprites.front_default}
alt={pokemonData.name}
style={{ width: "150px"}}
/>
<div className="d-flex justify-content-arount mt-3">
<div>
<strong>Height:</strong> <br /> {pokemonData.height * 10} cm
</div>
<div>
<strong>Weight:</strong> <br /> {pokemonData.weight / 10} kg
</div>
</div>
<div className="mt-3">
<strong>Type:</strong> <span className="text-capitalize">{pokemonData.types[0].type.name}</span>
</div>
</div>
      )}
    </div>
    </div>
  );
}
  
export default App;
