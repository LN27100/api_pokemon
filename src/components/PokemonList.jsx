import React, { useState, useEffect } from 'react';
import './PokemonList.css';
import PokemonCard from '../components/PokemonCard';
import pokeballImage from '../assets/pokeball-2.png';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
                const data = await response.json();
                const pokemonData = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const pokemonResponse = await fetch(pokemon.url);
                        return await pokemonResponse.json();
                    })
                );
                setPokemonList(pokemonData);
                setFilteredPokemon(pokemonData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

    useEffect(() => {
        let filtered = pokemonList.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedType === '' || pokemon.types.some(type => type.type.name === selectedType))
        );
        setFilteredPokemon(filtered);
    }, [searchTerm, selectedType, pokemonList]);

    if (loading) {
        return <div>Chargement en cours…</div>;
    }

    const types = [...new Set(pokemonList.flatMap(pokemon => pokemon.types.map(type => type.type.name)))];

    return (
        <>
            <div className="title-container">
                <h1>Pokémon</h1>
                <img src={pokeballImage} alt="Pokeball" className="pokeball-image" />
            </div>
            <input
                type="text"
                placeholder="Rechercher un Pokémon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />
            <div className="type-filters">
                <button onClick={() => setSelectedType('')}>Tous</button>
                {types.map(type => (
                    <button key={type} onClick={() => setSelectedType(type)}>
                        {type}
                    </button>
                ))}
            </div>
            <div className="pokemon-grid">
                {filteredPokemon.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </>
    );
}

export default PokemonList;
