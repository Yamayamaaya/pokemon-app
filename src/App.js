import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Card from "./components/card.js";
import Navber from "./components/navber.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, SetNextUrl] = useState("");
  // const { nowUrl, SetNowUrl } = useState("");
  const [prevUrl, SetPrevUrl] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      console.log(res.results);
      loadPokemon(res.results);
      SetNextUrl(res.next);
      SetPrevUrl(initialURL);
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

  const handlePrevPage = async () => {
    let data = await getAllPokemon(prevUrl);
    loadPokemon(data.results);
    SetNextUrl(data.next);
    SetPrevUrl(data.previous || initialURL);
  };

  const handleNextPage = async () => {
    let data = await getAllPokemon(nextUrl);
    loadPokemon(data.results);
    SetNextUrl(data.next);
    SetPrevUrl(data.previous || initialURL);
  };

  return (
    <>
      <Navber />
      <div className="App">
        <div className="pokemonCardContainer">
          {pokemonData.map((_pokemon, i) => {
            return <Card pokemon={_pokemon} key={i} />;
          })}
        </div>
        <div className="btn">
          <button onClick={handlePrevPage}>前へ</button>
          <button onClick={handleNextPage}>次へ</button>
        </div>
      </div>
    </>
  );
}

export default App;
