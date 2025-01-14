import React from 'react';

function PokemonCard({ pokemon }) {
    return (
        <div className="pokemon-card">
            <img src={pokemon.front_default || pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
            <div className="pokemon-types">
                {pokemon.types.map((type) => (
                    <span key={type.type.name} className="pokemon-type">{type.type.name}</span>
                ))}
            </div>
            <div className="pokemon-stats">
                {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name} className="pokemon-stat">
                        <span className="stat-name">{stat.stat.name}: </span>
                        <span className="stat-value">{stat.base_stat}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PokemonCard;
