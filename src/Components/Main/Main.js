import React, { useState } from "react";
import axios from "axios";
import { Card, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import '../Sytle/Style.css'



const Main = () => {
  const [pokemoname, setPokemoname] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const searchPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemoname}`)
      .then((response) => {
        console.log(response);

        setPokemon({
          name: pokemoname,
          id: response.data.id,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          img2: response.data.sprites.back_shiny,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
          experience: response.data.base_experience,
        });
        setPokemonChosen(true);
      });
  };
  return (
    <div>
      <div className="TitleSection">
        <h1 className="Title">Pokemon stats</h1>
        <br />
        <div className="InputSection">
          <input
            type="text"
            placeholder="Enter Pokemon"
            onChange={(e) => setPokemoname(e.target.value)}
          />
          <br />
          <button onClick={searchPokemon}>Search Pokemon</button>
        </div>
      </div>

      <div className="DisplaySection">
        {!pokemonChosen ? (
          <h1 className="Title">Please Choose a Pokemon</h1>
        ) : (
          <>
            <Card
              sx={{
                width: 350,
                backgroundImage: `url(${"./image/back2.webp"})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: 13,
                border: "5px solid black",
                padding: "20px",
                marginLeft: 4,
                textAlign: "center",
              }}
            >
              <div className="CardMedia">
                <CardMedia
                  component="img"
                  alt="green iguana"
                  width="300"
                  height="160"
                  image={pokemon.img}
                />
                <CardMedia
                  component="img"
                  alt="green iguana"
                  width="300"
                  height="160"
                  image={pokemon.img2}
                />
              </div>
              <CardContent className="Details">
                <Typography variant="h4">{pokemon.name}</Typography>
                <Typography variant="h5">Id:{pokemon.id}</Typography>
                <Typography variant="h5">Type:{pokemon.type}</Typography>
                <Typography variant="h5">Attack:{pokemon.attack}</Typography>
                <Typography variant="h5">
                  Experience:{pokemon.experience}
                </Typography>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
