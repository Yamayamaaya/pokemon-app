import React from "react";
import "./card.css";
const Card = ({ pokemon }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default}></img>
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardType">
        <div>タイプ</div>
        {pokemon.types.map((type, i) => {
          return (
            <div key={i}>
              <span className="typeName">{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="重さ">
            重さ：
            {pokemon.weight}
          </p>
        </div>
        <div className="cardData">
          <p className="高さ">
            高さ：
            {pokemon.height}
          </p>
        </div>
        <div className="cardData">
          <div className="能力">
            <p>能力</p>
            {pokemon.abilities.map((ability, i) => {
              return <p key={i}>{ability.is_hidden || ability.ability.name}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
