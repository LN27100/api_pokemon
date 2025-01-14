import React from 'react';

function PokemonCard({ pokemon }) {
    const getStatValue = (statName) => {
        const stat = pokemon.stats.find(stat => stat.stat.name === statName);
        return stat ? stat.base_stat : 'N/A';
    };

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
                <div className="pokemon-stat">
                    <span className="stat-name">Height:</span>
                    <span className="stat-value">{pokemon.height / 10}</span>
                </div>
                <div className="pokemon-stat">
                    <span className="stat-name">Weight:</span>
                    <span className="stat-value">{pokemon.weight / 10}</span>
                </div>
                <div className="pokemon-stat">
                    <span className="stat-name">Speed:</span>
                    <span className="stat-value">{getStatValue('speed')}</span>
                </div>
                <div className="pokemon-stat">
                    <span className="stat-name">Experience:</span>
                    <span className="stat-value">{pokemon.base_experience}</span>
                </div>
                <div className="pokemon-stat">
                    <span className="stat-name">Attack:</span>
                    <span className="stat-value">{getStatValue('attack')}</span>
                </div>
                <div className="pokemon-stat">
                    <span className="stat-name">Abilities:</span>
                    <span className="stat-value">{pokemon.abilities.map(ability => ability.ability.name).join(', ')}</span>
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;
