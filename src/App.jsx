import { useState, useEffect } from 'react';
import './App.css';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function App() {
    const [listOfPokemons, setListOfPokemons] = useState([]);
    const [currentPokemon, setCurrentPokemon] = useState();

    useEffect(() => {
        async function getPokemons() {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon');
            const result = await response.json();
            setListOfPokemons(result.results);
        }
        getPokemons();
    }, []);

    async function getCurrentPokemon(url) {
        const response = await fetch(`${url}`);
        const result = await response.json();

        setCurrentPokemon({
            name: result.name[0].toUpperCase() + result.name.slice(1),
            id: result.id,
            height: result.height,
            image: result.sprites.front_default,
            moves: result.moves.length,
            attack: result.base_experience,
        });
    }
    
    useEffect(() => {
        getCurrentPokemon('https://pokeapi.co/api/v2/pokemon/1');
    }, []);
    
    const changePokemon = (name) => {
        const pokemons = [...listOfPokemons];
        const current = pokemons.find((pokemon) => pokemon.name === name);
        getCurrentPokemon(current?.url);
    };

return (
    <div className="pokeWrapper">
        <div className="pokeList">
            {listOfPokemons.slice([0], [10]).map((pokemon) => (
                <Chip
                    key={pokemon.name}
                    onClick={() => changePokemon(pokemon.name)}
                    color="primary"
                    label={pokemon.name}
                    />
            ))}
        </div>
        <div>

        <Card
            key={currentPokemon?.name}
            class="pokeCard" 
            >
                <CardContent>
                    <Typography component="div" class="pokeName">
                        {currentPokemon?.name}
                    </Typography>
                    <CardMedia
                    class="pokeImg"
                    component="img"
                    height="250"
                    width="10"
                    image={currentPokemon?.image}
                    alt={currentPokemon?.name}
                    />
                    <Typography component="div" class="pokeInfo">
                        Снялся в {currentPokemon?.moves} сериях
                    </Typography>
                    <Typography component="div" class="pokeInfo">
                        id: {currentPokemon?.id}
                    </Typography>
                    <Typography component="div" class="pokeInfo">
                        height: {currentPokemon?.height}
                    </Typography>
                    <Typography component="div" class="pokeInfo">
                        attack: {currentPokemon?.attack}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </div>
    );
}

export default App;
