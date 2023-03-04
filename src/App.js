import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Card from "./components/card.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      console.log(res.results);
      loadPokemon(res.results);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon.url);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };
  console.log(pokemonData);
  return (
    <div className="App">
      {loading ? <h1>読み込み中</h1> : <h1>取得完了</h1>}
      <div className="pokemonCardContainer">
        {pokemonData.map((_pokemon, i) => {
          return <Card pokemon={_pokemon} key={i} />;
        })}
      </div>
    </div>
  );
}

export default App;
